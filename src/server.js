// creating a basic web server using express
const express = require('express')
const connectDb = require('./configs/db')
const userModel = require('./models/user')
const { USER1 } = require('./constants/user')
const app = express()
const PORT = 3000

// Define routes here (before starting server)
app.post('/signup', async (req, res) => {
    try {
        const user = new userModel(USER1)
        await user.save()
        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error })
    }
})

app.put('/update-user', async (req, res) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: USER1.email },
            { $set: { age: 32 } },
            { new: true }
        )
        res.status(200).json({ message: "User updated successfully", user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error })
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
