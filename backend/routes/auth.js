const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Register Route
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    registerUser
);

// Login Route
router.post('/login', loginUser);

module.exports = router;
