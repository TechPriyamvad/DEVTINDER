const mongoose = require("mongoose")

const nestedSchema = new mongoose.Schema({
    street: String,
    city: {
        type: String,
        validate:(value)=>console.log(value),
        enum:["delhi","mumbai","kolkata","chennai"]
    },
    state: String,
    zipCode: String
})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 50,
        minlength: 2,
        trim:true,
        lowercase:true,
        match: /^[a-zA-Z\s]+$/
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
    },
    age:{
        type:Number,
        min: 18,
    },
    address: nestedSchema,
    photoUrl:{
        type:String,
        default:"https://www.nationalgeographic.com/travel/article/himalayas-hiking-practical-guide"
    }
},{timestamps:true})

const userModel= mongoose.model('Users',userSchema)
const userTypes = mongoose.Schema.Types
module.exports = {userModel,userTypes}