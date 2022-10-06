const express = require('express')
const handlebars = require('express-handlebars')
const port = process.env.PORT || 3000
const app = express()
const path = require('path')
require('dotenv').config()
const db = require('./config/db')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// router
const AdminRouter = require('./resources/routers/AdminRouter')
const SeafoodRouter = require('./resources/routers/SeafoodRouter')
const MenuRouter = require('./resources/routers/MenuRouter')
const UserRouter = require('./resources/routers/UserRouters')
const CollectionRouter = require('./resources/routers/CollectionRouter')
const NewsRouter = require('./resources/routers/NewsRouter')
const DiscountRouter = require('./resources/routers/DiscountRouter')
const BannerRouter = require('./resources/routers/BannerRouter')
const FoodRouter = require('./resources/routers/FoodRouter')
const Users = require('./resources/models/Users')
const OrderRouter = require('./resources/routers/OrderRouter')
const BannerService = require('./resources/services/Banner')
const getMenuList = require('./resources/middlewares/getMenuList')
db.connect();

// Users.find({})
//     .then(users => {
//         if (users.length == 0) {
//             let admin = {
//                 username: 'admin',
//                 fullname: 'admin',
//                 position: 'admin',
//                 email: 'admin@gmail.com',
//                 phone: '0767916592',
//                 password: '123123'
//             }

//             new Users(admin).save()
//         }
//     })



app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        select: function (selected, options) {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        },
        toPrice: function (price) {
            return Number(price).toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
    }
}))
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cookieParser('sud'))
app.use(session({ cookie: { maxAge: 30000 } }))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/admin', AdminRouter)
app.use('/seafood', SeafoodRouter)
app.use('/menu', MenuRouter)
app.use('/users', UserRouter)
app.use('/collections', CollectionRouter);
app.use('/news', NewsRouter)
app.use('/discount', DiscountRouter)
app.use('/banner', BannerRouter)
app.use('/order', OrderRouter)
app.use('/food', FoodRouter)
app.get('/', getMenuList, (req, res) => {
    BannerService.get("banner")
        .then(b => {
            res.render('Pages/Others/home', {
                hideFooter: true,
                video: b.url,
                menuList: req.menuList
            })
        })
        .catch(() => {
            res.render('Pages/Others/home', {
                hideFooter: true
            })
        })

})


app.get('/menu-party', (req, res) => {
    res.render('Pages/Products/menu-party');
})

app.get('/menu-food', (req, res) => {
    res.render('Pages/Products/menu-food');
})

app.get('/menu-drinks', (req, res) => {
    res.render('Pages/Products/menu-drinks');
})

app.get('/contact', (req, res) => {
    console.log(__dirname);
    res.render('Pages/Others/contact');
})

app.get('/discount', (req, res) => {
    res.render('Pages/Others/discount');
})

app.get('/shopping-cart', (req, res) => {
    const error = req.flash('error') || '';
    const success = req.flash('success') || '';
    res.render('Pages/Others/shoppingCart', { error, success });
})



app.listen(port, () => console.log('Server started'))

