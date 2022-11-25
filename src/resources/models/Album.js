const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema({
    name: {type: String, require: true},
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Album', Album)