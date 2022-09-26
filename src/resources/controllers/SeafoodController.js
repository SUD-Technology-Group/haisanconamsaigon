const fs = require('fs');
const SeafoodService = require('../services/Seafoods');
const createSlug = require('../utils/createSlug');
const { handleUploads } = require('../utils/handleUploads');
let src = 'uploads/seafood';


const SeafoodController = {
    // POST /admin/add-product
    postAddSeafood: async (req, res, next) => {
        if (!req.files) {
            req.flash('error', 'Vui lòng chọn hình sản phẩm');
            return res.redirect('/admin/add-product');
        }

        const file = req.files;
        const { name, size, description, quantity, price } = req.body;
        const slug = createSlug(name, {});

        let listImages = []
        file.map(f => { listImages.push(`/uploads/seafood/${name}/${f.filename}`) })
        let priceObject = price.map((item, index) => {
            return {
                cost: item,
                size: size[index],
                quantity: quantity[index]
            }
        })

        await SeafoodService
            .create({
                name: name,
                description: description,
                price: priceObject,
                image: listImages,
                slug,
            })
            .then(() => {
                req.flash('success', 'Thêm hải sản thành công');
                return res.redirect('/admin/add-product');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/admin/add-product');
            })
    },

    // PUT /admin/update
    updateSeafood: async (req, res, next) => {
        const { name, size, description, quantity, price, old_name, old_image } = req.body;
        const slug = createSlug(name, {});
        const files = req.files;

        let priceObject = price.map((item, index) => {
            return {
                cost: item,
                size: size[index],
                quantity: quantity[index]
            }
        })
        let listImages = handleUploads(old_name, name, src, old_image, files);
        await SeafoodService
            .update(req.params.id, {
                name: name,
                description: description,
                price: priceObject,
                image: listImages,
                slug
            })
            .then(() => {
                req.flash('success', 'Cập nhật hải sản thành công')
                res.redirect('/admin/list-product')
            })
            .catch(err => {
                req.flash('error', 'Cập nhật hải sản thất bại ' + err)
                res.redirect('/admin/list-product')
            })
    },

    // GET /admin/delete
    getDeleteSeafood: async (req, res, next) => {
        await SeafoodService
            .delete(req.params.id)
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
    // GET /seafood/all
    getAllSeafood: async (req, res, next) => {
        await SeafoodService.list({}, {})
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
                            description: item.description,
                            slug: item.slug
                        }
                        seaFoodList.push(currentSeafood)
                    })
                    return res.json({ message: "Thành công", seaFoodList })
                }

            })
    },

    // GET /seafood/:slug
    getDetailSeafood: async (req, res, next) => {
        const slug = req.params.slug;
        await SeafoodService.get(slug)
            .then(seafood => {
                let data = {
                    id: seafood._id,
                    name: seafood.name,
                    description: seafood.description,
                    bought: seafood.bought,
                    image: seafood.image,
                    avatar: seafood.image[0],
                    type: seafood.price,
                    slug: seafood.slug
                }


                return res.render('Pages/Products/detail', {
                    data: data,
                    pageName: 'Hải sản tươi sống'
                });
            })
    }
}

module.exports = SeafoodController;