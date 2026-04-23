// creating a basic web server using express
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt')
const connectDb = require('./configs/db')
const {userModel,userTypes} = require('./models/user')
const { USER1 } = require('./constants/user')
const app = express()
const PORT = 3000
const saltRounds = 12

 // Middleware to parse JSON bodies
app.use(express.json())

// Define routes here (before starting server)
app.post('/signup', async (req, res) => {
    try {
        const userJson = req.body
        const {email,password} = userJson
        // valid email check
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email format"})
        }

        // valid password check
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message:"Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols"})
        }

        const checkUser = await userModel.findOne({email: email})
        if(checkUser){
            return res.status(400).json({message:"User with email " + email + " already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        userJson.password = hashedPassword
        const user = new userModel(userJson)
        await user.save({validateBeforeSave:true})
        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error:error.message, stack: error.stack })
    }
})


// update user age by email
app.patch('/userByEmail', async (req, res) => {
    try {
        const {email,city,age,name} = req.body
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { "age": age, "address.city": city, "name": name } },
            { returnDocument: 'after', runValidators: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: "User with email " + email + " not found" })
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error:error.message, stack: error.stack })
    }
})


// find user by email
app.get('/userByEmail',async (req,res)=>{
    try{
        const {email} = req.body
        const user = await userModel.findOne()
        if(!user){
            return res.status(404).json({message:"User with email " + email + " not found"})
        }
        res.status(200).json({message:"User with email " + email + " fetched successfully",user})
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error:error.message, stack: error.stack }) 

    }
})


// find all users 
app.get('/feed',async (req,res)=>{
    try {
        const users = await userModel.find()
        if(users.length === 0){
            return res.status(404).json({message:"No users found"})
        }
        res.status(200).json({message:"Users fetched successfully",users})
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error:error.message, stack: error.stack })
    }
})


// find user by Id
app.get('/userById/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({message:"User with ID " + id + " not found"})
        }
        res.status(200).json({message:"User with ID " + id + " fetched successfully",user})
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error:error.message, stack: error.stack })
    }
})


// delete a user by mongodb object id
app.delete('/userById/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).json({message:"User with ID " + id + " not found"})
        }
        res.status(200).json({message:"User with ID " + id + " deleted successfully",user: deletedUser})
    } catch (error) {
        res.status(500).json({message:"Error deleting user",error:error.message, stack: error.stack})
    }
})

// login api
app.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body

        // check if email exists
        const user = await userModel.findOne({email: email})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }

        // compare hashed password with the password provided by user
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(401).json({message:"Invalid credentials"})
        }
        res.status(200).json({message:"User logged in successfully"})

    } catch (error) {
        res.status(500).json({ message: "Error logging user", error:error.message, stack: error.stack })
    }
})
// starting the server
connectDb().then(() => {
    console.log("Database connected successfully")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((error) => {
  console.log("Failed to start server due to database connection error", error)
  process.exit(1)
})
