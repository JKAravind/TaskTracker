const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // your User mongoose model
const authenticateToken = require('../middlewear/JWTverify'); // middleware to verify JWT

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    console.log("dashboard hit")
  try {
    // req.user was set by authenticateToken middleware after verifying JWT
    const userId = req.user.id;

    // Fetch user info from DB without password
    const user = await User.findById(userId).select('-password');
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
