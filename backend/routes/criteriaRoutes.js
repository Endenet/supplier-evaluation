const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/criteriaController');

// Add new criteria
router.post('/', criteriaController.addCriteria); // Add new criteria
router.get('/', criteriaController.getAllCriteria); // Get all criteria
router.get('/:criteriaID', criteriaController.getCriteriaById); // Get criteria by internal criteria ID
router.get('/external/:externalCriteriaId', criteriaController.getCriteriaByExternalId); // Get criteria by external criteria ID
router.put('/:criteriaID', criteriaController.updateCriteria); // Update criteria by internal criteria ID
router.put('/external/:externalCriteriaId', criteriaController.updateCriteria); // Update criteria by external criteria ID
router.delete('/:criteriaID', criteriaController.deleteCriteria); // Delete criteria by internal criteria ID
router.delete('/external/:externalCriteriaId', criteriaController.deleteCriteria); // Delete criteria by external criteria ID

// Fetch supplier evaluations by criteriaID
router.get('/:criteriaID/supplier-evaluations', criteriaController.getSupplierEvaluationsByCriteriaId);

module.exports = router;
