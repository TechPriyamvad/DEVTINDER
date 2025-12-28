// creating a basic web server using express
const express = require('express')
const app = express()

const PORT = 3000

// defining a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, DevTinder!')
})

// defining routes
app.get('/test1',function test1Callback(req, res){
  res.send('This is a test1 endpoint.')
})

app.get('/test2',function test2Callback(req,res){
    res.send('This is test2 endpoint')
})

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
