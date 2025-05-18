const express = require('express');
const User = require("../../models/UserModel");
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register user and check if user already exists
router.post('/register', async (req, res) => {
    console.log("request got hitted")
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


router.post('/login', async (req, res) => {
    console.log("login hit")
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ password });
        if (!existingUser) {
            return res.status(401).json({ success: false , message:"user does not exisit"});
        }
        if(existingUser.password===password){

             const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email }, // payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // expires in 1 hour
            );



            return res.status(200).json({token,message:"logged in",})
        }



    } catch (error) {
        res.status(404).json({ success: false });
    }
});

module.exports = router;
