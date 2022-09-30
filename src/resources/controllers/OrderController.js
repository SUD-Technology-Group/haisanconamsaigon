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
                return res.redirect('/shopping-cart')
            })
            .catch(err => {
                req.flash('error', 'Tạo đơn hàng thất bại ' + err)
                res.redirect('/shopping-cart')
            })
    },

    // GET /order/all
    getAllOrder: (req, res, next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        OrderServices.list({}, {})
            .then(order => {
                if (order.length == 0) {
                    return res.render('Pages/Order/orderList', {
                        layout: 'admin',
                        empty: true,
                        error,
                        success
                    });
                } else {
                    let orderList = []
                    order.forEach((item, index) => {
                        const currentOrder = {
                            id: item._id,
                            index: index + 1,
                            total: item.total,
                            customer: item.Customer,
                            product_list: JSON.parse(item.product_list),
                            status: item.status,
                            complete: item.complete,
                            createdAt: item.createdAt
                        }
                        orderList.push(currentOrder)
                    })
                    return res.render('Pages/Order/orderList', {
                        layout: 'admin',
                        data: orderList,
                        error,
                        success
                    });
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