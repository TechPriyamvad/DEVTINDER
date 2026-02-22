const mongoose = require('mongoose');
const { DB_CONNECTION_STRING } = require('../constants/db');
const connectDb = async()=>{
    try {
        await mongoose.connect(DB_CONNECTION_STRING)
    } catch (error) {
        console.log("Error connecting to database", error)
    }
}
module.exports = connectDb