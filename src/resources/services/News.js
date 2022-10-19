const News = require('../models/News');

const NewsService = {
    list: async (condition, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return News.find(condition)
            .sort({ createdAt: -1 })
            .select({ content: 0 })
            .skip(skip)
            .limit(limit)
            .lean()
    },
    detail: async (slug) => {
        return News.findOne({slug: slug})
    }
}

module.exports = NewsService;