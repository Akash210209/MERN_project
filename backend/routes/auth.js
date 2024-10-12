const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        // user = new User({ username, password: await bcrypt.hash(password, 10) });
        // await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server error');
    }
});

    // // Login Route
    // router.post('/login', async (req, res) => {
    //     console.log(req.body); // Log the incoming request body
    //     const { username, password } = req.body;

    //     try {
    //         const user = await User.findOne({ username });
    //         if (!user) {
    //             return res.status(400).json({ msg: 'Invalid credentials' });
    //         }

    //         const isMatch = await bcrypt.compare(password, user.password);
    //         if (!isMatch) {
    //             return res.status(400).json({ msg: 'Invalid credentials' });
    //         }

    //         res.status(200).json({ msg: 'Login successful' });
    //     } catch (error) {
    //         console.error(error); // Log the error for debugging
    //         res.status(500).send('Server error');
    //     }
    // });

    router.post('/login', async (req, res) => {
        console.log(req.body); // Log the incoming request body
        const { username, password } = req.body;
    
        // Check for required fields
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
    
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // If login is successful, you may want to return a token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;
