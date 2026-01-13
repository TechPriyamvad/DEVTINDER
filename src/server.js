// creating a basic web server using express
const express = require('express')
const app = express()

const PORT = 3000

// defining routes

// generic route to handle all HTTP methods
app.use('/',function genericRouteCallback(req,res,next){
    // res.send(`This is a generic route handling ${req.method} request`)
    console.log(`This is a generic route handling ${req.method} request and path ${req.path}`)
    next()
})

// handle requests to /test1,/test1111,test1/abc
app.use('/test1',function test1Callback(req, res){
  res.send('This is a test1 endpoint.')
})

app.get('/user',function getUserCallback(req,res){
    res.send('get user endpoint')
})

app.post('/user',function postUserCallback(req,res){
    res.send('post user endpoint')
})

app.put('/user',function putUserCallback(req,res){
    res.send('put user endpoint')
})

app.patch('/user',function patchUserCallback(req,res){
    res.send('patch user endpoint')
})

app.delete('/user',function deleteUserCallback(req,res){
    res.send('delete user endpoint')
})

/*
    Symbols used in route paths:
*/

// 1. ? - preceding character is optional

app.get(/ab?c/,(req,res)=>{
    res.send('optional b in regex')
})

// 2. + - preceding character must appear one or more times
// app.get('/oneormore/ab\\+cd',(req,res)=>{
//     res.send(`${req.path}: b must appear one or more times`)
// })

app.get(/ab+c/,(req,res)=>{
    res.send('one or more b in regex')
})

// 3. * - preceding character can appear zero or more times
// app.get('/wildcard/a{b*}cd',(req,res)=>{
//     res.send(`${req.path}: b can appear zero or more times`)
// })

app.get(/a(bd).c/,(req,res)=>{
    res.send('zero or more b in regex')
})

// 4. () - group characters
// app.get('/group/a(bc)?d',(req,res)=>{
//     res.send(`${req.path}: bc is optional as a group`)
// })

// 5. Regular Expressions
app.get(/.*fly$/,(req,res)=>{
    res.send('regex in routes')
})

// adding query parameters in routes
app.get('/queryParam', (req,res)=>{
    // to access query parameters
    const myParam = req.query
    // res.send(`Query parameter received: ${myParam}`)
    res.json(myParam)
})

// how to handle dynamic data in routes using route parameters
app.get('/user/:userId/age/:age/firstName/:firstName', (req,res)=>{
    // to access dynamic data
    const userId = req.params
    res.send(`User ID received: ${userId.userId}, Age received: ${userId.age}, First Name received: ${userId.firstName}`)
})

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
