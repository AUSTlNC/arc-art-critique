const mongoose = require("mongoose")

const tempImageSchema = new mongoose.Schema({
    imageType: {type: String, required: true},
    image: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserSchema"},
    imageID:{type: String, required: true}
}, {collection: "tempImages"})

const tempImageModel = mongoose.model("tempImageSchema", tempImageSchema)
module.exports = tempImageModel