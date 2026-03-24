const express = require('express');
const router = express.Router();
const supplierScoresController = require('../controllers/supplierScoresController');

// Route to calculate and save supplier scores
router.post('/calculate', supplierScoresController.calculateAndSaveScores);

// Route to get all supplier scores
router.get('/', supplierScoresController.getSupplierScores);

module.exports = router;
