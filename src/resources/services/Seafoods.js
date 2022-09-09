const Seafoods = require('../models/Seafoods');

const SeafoodService = {
    get: async (slug) => {
        return await Seafoods.findOne({slug})
    },

    list: async (options) => {
        return await Seafoods.find({})
            .sort({createdAt: -1})
            .skip(options.skip || 0)
            .limit(options.limit || false)
            .lean()
    },

    create: async (data) => {
        return await Seafoods.create(data);
    },

    update: async (id, data) => {
        return await Seafoods.findByIdAndUpdate(id, data);
    },

    delete: async (id) => {
        return await Seafoods.findByIdAndDelete(id);
    }
}

module.exports = SeafoodService;