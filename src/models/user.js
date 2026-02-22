const mongoose = require("mongoose")

const nestedSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String
})
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    address: nestedSchema
})

const userModel= mongoose.model('Users',userSchema)
module.exports = userModel