const fs = require('fs')
const Seafoods = require('../models/Seafoods');
const slugify = require('slugify');

const SeafoodController = {
    postAddSeafood: (req, res, next) => {
        if (!req.files) {
            req.flash('error', 'Vui lòng chọn hình sản phẩm');
            return res.redirect('/admin/add-product');
        }
        let listImages = []
        const file = req.files;
        const { name, size, description, quantity, price } = req.body;
        file.map(f => {
            let url = `/uploads/seafood/${name}/${f.filename}`
            listImages.push(url)
        })
        const slug = slugify(name, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        const seafood = {
            name, size, description, quantity, price, slug,
            image: listImages
        }
        // res.json({ seafood })
        return new Seafoods(seafood).save()
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                return res.redirect('/admin/add-product');
            })
            .catch(err => {
                req.flash('error', 'Thêm sản phẩm thất bại ' + err);
                return res.redirect('/admin/add-product');
            })
    },
    getDeleteSeafood: (req, res, next) => {
        const id = req.params.id;
        Seafoods.findByIdAndDelete(id)
            .then(seafood => {
                fs.unlink(`src/public/${seafood.image}`, (err) => {
                    if (!err) {
                        req.flash('success', 'Xóa sản phẩm thành công');
                        return res.redirect('/delete/seafood');
                    }
                    else {
                        req.flash('error', 'Xóa sản phẩm thất bại');
                        return res.redirect('/delete/seafood');
                    }

                })
            })
            .catch(() => {
                req.flash('error', 'Xóa sản phẩm thất bại');
                return res.redirect('/delete/seafood');
            })
    }
}

module.exports = SeafoodController;