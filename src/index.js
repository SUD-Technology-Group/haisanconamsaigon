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
db.connect();

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
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
app.get('/', (req, res) => {
    res.render('home', {
        hideFooter: true
    })
})

// app.get('/seafood', (req, res) => {
//     res.render('seafood');
// })

app.get('/menu-party', (req, res) => {
    res.render('menu-party');
})

app.get('/menu-food', (req, res) => {
    res.render('menu-food');
})

// app.get('/admin', (req, res) => {
//     res.render('adminHome', { layout: 'admin' })
// })


app.get('/shopping-cart', (req, res) => {
    res.render('shoppingCart')
})


app.listen(port, () => console.log('Server started'))