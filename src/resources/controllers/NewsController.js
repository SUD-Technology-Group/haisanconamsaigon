const News = require('../models/News');
const slugify = require('slugify');

const NewsController = {
    getNews: (req, res, next) => {
        News.find()
            .select({content: 0})
            .then(news => {
                const data = news.map(n => {
                    return {
                        title: n.title,
                        subtitle: n.subtitle,
                        createdAt: n.createdAt,
                        slug: n.slug
                    }
                })

                return res.render('Pages/News/newsList', {
                    layout: 'main',
                    pageName: 'Tin tức',
                    data
                })
            })
    },
    
}

module.exports = NewsController;