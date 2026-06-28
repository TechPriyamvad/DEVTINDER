const express = require('express');
const router = express.Router();

const authMiddleware = require("./middlewares/auth");

router.get("/profile", authMiddleware, (req, res) => {
  try {
    res.send("This is the profile page of user with id:" + req.userId);
  } catch (error) {
    res.status(500).json({
      message: "Error logging user",
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;