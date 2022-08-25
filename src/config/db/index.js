const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://sudTech:9999@haisanconamsaigon.tyvyeea.mongodb.net/haisanconamsaigon?retryWrites=true&w=majority')
        console.log('Connect to DB successfully')
    } catch (error) {
        console.log("Connect failed " + error)
    }
}

module.exports = { connect }