const OrderServices = require('../services/Orders')

const OrderController = {
    // POST /order/add
    addOrder: (req, res, next) => {
        const { fullname, email, phone, address, total, product_list } = req.body;
        if (product_list == '[]') {
            req.flash('error', "Vui lòng thêm sản phẩm vào giỏ")
            return res.redirect('/order/add')
        }
        let listProduct = [];
        const list = JSON.parse(product_list);
        list.forEach(p => {
            p = JSON.parse(p)
            const product = {
                pid : p.id,
                name: p.name,
                price: Number(p.price),
                stringPrice: p.stringPrice,
                img: p.img,
                inventory: Number(p.inventory),
                size: p.size,
                slug: p.slug,
                numberOfUnit: p.numberOfUnit
            }
            listProduct.push(product);
            
        })
        const info = {
            fullname: fullname,
            email: email,
            phone: phone,
            address: address
        }
        const order = {
            Customer: info,
            total: total,
            product_list: listProduct,
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
                    let successList = []
                    order.forEach((item, index) => {
                        const currentOrder = {
                            id: item._id,
                            index: index + 1,
                            total: item.total,
                            customer: item.Customer,
                            product_list: item.product_list,
                            status: item.status,
                            complete: item.complete,
                            createdAt: item.createdAt
                        }
                        if (item.status == 'Chờ xử lý') {
                            orderList.push(currentOrder);
                        } else {
                            successList.push(currentOrder);
                        }
                    })
                    return res.render('Pages/Order/orderList', {
                        layout: 'admin',
                        data: orderList,
                        error,
                        successList,
                        success
                    });
                }
            })
    },
    // POST /order/update/:id
    editStatus: (req,res,next) => {
        const id = req.params.id;
        const {status} = req.body;
        OrderServices.update(id, status)
            .then(doc => {
                req.flash('success', 'Cập nhật dơn hàng thành công');
                res.redirect('/order/all');
            })
            .catch(err => {
                req.flash('error', 'Cập nhật dơn hàng thất bại');
                res.redirect('/order/all');
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
    },
    // GET /order/delete/:id
    deleteOrder: (req,res,next) => {
        OrderServices.delete(req.params.id)
            .then(()=> {
                req.flash('success', 'Xóa đơn hàng thành công');
                res.redirect('/order/all');
            })
            .catch(err => {
                req.flash('error', 'Xóa đơn hàng thất bại');
                res.redirect('/order/all');
            })
    }
    
    
}

module.exports = OrderController