const fs = require('fs')
const Seafoods = require('../models/Seafoods');

const SeafoodController = {
    getAddSeafood: (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';

        return res.render('/add/seafood');
    },
    postAddSeafood: (req, res, next) => {
        if(!req.file) {
            req.flash('error', 'Vui lòng chọn hình sản phẩm');
            return res.redirect('/add/seafood');
        }
        let file = req.file;
        const imagePath = "/uploads/seafood/" + file.filename;
        const { name, size, description, quantity, price } = req.body;
        
        const seafood = {
            name, size, description, quantity, price,
            image: imagePath
        }

        new Seafoods(seafood).save()
        req.flash('success', 'Thêm sản phẩm thành công');
        return res.redirect('/add/seafood');
    },
    getDeleteSeafood: (req, res, next) => {
        const id = req.params.id;
        Seafoods.findByIdAndDelete(id)
            .then(seafood => {
                fs.unlink(`src/public/${seafood.image}`, (err) => {
                    if(!err) {
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