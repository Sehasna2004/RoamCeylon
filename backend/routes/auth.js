const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER ENDPOINT
router.post('/register', async (req, res) => {
  try {
    const { name, gender, email, contact, username, password, avatar } = req.body;

    // 1. Check if user already exists in application logic
    let userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Username or Email already registered." });
    }

    // 2. Create the user instance (Schema pre-save hook automatically handles hashing)
    const newUser = new User({ 
      name, 
      gender, 
      email, 
      contact, 
      username, 
      password, 
      avatar 
    });
    
    await newUser.save();

    res.status(201).json({ success: true, message: "User account saved successfully!" });
  } catch (error) {
    console.error("❌ ERROR DETECTED IN REGISTER ROUTE:", error);

    // Check if MongoDB returns a duplicate key indexing error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        success: false, 
        message: `This ${field} is already taken. Please try another one.` 
      });
    }

    // Fallback error for other system or database validation issues
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Database Error",
      stack: error.stack
    });
  }
});

// LOGIN ENDPOINT (Modified to pass entire payload: email, avatar, etc.)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials." });

    // 2. Compare incoming plain text password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials." });

    res.status(200).json({ 
      success: true, 
      message: `Welcome back, ${user.name}!`, 
      user: { 
        id: user._id, 
        name: user.name, 
        username: user.username, 
        email: user.email, 
        avatar: user.avatar || '' 
      } 
    });
  } catch (error) {
    console.error("❌ ERROR DETECTED IN LOGIN ROUTE:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PROFILE UPDATE ENDPOINT (Added feature)
router.put('/update-profile', async (req, res) => {
  try {
    const { userId, name, email, avatar, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User session not found." });
    }

    // Verify if email is being updated to an email already assigned to a different user account
    if (email !== user.email) {
      const emailConflict = await User.findOne({ email });
      if (emailConflict) {
        return res.status(400).json({ success: false, message: "This email address is already in use by another user." });
      }
      user.email = email;
    }

    user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    // Explicitly update and re-hash password strings manually if changed
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar || ''
      }
    });
  } catch (error) {
    console.error("❌ ERROR IN UPDATE PROFILE ROUTE:", error);
    res.status(500).json({ success: false, message: "Server encountered error during update profile." });
  }
});

module.exports = router;