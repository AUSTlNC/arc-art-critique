var express = require('express');
var dotenv = require('dotenv')
var passport = require('passport');
const connectDB = require('../config/db')
const session = require('express-session')

//Load config
dotenv.config({path: './config/config.env'})

//Passport config
require('../config/passport')(passport)

connectDB()

var app = express();

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //cookie: {secire: true}
    //store in db database
}))


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth', require('../routes/auth'))

const PORT = process.env.PORT || 5000


app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);