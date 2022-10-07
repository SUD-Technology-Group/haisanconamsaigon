const Orders = require('../models/Orders')

const OrderServices = {
    get: async (slug) => {
        return Orders.findOne({ slug }).lean()
    },

    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;

        return Orders.find(condition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
    },

    create: async (data) => {
        return Orders.create(data);
    },

    update: async (id, data) => {
        return Orders.findByIdAndUpdate(id, { $set: {status: data} });
    },

    changeStatus: async (id, size, quantity) => {
        return Orders.findOneAndUpdate({ _id: id, size: size }, { $set: { 'price.quantity': quantity, status: status } });
    },

    delete: async (id) => {
        return Orders.findByIdAndDelete(id);
    }
}

module.exports = OrderServices