const mongoose = require('mongoose')
const connectToDb = () => {
    mongoose.connect('mongodb+srv://mehruddin:secret123@cluster0.xcei59m.mongodb.net/toolsdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully')
    })
    mongoose.connection.on('error', (err) => {
        console.log('mongodb connected Failed')
    })
}

module.exports= connectToDb
