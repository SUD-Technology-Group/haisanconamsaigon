const Seafoods = require('../models/Seafoods');

const SeafoodService = {
    get: async (slug) => {
        return Seafoods.findOne({ slug }).lean()
    },

    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        
        return Seafoods.find(condition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
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