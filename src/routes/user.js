const express = require('express');
const router = express.Router();
const { userModel, userTypes } = require("../models/user");

// update user age by email
router.patch("/userByEmail", async (req, res) => {
  try {
    const { email, city, age, name } = req.body;
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { age: age, "address.city": city, name: name } },
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User with email " + email + " not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
      stack: error.stack,
    });
  }
});

// find user by email
router.get("/userByEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne();
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with email " + email + " not found" });
    }
    res.status(200).json({
      message: "User with email " + email + " fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
      stack: error.stack,
    });
  }
});

// find all users
router.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
      stack: error.stack,
    });
  }
});

// find user by Id
router.get("/userById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with ID " + id + " not found" });
    }
    res
      .status(200)
      .json({ message: "User with ID " + id + " fetched successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
      stack: error.stack,
    });
  }
});

// delete a user by mongodb object id
router.delete("/userById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User with ID " + id + " not found" });
    }
    res.status(200).json({
      message: "User with ID " + id + " deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
      stack: error.stack,
    });
  }
});


module.exports = router;
