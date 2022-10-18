const Album = require('../models/Album');

const AlbumService = {
    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Album.find(condition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
    },
    update: async (id, data) => {
        return Album.findOneAndReplace({ id: id }, data);
    },
    create: async (data) => {
        return Album.create(data);
    },
    delete: async (id) => {
        return Album.findByIdAndDelete(id)
    }

}

module.exports = AlbumService;