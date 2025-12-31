// creating a basic web server using express
const express = require('express')
const app = express()

const PORT = 3000

// defining routes
// handle requests to /test1,/test1111,test1/abc
app.use('/test1',function test1Callback(req, res){
  res.send('This is a test1 endpoint.')
})

app.use('/test2',function test2Callback(req,res){
    res.send('This is test2 endpoint')
})

app.use('/test2/abc',function test2Callback(req,res){
    res.send('This is test2abc endpoint')
})

// defining a route for the root URL
app.use('/', (req, res) => {
  res.send('Hello, DevTinder!')
})

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
