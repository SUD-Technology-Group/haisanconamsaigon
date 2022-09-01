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
        priceObject = price.map((item, index) => {
            return {
                cost: item,
                size: size[index],
                quantity: quantity[index]
            }
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
            name, description, price: priceObject, slug,
            image: listImages
        }
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
    updateSeafood: async (req, res, next) => {
        const { name, size, description, quantity, price, old_name, old_image } = req.body;
        let listImages = old_image
        const slug = slugify(name, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        priceObject = price.map((item, index) => {
            return {
                cost: item,
                size: size[index],
                quantity: quantity[index]
            }
        })
        // Change seafood name
        if (name != old_name) {
            // Not change image
            if (req.files.length == 0) {
                const currentPath = `./src/public/uploads/seafood/${old_name}`
                const newPath = `./src/public/uploads/seafood/${name}`
                listImages = listImages.map(item => {
                    let imageName = item.split('/').pop()
                    return `/uploads/seafood/${name}/${imageName}`
                })
                fs.renameSync(currentPath, newPath)
            } else { // Change image
                fs.rmdir(`./src/public/uploads/seafood/${old_name}`, { recursive: true }, err => {
                    if (err)
                        console.log(err)
                })
            }
        }
        else if (req.files.length !== 0) {
            old_image.forEach(item => {
                const path = `./src/public${item}`
                fs.unlinkSync(path, err => {
                    if (err)
                        console.log(err)
                })
            })
            listImages = []
            const file = req.files;
            file.map(f => {
                let url = `/uploads/seafood/${name}/${f.filename}`
                listImages.push(url)
            })

        }

        const seafood = {
            name, description, price: priceObject, slug,
            image: listImages
        }

        await Seafoods.findByIdAndUpdate(req.params.id, { $set: seafood })
            .then(() => {
                req.flash('success', 'Cập nhật hải sản thành công')
                res.redirect('/admin/list-product')
            })
            .catch(err => {
                req.flash('error', 'Cập nhật hải sản thất bại ' + err)
                res.redirect('/admin/list-product')
            })
    },
    getDeleteSeafood: (req, res, next) => {
        const id = req.params.id;
        Seafoods.findByIdAndDelete(id)
            .then(seafood => {
                fs.rmdir(`./src/public/uploads/seafood/${seafood.name}`, { recursive: true }, (err) => {
                    if (!err) {
                        req.flash('success', `Xóa ${seafood.name} thành công`);
                        return res.redirect('/admin/list-product');
                    }
                    else {
                        req.flash('error', 'Xóa sản phẩm thất bại ' + err);
                        return res.redirect('/admin/list-product');
                    }

                })
            })
            .catch(() => {
                req.flash('error', 'Xóa sản phẩm thất bại');
                return res.redirect('/admin/list-product');
            })
    },
    getAllSeafood: async (req, res, next) => {
        await Seafoods.find()
            .then(seafoods => {
                if (seafoods.length == 0) {
                    return res.json({ message: "Không có hải sản nào" })
                } else {
                    let seaFoodList = []
                    seafoods.forEach(item => {
                        const currentSeafood = {
                            id: item._id,
                            name: item.name,
                            image: item.image,
                            avatar: item.image[0],
                            price: item.price,
                            description: item.description
                        }
                        seaFoodList.push(currentSeafood)
                    })
                    return res.json({ message: "Thành công", seaFoodList })
                }

            })
    }
}

module.exports = SeafoodController;