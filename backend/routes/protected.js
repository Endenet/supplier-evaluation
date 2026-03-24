const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
