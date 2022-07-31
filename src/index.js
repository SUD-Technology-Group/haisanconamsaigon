const express = require('express')
const handlebars = require('express-handlebars')
const port = process.env.PORT || 8080
const app = express()
const path = require('path')
require('dotenv').config()
const db = require('./config/db')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// router
const ProductRouter = require('./resources/routers/ProductsRouter')

db.connect();

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('cookie-parser')('abc'))
app.use(require('express-session')())

app.use(cookieParser('sud'))
app.use(session({ cookie: { maxAge: 30000 } }))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    res.render('home')
})

app.use('/product', ProductRouter)

app.listen(port, () => console.log('Server started'))