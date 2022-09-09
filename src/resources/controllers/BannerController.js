const Banner = require('../models/Banner')
const BannerService = require('../services/Banner')
const root = process.env.ENVIRONMENT == 'dev' ? './src/public' : './haisanconamsaigon/src/public';
const fs = require('fs')
const BannerController = {
    // GET /banner/
    getBanner: async (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        await BannerService.get('banner')
            .then(banner => {
                if (banner) {
                    res.render('Pages/Banner/updateVideo', { layout: "admin", video: banner.url, success, error })
                } else {
                    res.render('Pages/Banner/updateVideo', { layout: "admin", video: "splashVideo", success, error })
                }
            })
    },
    // POST /banner/update
    updateBanner: async (req, res, next) => {
        const file = req.file
        if (file) {
            const url = `/uploads/banner/video/${file.filename}`
            const banner = {
                id: "banner",
                url
            }
            await BannerService.get('banner')
                .then(b => {
                    if (b) {
                        BannerService.update('banner', banner)
                            .then(result => {
                                fs.unlinkSync(`${root}/${result.url}`, err => {
                                    if (err)
                                        console.log(err)
                                })
                                req.flash('success', 'Cập nhật banner thành công')
                                return res.redirect('/banner/')
                            })
                    } else {
                        Banner.create(banner)
                            .then(() => {
                                req.flash('success', 'Đăng banner mới thành công')
                                return res.redirect('/banner/')
                            })
                    }
                })
        } else {
            return res.redirect('/banner/')
        }
    }
}

module.exports = BannerController