const FoodService = require('../services/Food');
const createSlug = require('../utils/createSlug');
const { handleUploadsSingle } = require('../utils/handleUploads');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const root = process.env.ENVIRONMENT == 'dev' ? './src/public' : './haisanconamsaigon/src/public';
const FoodController = {
    // GET: food/add-food
    getAddFood: (req, res, next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        res.render('Pages/Food/addFood', { layout: "admin", error, success });
    },
    // POST: /food/add
    postAddFood: async (req, res, next) => {
        const file = req.file;
        if (!file) {
            req.flash('error', 'Vui long chọn ảnh');
            return res.redirect('/food/add-food');
        }
        const { name, type, price, description } = req.body;
        const image = `/uploads/food/${name}/${file.filename}`;
        const slug = createSlug(name, {});
        await FoodService.create({
            foodName: name,
            foodType: type,
            image,
            price: price,
            slug,
            description
        })
            .then(() => {
                req.flash('success', 'Thêm menu món ăn / đồ uống thành công');
                res.redirect('/food/add-food');
            })
            .catch(err => {
                req.flash('error', 'Thêm menu món ăn / đồ uống thất bại ' + err);
                res.redirect('/food/add-food');
            })
    },
    // GET /food/all
    getAllFoods: async (req, res, next) => {
        await FoodService.list({}, {})
            .then(foods => {
                if (foods.length == 0) {
                    return res.json({ message: "Không có menu" });
                } else {
                    let foodList = [];
                    foods.forEach(item => {
                        const food = {
                            id: item._id,
                            name: item.foodName,
                            image: item.image,
                            price: item.price,
                            slug: item.slug,
                            type: item.foodType
                        };
                        foodList.push(food);
                    });
                    return res.json({ message: "Thành công", foodList });
                };
            });
    },
    // GET /food/list
    getListFoods: async (req, res, next) => {
        const success = req.flash('success') || "";
        const error = req.flash('error') || "";
        await FoodService.list({}, {})
            .then(food => {
                if (food.length == 0) {
                    return res.render('Pages/Food/foodList', {
                        layout: 'admin',
                        empty: true,
                        error,
                        success
                    })
                }
                let index = 0;
                const data = food.map(n => {
                    index++
                    return {
                        id: n._id,
                        index: index,
                        name: n.foodName,
                        price: n.price,
                        stringPrice: n.price.toLocaleString('vi', { style: 'currency', currency: "VND" }),
                        createdAt: moment(n.createdAt).format('LLLL'),
                        image: n.image,
                        slug: n.slug,
                        type: n.foodType
                    }
                });

                return res.render('Pages/Food/foodList', {
                    layout: 'admin',
                    data,
                    error,
                    success
                });
            })
            .catch(next);
    },
    // GET /food/:slug
    getDetailFood: async (req, res, next) => {
        const slug = req.params.slug;
        await FoodService.get(slug)
            .then(food => {
                let data = {
                    id: food._id,
                    name: food.foodName,
                    foodType: food.foodType,
                    description: food.description,
                    image: [food.image],
                    avatar: food.image,
                    slug: food.slug,
                    price: food.price
                };

                return res.render('Pages/Products/detail', {
                    data: data,
                    food: true,
                    pageName: 'Menu món ăn'
                });
            })
    },
    // GET /food/desc/:id
    getFoodDescription: async (req, res, next) => {
        await FoodService.getDescription(req.params.id)
            .then(food => {
                res.json({ description: food.description })
            })
    },
    // GET /food/delete/:id 
    deleteFood: async (req, res, next) => {
        await FoodService.delete(req.params.id)
            .then(food => {
                fs.rmdir(`./src/public/uploads/food/${food.foodName}`, { recursive: true }, (err) => {
                    if (!err) {
                        req.flash('success', `Xóa ${food.foodName} thành công`);
                        return res.redirect('/food/list-food');
                    }
                    else {
                        req.flash('error', 'Xóa thất bại ' + err);
                        return res.redirect('/food/list-food');
                    }

                })
            })
    },
    // POST /food/update/:id
    updateFood: async (req, res, next) => {
        const { name, type, price, description, old_name, old_image } = req.body;
        const slug = createSlug(name, {});
        const file = req.file;
        const src = 'uploads/food';
        const image = handleUploadsSingle(old_name, name, src, old_image, file);
        await FoodService.update(req.params.id, {
            foodName: name,
            foodType: type,
            description: description,
            image: image,
            slug: slug,
            price: price
        })
            .then(food => {
                req.flash('success', 'Cập nhật thành công');
                res.redirect('/food/list-food');
            })
            .catch(err => {
                req.flash('error', 'Cập nhật thất bại ' + err);
                res.redirect('/food/list-food');
            });
    },
    // GET /food/drinks
    getDrinks: async (req, res, next) => {
        await FoodService.list({ foodType: 'Đồ uống' }, {})
            .then(drinks => {
                if (drinks.length == 0) {
                    res.json({ message: "Thất bại" });
                } else {
                    let listDrinks = [];
                    drinks.forEach(item => {
                        const drink = {
                            id: item._id,
                            name: item.foodName,
                            image: item.image,
                            price: item.price,
                            slug: item.slug,
                            type: item.foodType
                        };
                        listDrinks.push(drink);
                    })
                    res.json({ message: "Thành công", listDrinks });
                }
            })
    },
    // GET /food/dish
    getDish: async (req, res, next) => {
        await FoodService.list({ foodType: 'Món ăn' }, {})
            .then(dish => {
                if (dish.length == 0) {
                    res.json({ message: "Thất bại" });
                } else {
                    let listDish = [];
                    dish.forEach(item => {
                        const d = {
                            id: item._id,
                            name: item.foodName,
                            image: item.image,
                            price: item.price,
                            slug: item.slug,
                            type: item.foodType
                        };
                        listDish.push(d);
                    })
                    res.json({ message: "Thành công", listDish });
                }
            })
    }
};

module.exports = FoodController;