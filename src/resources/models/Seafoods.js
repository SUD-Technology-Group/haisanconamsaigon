const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Price = new Schema({
    cost: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true }
})

const Seafoods = new Schema({
    name: { type: String, required: true },
    image: { type: [String], required: true },
    description: { type: String },
    price: { type: [Price], required: true },
    bought: { type: Number, default: 0 },
    slug: { type: String, slug: 'name' }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Seafoods', Seafoods);