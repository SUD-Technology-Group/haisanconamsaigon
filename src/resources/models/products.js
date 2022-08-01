const mongoose = require('mongoose')
const Schema = mongoose.Schema

const size = new Schema({
    size_name: {
        type: String,
        required: true
    },
    size_amount: {
        type: Number,
        required: true,
        default: 0
    }
})

const color = new Schema({
    color_name: {
        type: String,
        required: true
    },
    color_amount: {
        type: Number,
        required: true,
        default: 0
    }
})

const products = new Schema({
    pid: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    images: {
        type: [String]
    },
    size_of_product: {
        type: [size],
    },
    color_of_product: {
        type: [color]
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classes: {
        lv1: Number,
        lv2: Number
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('products', products)