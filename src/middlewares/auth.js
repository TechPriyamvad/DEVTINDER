const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../constants/auth");

function authMiddleware(req, res, next) {
    try {
        const { accessToken } = req.cookies;
        const token = accessToken?.split(" ")[1];
        const { userId} = jwt.verify(token, accessTokenSecret);
        req.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({
          message: error.message,
          error: error.name,
        });
    }
}

module.exports = authMiddleware