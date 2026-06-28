const express = require('express')
const router = express.Router()
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel, userTypes } = require("../models/user");
const { accessTokenSecret, refreshTokenSecret } = require("../constants/auth");

// Define routes here (before starting server)
router.post("/signup", async (req, res) => {
  try {
    const userJson = req.body;
    const { email, password } = userJson;
    // valid email check
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // valid password check
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols",
      });
    }

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      return res
        .status(400)
        .json({ message: "User with email " + email + " already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userJson.password = hashedPassword;
    const user = new userModel(userJson);
    await user.save({ validateBeforeSave: true });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
      stack: error.stack,
    });
  }
});

// login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.cookie("accessToken", "").status(401).json({ message: "Invalid credentials" });
    }

    // compare hashed password with the password provided by user
    const isPasswordValid = await user.validatePassword(password)
    if (!isPasswordValid) {
      return res.cookie("accessToken", "").status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = await user.getJWT(accessTokenSecret, '2m')
    const refreshToken = await user.getJWT(refreshTokenSecret, '1h')

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .cookie("refreshToken", `Bearer ${refreshToken}`)  
      .status(200)
      .json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error logging user",
      error: error.message,
      stack: error.stack,
    });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    const user = await userModel.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = await user.getJWT(accessTokenSecret, "2m");

    res
      .cookie("accessToken", `Bearer ${newAccessToken}`)
      .status(200)
      .json({ message: "New access token generated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error generating new access token",
      error: error.message,
      stack: error.stack,
    });
  }
});


module.exports = router;