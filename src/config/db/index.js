const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://sudTech:9999@cluster0.vlcj1l2.mongodb.net/conamsaigon?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect to DB successfully')
    } catch (error) {
        console.log("Connect failed conamsaigon " + error)
    }
}

module.exports = { connect };