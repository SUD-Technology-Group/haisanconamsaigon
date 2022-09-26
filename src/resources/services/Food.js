const Foods = require('../models/Foods');

const FoodService = {
    get: async (slug) => {
        return Foods.findOne({ slug }).lean();
    },

    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;

        return Foods.find(condition)
            .sort({ createdAt: -1 })
            .select({ description: 0 })
            .skip(skip)
            .limit(limit)
            .lean()
    },

    getDescription: async (id) => {
        return Foods.findById(id).select({ description: 1 })
    },

    create: async (data) => {
        return Foods.create(data);
    },

    update: async (id, data) => {
        return Foods.findByIdAndUpdate(id, { $set: data });
    },

    // changeStatus: async (id, size, quantity) => {
    //     return Foods.findOneAndUpdate({ _id: id, size: size }, { $set: { 'price.quantity': quantity, status: status } });
    // },

    delete: async (id) => {
        return Foods.findByIdAndDelete(id);
    }
};

module.exports = FoodService;