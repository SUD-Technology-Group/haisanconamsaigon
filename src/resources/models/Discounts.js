const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Discounts = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    subtitle: {
        type: String,
        required: true
    },
    group: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

},
    {
        timestamps: true
    })

module.exports = mongoose.model('Discounts', Discounts);