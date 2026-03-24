// routes/criteriaWeightsRoutes.js
const express = require('express');
const router = express.Router();
const CriteriaWeightsController = require('../controllers/CriteriaWeightsController');

// Route to calculate and save weights
router.post('/calculate', CriteriaWeightsController.calculateAndSaveWeights);

// Route to retrieve all weights
router.get('/', CriteriaWeightsController.getAllWeights);

module.exports = router;
