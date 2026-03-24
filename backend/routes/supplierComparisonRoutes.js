const express = require('express');
const router = express.Router();
const SupplierComparisonController = require('../controllers/SupplierComparisonController');

// Calculate and save pairwise comparisons for suppliers
router.post('/calculate', SupplierComparisonController.calculateComparisons);

// Get pairwise comparison matrix by criterion ID
router.get('/:criterionID', SupplierComparisonController.getComparisonsByCriterion);

// Get all supplier comparisons
router.get('/', SupplierComparisonController.getAllComparisons);

module.exports = router;
