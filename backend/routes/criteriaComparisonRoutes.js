// src/routes/criteriaComparisonRoutes.js

const express = require('express');
const router = express.Router();
const criteriaComparisonController = require('../controllers/criteriaComparisonController');

// Define your routes
router.post('/generate', criteriaComparisonController.generateComparisons);

router.get('/comparisons', criteriaComparisonController.getAllComparisons);


// If you have any GET routes, make sure they are defined correctly
// Example: Uncomment this if you have a method to retrieve comparisons
// router.get('/', criteriaComparisonController.getAllComparisons);

// Export the router
module.exports = router;
