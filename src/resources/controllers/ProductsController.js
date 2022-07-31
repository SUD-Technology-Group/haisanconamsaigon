const products = require('../models/products')

const ProductController = {
    // Add product: add one

    postAddProduct: (req, res, next) => {
        const user = {
            pid: req.body.pid,
            product_name: req.body.product_name,
            price: req.body.price,
            size_of_product: req.body.price,
            color_of_product: req.body.price,
            total_amount: req.body.total_amount,
            slug: req.body.slug,
            description: req.body.description
        }
        res.json({ user: user })
    },

    // Get product: get one
    getProductDetail: (req, res, next) => {
        products.findOne({ slug: req.params.slug })
            .then(product => {
                if (!product) {
                    req.flash('error', 'Không tìm thấy sản phẩm')
                    res.json({ error: "Không tìm thấy sản phẩm" })
                } else {
                    let colorAmount = 0
                    let sizeAmount = 0
                    let listSize = req.body.size_of_product || []
                    let listColor = req.body.color_of_product || []
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
                        pid: req.body.pid,
                        name: req.body.product_name,
                        price: req.body.price,
                        avatar: req.body.images[0],
                        images: req.body.images,
                        decs: req.body.description,
                        slug: req.body.slug,
                        amount: sizeAmount + colorAmount,
                        size: listSize,
                        color: listColor
                    }
                    res.json({ data: data })
                }
            })
    }
}

module.exports = ProductController