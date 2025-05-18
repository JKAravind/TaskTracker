const express = require('express');
const User = require("../models/UserModel");

const router = express.Router();

// Register user and check if user already exists
router.post('/register', async (req, res) => {
    const { email, username, country, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const user = new User({ email, username, country, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
