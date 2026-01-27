function authMiddleware(req, res, next) {
    const token = "xyz"
    if(token === "xyz"){
        console.log('Authentication successful')
        next()
    }
    else{
        res.status(401).send('Not authorised')
    }
}

module.exports = authMiddleware