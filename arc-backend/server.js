const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://austin:caijh20000609@arc-main.ih4xb.mongodb.net/ARCMain?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const postRouter = require('./routes/posting')
const commentRouter = require('./routes/commenting')
var dotenv = require('dotenv')
var passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const MongoDBSession = require('connect-mongodb-session')(session)
const JWT_SECRET = 'asdfjaoiwer987q293rhajksdhfyasdfkh*&^*%'
const app = express()
dotenv.config({path: './config/config.env'})


//Load config
dotenv.config({path: './config/config.env'})

//Passport config
require('./config/passport')(passport)


const store = new MongoDBSession({
    uri:"mongodb+srv://austin:caijh20000609@arc-main.ih4xb.mongodb.net/ARCMain?retryWrites=true&w=majority",
    collection: 'sessions',
})
// use cors before all route definitions
app.use(cors({
    origin: ["http://localost:3000"],
    methods:["GET", "POST"],
    credentials:true
}))

// build the session and cookie
app.use(session({
    key: "userID",
    secret: 'key that signs cookie',
    resave: false,
    saveUninitialized: false,
    cookie:{
        //session valid for 1 hour
        expires: 1000*60*60,
    },
    store: store,
}))


app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json({ limit: "100mb" }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 90000 }));
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth', require('./routes/auth'))



app.post('/api/change-password', async (req, res) => {
    const {token} = req.body
    const user = jwt.verify(token, JWT_SECRET)

    console.log(user)
    res.json({status: 'ok'})
})


app.post('/api/login', async (req, res) => {

    const { username, password} = req.body
    const user = await User.findOne({username}).lean()


    if (!user){
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)){

        const token = jwt.sign(
            {
                id: user._id, 
                username: user.username
            }, 
            JWT_SECRET
        )
        //if success login, set auth to true
        req.session.isAuth = true;
        req.session.user = user;
        return res.json({status: 'ok', data: 'GOOD'})
    }

    return res.json({status: 'error', error: 'Invalid username/password'})
})

app.get("/api/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user})
    }
    else{
        res.send({loggedIn: false})
    }
})

app.get("/api/logout", (req, res)=>{
    console.log(req.session);
    req.session.destroy();
    res.clearCookie("key");
    console.log(req.session);
    res.send({loggedIn: false})
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
    const {username,  password: plainTextPassword } = req.body
    
    if(!username || typeof username !== 'string') {
        res.status()
        return res.json({status: 'error', error: 'Invalid username'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error: 'Password too short. Must be more than 5 characters.'})
    }

    const password = await bcrypt.hash(plainTextPassword, 12)
    try {
        const response = await User.create({username, password})
        console.log('User created successfully: ', response)

    } catch(error) {
        console.log(JSON.stringify(error))
        if (error.code === 11000) {
            // duplicate key

            return res.json({status: 'error', error: 'Username already taken'})
        }
        throw error
    }
    const user = await User.findOne({username}).lean()
    req.session.isAuth = true;
    req.session.user = user;
    // console.log(await bcrypt.hash(password, 12))
    return res.json({status: 'ok', data: 'GOOD'})
})

const PORT = process.env.PORT || 9999
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);