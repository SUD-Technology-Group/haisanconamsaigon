const Seafoods = require('../models/Seafoods');

const CollectionController = {
    getSeafoods: (req, res, next) => {
        Seafoods.find({}).select({description: 0}).limit(16)
            .then(seafoods => {
                if(!seafoods) {
                    return res.render('Pages/Products/seafood', {
                        data: []
                    })
                }

                let data = seafoods.map(seafood => {
                    return {
                        name: seafood.name,
                        image: seafood.image,
                        quantity: seafood.quantity,
                        size: seafood.size,
                        price: seafood.price
                    }
                })

                return res.render('Pages/Products/seafood', {
                    data: data
                })
            })
    }
}

module.exports = CollectionController;