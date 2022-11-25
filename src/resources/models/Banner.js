const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Banner = new Schema({
    id: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Banner', Banner)