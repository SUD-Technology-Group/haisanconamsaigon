const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Seafoods = new Schema({
    name: { type: String, required: true },
    image: { type: [String], required: true },
    size: { type: [String] },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    bought: { type: Number, default: 0 },
    slug: { type: String, slug: 'name' }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Seafoods', Seafoods);