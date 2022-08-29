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
    getAllMenu: async (req, res, next) => {
        await Menus.find()
            .then(menus => {
                if (menus.length == 0) {
                    return res.json({ menuList: {}, message: "Không có thực đơn nào" })
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
    updateMenu: async (req, res, next) => {

        let menu
        const { menu_name, menu_description, oldImage, old_menu_name } = req.body;
        let image = oldImage
        const slug = slugify(menu_name, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        if (old_menu_name != menu_name) {
            if (!req.file) {
                const currentPath = `./src/public/uploads/menu/${old_menu_name}`;
                const newPath = `./src/public/uploads/menu/${menu_name}`;
                let imageName = oldImage.split('/').pop()
                image = `/uploads/menu/${menu_name}/${imageName}`
                fs.renameSync(currentPath, newPath)
            } else {
                let imageName = oldImage.split("/")
                let folderName = imageName[imageName.length - 2]
                image = `/uploads/menu/${menu_name}/${req.file.filename}`
                fs.rmdir(`./src/public/uploads/menu/${folderName}`, { recursive: true }, err => {
                    if (err)
                        console.log(err)
                })
            }
        }
        if (req.file) {
            const path = `./src/public${oldImage}`
            image = `/uploads/menu/${menu_name}/${req.file.filename}`
            fs.unlinkSync(path, err => {
                if (err)
                    console.log(err)
            })
        }
        menu = {
            name: menu_name, description: menu_description, slug, image
        }
        await Menu.findByIdAndUpdate(req.params.id, { $set: menu })
            .then(() => {
                req.flash('success', 'Cập nhật thực đơn thành công')
                res.redirect('/admin/list-product')
            })
            .catch(err => {
                req.flash('error', 'Cập nhật thực đơn thất bại ' + err)
                res.redirect('/admin/list-product')
            })
    },
    deleteMenu: async (req, res, next) => {
        await Menus.findByIdAndDelete(req.params.id)
            .then(data => {
                fs.rmdir(`./src/public/uploads/menu/${data.name}`, { recursive: true }, err => {
                    if (!err) {
                        req.flash('success', `Xóa ${data.name} thành công`)
                        res.redirect('/admin/list-product')
                    }
                })

            })
            .catch(err => {
                req.flash('error', 'Xóa thực đơn thất bại ' + err)
                res.redirect('/admin/list-product')
            })
    }
}

module.exports = MenuController