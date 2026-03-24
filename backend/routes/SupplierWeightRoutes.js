const express = require('express');
const SupplierWeightController = require('../controllers/SupplierWeightController');

const router = express.Router();

// Route to calculate weights
router.post('/calculate-weight', SupplierWeightController.calculateWeight);

// Route to get all supplier weights
router.get('/', SupplierWeightController.getAllWeights);

// Route to get supplier weights by specific criteria
router.get('/:criteriaID', SupplierWeightController.getWeightsByCriteria);

module.exports = router;
