const Seafoods = require('../models/Seafoods');

const SeafoodService = {
    get: async (slug) => {
        return Seafoods.findOne({ slug })
    },

    list: async (options) => {
        return Seafoods.find({})
            .sort({ createdAt: -1 })
            .lean()
    },

    create: async (data) => {
        return Seafoods.create(data);
    },

    update: async (id, data) => {
        return Seafoods.findByIdAndUpdate(id, { $set: data });
    },

    delete: async (id) => {
        return Seafoods.findByIdAndDelete(id);
    }
}

module.exports = SeafoodService;