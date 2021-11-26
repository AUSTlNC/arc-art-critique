const mongoose = require("mongoose")
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userinfo: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserSchema"},
    description:{type: String, required: true},
    artType:{type: String, required: true},
    createdAt:{type: Date, default: Date.now},
    image:{type: String, required: true},
    imageType:{type: String, required: true}
}, {collection: "posts"})

PostSchema.plugin(mongoose_fuzzy_searching, { fields: [{name:'title',weight: 5,escapeSpecialCharacters: true},
        {name:'description',weight:2,escapeSpecialCharacters: true}] });

const PostModel = mongoose.model("PostSchema", PostSchema)

module.exports = PostModel