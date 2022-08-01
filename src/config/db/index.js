const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://sheldon124:Dung1247@cluster0.phwvla3.mongodb.net/haisaiconamsaigon?retryWrites=true&w=majority')
        console.log('Connect to DB successfully')
    } catch (error) {
        console.log("Connect failed " + error)
    }
}

module.exports = { connect }