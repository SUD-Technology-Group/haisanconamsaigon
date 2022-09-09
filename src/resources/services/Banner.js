const Banner = require('../models/Banner');

const BannerService = {
    get: async (id) => {
        return Banner.findOne({ id: id });
    },
    update: async (id, data) => {
        return Banner.findOneAndReplace({ id: id }, data);
    },
    create: async (data) => {
        return Banner.create(data);
    }

}

module.exports = BannerService;