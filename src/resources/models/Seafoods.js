const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');

const Seafoods = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    size: {type: [String]},
    description: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    bought: {type: Number}
},
{
    timestamps: true
})

module.exports = mongoose.model('Seafoods', Seafoods);