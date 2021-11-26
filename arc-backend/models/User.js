const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    postID: {type: Array, required: true, default: []}
}, {collection: "users"})

const UserModel = mongoose.model('UserSchema', UserSchema)
module.exports = UserModel