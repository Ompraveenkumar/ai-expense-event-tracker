const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @route   POST /api/v1/auth/signup
 */
router.post('/signup', async (req, res) => {
  try {
    // 🧠 NEURAL UPDATE: Destructure 'interests' from req.body
    const { name, email, password, role, interests } = req.body; 
    
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user 
    // 🚀 SAVING INTERESTS: This ensures your MongoDB is no longer empty
    const user = new User({ 
      name, 
      email, 
      password, 
      role: role || 'student',
      interests: interests || [] // 👈 Save the array from the registration popup
    });

    await user.save();
    
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

/**
 * @route   POST /api/v1/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
      
      res.json({ 
        token, 
        user: { 
          id: user._id, 
          name: user.name, 
          role: user.role 
        } 
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;