const products = require('../models/products')
const slugify = require('slugify')
const ProductController = {
    // Add product: add one
    postAddProduct: (req, res, next) => {

        const slug = slugify(req.body.product_name + ' ' + req.body.pid, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        let listSize = req.body.size_of_product || []
        let listColor = req.body.color_of_product || []
        const product = {
            pid: req.body.pid,
            product_name: req.body.product_name,
            price: req.body.price,
            size_of_product: listSize,
            color_of_product: listColor,
            slug: slug,
            description: req.body.description
        }
        return new products(product).save()
            .then(() => {
                res.json({ message: "Thêm sản phẩm thành công", data: product })
            })
            .catch(err => {
                res.json({ message: "Thêm sản phẩm thất bại " + err })
            })
    },

    // Get product: get one
    getProductDetail: async (req, res, next) => {
        return res.render('detail');
        await products.findOne({ slug: req.params.slug })
            .then(product => {
                if (!product) {
                    req.flash('error', 'Không tìm thấy sản phẩm')
                    res.json({ error: "Không tìm thấy sản phẩm" })
                } else {
                    let colorAmount = 0
                    let sizeAmount = 0
                    let listSize = product.size_of_product || []
                    let listColor = product.color_of_product || []
                    if (listColor) {
                        colorAmount = listColor.reduce((prev, next) => {
                            return prev.color_amount + next.color_amount
                        })
                    }
                    if (listSize) {
                        sizeAmount = listSize.reduce((prev, next) => {
                            return prev.size_amount + next.size_amount
                        })
                    }

                    const data = {
                        pid: product.pid,
                        name: product.product_name,
                        price: product.price,
                        avatar: product.images[0],
                        images: product.images,
                        decs: product.description,
                        slug: product.slug,
                        size: listSize,
                        color: listColor
                    }
                    res.json({ data: data })
                }
            })
    },

    // Update product: update one
    updateProduct: async (req, res, next) => {
        const slug = slugify(req.body.product_name + ' ' + req.body.pid, {
            replacement: '-',
            remove: false,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true
        })
        let listSize = req.body.size_of_product || []
        let listColor = req.body.color_of_product || []
        const product = {
            pid: req.body.pid,
            product_name: req.body.product_name,
            price: req.body.price,
            size_of_product: listSize,
            color_of_product: listColor,
            slug: slug,
            description: req.body.description
        }
        await products.findOneAndUpdate({ slug: req.params.slug }, product, (err, doc) => {
            if (err) {
                res.json({ message: "update thất bại" })
            } else {
                res.json({ message: "update thành công", data: doc })
            }
        })
    }
}

module.exports = ProductController