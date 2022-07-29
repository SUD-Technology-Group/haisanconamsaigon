const express = require('express')
const handlebars = require('express-handlebars')
const port = process.env.PORT || 8080
const app = express()
const path = require('path')
require('dotenv').config()


app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => console.log('Server started'))