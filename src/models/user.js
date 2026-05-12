const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nestedSchema = new mongoose.Schema({
    street: String,
    city: {
        type: String,
        // validate:(value)=>console.log(value),
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
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

userSchema.methods.validatePassword = async function(userProvidedPassword){
    try {
        const isPasswordValid = await bcrypt.compare(userProvidedPassword, this.password);
        return isPasswordValid;
    } catch (error) {
        throw new Error(error)
    }
}

userSchema.methods.getJWT = function(secret,expiryTime){
    try {
        const payload = {
            userId: this._id,
            email: this.email
        };
        return jwt.sign(payload, secret, { expiresIn: expiryTime });
    } catch (error) {
        throw new Error(error)
    }
}

const userModel= mongoose.model('Users',userSchema)
const userTypes = mongoose.Schema.Types
module.exports = {userModel,userTypes}