const Menu = require('../models/Menu');

const MenuService = {
    get: async (slug) => {
        return Menu.findOne({ slug }).lean()
    },

    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;

        return Menu.find(condition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
    },

    create: async (data) => {
        return Menu.create(data);
    },

    update: async (id, data) => {
        return Menu.findByIdAndUpdate(id, { $set: data });
    },

    delete: async (id) => {
        return Menu.findByIdAndDelete(id);
    }
}

module.exports = MenuService;