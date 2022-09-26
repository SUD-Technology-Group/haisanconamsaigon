const OrderServices = require('../services/Orders')

const OrderController = {
    // POST /order/add
    addOrder: (req, res, next) => {
        const { fullname, email, phone, address, total, product_list } = req.body;
        if (product_list == '[]') {
            req.flash('error', "Vui lòng thêm sản phẩm vào giỏ")
            return res.redirect('/order/add')
        }
        const info = {
            fullname: fullname,
            email: email,
            phone: phone,
            address: address
        }
        const order = {
            Customer: info,
            total: total,
            product_list: product_list,
        }
        OrderServices.create(order)
            .then(() => {
                req.flash('success', 'Tạo đơn hàng thành công')
                return res.redirect('/order/add')
            })
            .catch(err => {
                req.flash('error', 'Tạo đơn hàng thất bại ' + err)
                res.redirect('/order/add')
            })
    },

    // GET /order/all
    getAllOrder: (req, res, next) => {
        Orders.list({}, {})
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
    },
    updateOrder: (req, res, next) => {
        const { status } = req.body;
        const list = JSON.parse(product_list)
        if (status == 'Hoàn thành') {
            list.forEach(item => {
                const id = item.id;
                const price = item.price;
                OrderServices.changeStatus(id, price.size, price.quantity - 1, status)
            })
        } else if (status == 'Hủy bỏ') {
            list.forEach(item => {
                const id = item.id;
                const price = item.price;
                OrderServices.changeStatus(id, price.size, price.quantity, status)
            })
        }
    }
}

module.exports = OrderController