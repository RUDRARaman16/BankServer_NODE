//import mongoose
const mongoose = require('mongoose')
//connect with database
mongoose.connect('mongodb://localhost:27017/BankApp',{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
//creating a model for database
//name should be singular form of the name you given i the collection name of mongodb should start with capital letter
const User = mongoose.model('User', {
    acno: Number,
    username: String,
    password: String,
    balance: Number
})
module.exports={
    User
}