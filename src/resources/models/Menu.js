const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Menus = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    slug: { type: String, slug: 'name' }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Menus', Menus);