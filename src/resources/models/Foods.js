const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Foods = new Schema({
    foodName: { type: String, required: true },
    foodType: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    description: { type: String },
    slug: { type: String, slug: 'name' },
    createdAt: { type: Date, default: Date.now() }
}, {
    timestamps: true
});

module.exports = mongoose.model('Foods', Foods);