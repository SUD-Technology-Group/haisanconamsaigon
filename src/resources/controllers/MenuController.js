const Menus = require('../models/Menu')
const fs = require('fs')
const slugify = require('slugify');
const Menu = require('../models/Menu');

const MenuController = {
    postAddMenu: (req, res, next) => {
        if (!req.file) {
            req.flash('error', 'Vui lòng chọn hình thực đơn');
            return res.redirect('/admin/add-product');
        }
        const file = req.file;
        const { menu_name, menu_description, } = req.body;
        let image = `/uploads/menu/${menu_name}/${file.filename}`
        const slug = slugify(menu_name, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        const menu = {
            name: menu_name, description: menu_description, slug, image
        }
        return new Menus(menu).save()
            .then(() => {
                req.flash('success', 'Thêm thực đơn thành công');
                return res.redirect('/admin/add-product');
            })
            .catch(err => {
                req.flash('error', 'Thêm thực đơn thất bại ' + err);
                return res.redirect('/admin/add-product');
            })
    },
    getAllMenu: (req, res, next) => {
        Menus.find()
            .then(menus => {
                if (menus.length == 0) {
                    return res.json({ menuList, message: "Không có sản thực đơn nào" })
                } else {
                    let menuList = []
                    menus.forEach(item => {
                        const currentMenu = {
                            id: item._id,
                            name: item.name,
                            image: item.image,
                            description: item.description,
                            slug: item.slug
                        }
                        menuList.push(currentMenu)
                    })
                    return res.json({ message: "Thành công", menuList })
                }
            })
    },
    updateMenu: (req, res, next) => {
        
        Menu.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
            if (err) {
                req.flash('error', 'Cập nhật sản phẩm thất bại')
                res.redirect('/admin/list-product')
            } else {
                req.flash('success', 'Cập nhật sản phẩm thành công')
                res.redirect('/admin/list-product')
            }
        })
    }
}

module.exports = MenuController