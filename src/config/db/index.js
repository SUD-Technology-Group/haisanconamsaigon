const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
    // let env = process.env.ENVIRONTMENT == 'production' 
    // ? 'mongodb+srv://sudTech:9999@cluster0.vlcj1l2.mongodb.net/conamsaigon?retryWrites=true&w=majority'
    // : 'mongodb://localhost:27017/haisanco5saigon'
    try {
        await mongoose.connect("mongodb+srv://sudTech:9999@cluster0.vlcj1l2.mongodb.net/conamsaigon?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect to DB successfully')
    } catch (error) {
        console.log("Connect failed conamsaigon " + error)
    }
}

module.exports = { connect };