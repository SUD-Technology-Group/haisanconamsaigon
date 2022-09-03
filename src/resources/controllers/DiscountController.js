const Discounts = require('../models/Discounts');
const slugify = require('slugify');
const fs = require('fs');
const moment = require('moment');
const DiscountController = {
    getDiscount: (req, res, next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        Discounts.find()
            .select({ content: 0 })
            .then(discount => {
                if (discount.length == 0) {
                    return res.render('Pages/Discount/discountList', {
                        layout: 'admin',
                        pageName: 'khuyến mãi',
                        empty: true,
                        error,
                        success
                    })
                }
                let index = 0
                const data = discount.map(n => {
                    index++
                    return {
                        id: n._id,
                        index: index,
                        title: n.title,
                        subtitle: n.subtitle,
                        createdAt: moment(n.createdAt).format('LLLL'),
                        image: n.image,
                        slug: n.slug
                    }
                })

                return res.render('Pages/Discount/discountList', {
                    layout: 'admin',
                    data,
                    error,
                    success
                })
            })
            .catch(next);
    },
    getDiscountContent: (req, res, next) => {
        Discounts.findById(req.params.id)
            .select({ content: 1 })
            .then(discount => {
                res.json({ content: discount.content })
            })
    },
    addDiscount: (req, res, next) => {
        const { title, subtitle, content } = req.body;
        if (!req.file) {
            req.flash('error', 'Vui lòng chọn ảnh khuyến mãi')
            res.redirect('/discount/add')
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
        const image = `/uploads/discount/${title}/${file.filename}`
        const discount = {
            title, subtitle, content, image, slug
        }
        return new Discounts(discount).save()
            .then(() => {
                req.flash('success', 'Thêm khuyến mãi thành công')
                res.redirect('/discount/add')
            })
            .catch(err => {
                req.flash('error', 'Thêm khuyến mãi thất bại ' + err)
                res.redirect('/discount/add')
            })

    },

    updateDiscount: (req, res, next) => {
        const { title, subtitle, content, old_image } = req.body;
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
            image = `/uploads/discount/${title}/${file.filename}`
        }

        const discount = {
            title, subtitle, content, image, slug
        }



        Discounts.findByIdAndUpdate(req.params.id, { $set: discount })
            .then(() => {
                req.flash('success', 'Cập nhật khuyến mãi thành công')
                res.redirect('/discount/all')
            })
            .catch(err => {
                req.flash('error', 'Cập nhật khuyến mãi thất bại ' + err)
                res.redirect('/discount/all')
            })

    },

    deleteDiscount: (req, res, next) => {
        Discounts.findByIdAndDelete(req.params.id)
            .then(discount => {
                fs.rmdir(`./src/public/uploads/discount/${discount.title}`, { recursive: true }, err => {
                    if (!err) {
                        req.flash('success', `Xóa khuyến mãi ${discount.title} thành công`)
                        res.redirect('/discount/all')
                    } else {
                        req.flash('error', `Xóa khuyến mãi ${discount.title} thất bại`)
                        res.redirect('/discount/all')
                    }
                })
            })
            .catch(err => {
                req.flash('error', `Xóa khuyến mãi thất bại ` + err)
                res.redirect('/discount/all')
            })
    }

}

module.exports = DiscountController;