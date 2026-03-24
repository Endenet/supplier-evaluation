const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const emailService = require('../utils/emailService');

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findByUsername(username);
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        
        await User.create({ username, password, role });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userID: user.userID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, { expiresIn: '15m' });
        await emailService.sendPasswordResetEmail(username, token);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.updatePassword(decoded.userID, newPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
