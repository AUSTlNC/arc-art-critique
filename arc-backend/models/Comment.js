const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    userId: {type: mongoose.ObjectId, required: true},
    postId: {type: mongoose.ObjectId, required: true},
    comment:{type: String, required: true},
    createdAt:{type: Date, default: Date.now}
}, {collection: "comments"})

const CommentModel = mongoose.model("CommentSchema", CommentSchema)
module.exports = CommentModel