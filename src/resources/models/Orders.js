const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Orders = new Schema({
    Customer: {
        type: {
            fullname: String,
            phone: String,
            email: String,
            address: String
        },
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    product_list: {
        type: [{
            pid: String,
            name: String,
            price: Number,
            stringPrice: String,
            img: String,
            inventory: Number,
            size: String,
            slug: String,
            numberOfUnit: String
        }],
        required: true
    },
    status: {
        type: String,
        default: "Chờ xử lý"
    },
    complete: {
        success: { type: Boolean, default: null },
        date: Date
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Orders', Orders)