const express = require('express');
const router = express.Router();
const authMiddleware = require("./middlewares/auth");

router.post("/connectionRequest", authMiddleware, (req, res) => {
  try {
    res.send("Send a connection request to user with id:" + req.userId);
  } catch (error) {
    res.status(500).json({
      message: "Error logging user",
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;