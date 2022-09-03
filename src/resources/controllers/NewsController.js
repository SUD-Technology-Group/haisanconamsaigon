const News = require('../models/News');
const slugify = require('slugify');
const fs = require('fs');
const moment = require('moment');
const NewsController = {
    getNews: (req, res, next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        News.find()
            .select({ content: 0 })
            .then(news => {
                if (news.length == 0) {
                    return res.render('Pages/News/newsList', {
                        layout: 'admin',
                        pageName: 'Tin tức',
                        empty: true,
                        error,
                        success
                    })
                }
                let index = 0
                const data = news.map(n => {
                    index++
                    return {
                        id: n._id,
                        index: index,
                        title: n.title,
                        subtitle: n.subtitle,
                        createdAt: moment(n.createdAt).format('LLLL'),
                        image: n.image,
                        slug: n.slug,
                        group: n.group
                    }
                })

                return res.render('Pages/News/newsList', {
                    layout: 'admin',
                    data,
                    error,
                    success
                })
            })
            .catch(next);
    },
    getNewsContent: (req, res, next) => {
        News.findById(req.params.id)
            .select({ content: 1 })
            .then(news => {
                res.json({ content: news.content })
            })
    },
    addNews: (req, res, next) => {
        const { title, subtitle, group, content } = req.body;
        if (!req.file) {
            req.flash('error', 'Vui lòng chọn ảnh tin tức')
            res.redirect('/news/add')
        }
        const slug = slugify(title, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        const file = req.file;
        const image = `/uploads/news/${title}/${file.filename}`
        const news = {
            title, subtitle, group, content, image, slug
        }
        return new News(news).save()
            .then(() => {
                req.flash('success', 'Thêm tin tức thành công')
                res.redirect('/news/add')
            })
            .catch(err => {
                req.flash('error', 'Thêm tin tức thất bại ' + err)
                res.redirect('/news/add')
            })

    },

    updateNews: (req, res, next) => {
        const { title, subtitle, group, content, old_image } = req.body;
        const slug = slugify(title, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        });
        let image = old_image
        const file = req.file;
        if (file) {
            fs.unlinkSync(`./src/public/${old_image}`, err => {
                if (err)
                    console.log(err)
            })
            image = `/uploads/news/${title}/${file.filename}`
        }

        const news = {
            title, subtitle, group, content, image, slug
        }



        News.findByIdAndUpdate(req.params.id, { $set: news })
            .then(() => {
                req.flash('success', 'Cập nhật tin tức thành công')
                res.redirect('/news/all')
            })
            .catch(err => {
                req.flash('error', 'Cập nhật tin tức thất bại ' + err)
                res.redirect('/news/all')
            })

    },

    deleteNews: (req, res, next) => {
        News.findByIdAndDelete(req.params.id)
            .then(news => {
                fs.rmdir(`./src/public/uploads/news/${news.title}`, { recursive: true }, err => {
                    if (!err) {
                        req.flash('success', `Xóa tin ${news.title} thành công`)
                        res.redirect('/news/all')
                    } else {
                        req.flash('error', `Xóa tin ${news.title} thất bại`)
                        res.redirect('/news/all')
                    }
                })
            })
            .catch(err => {
                req.flash('error', `Xóa tin thất bại ` + err)
                res.redirect('/news/all')
            })
    }

}

module.exports = NewsController;