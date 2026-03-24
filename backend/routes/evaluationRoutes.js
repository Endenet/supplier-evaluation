// backend/routes/evaluationRoutes.js
const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Route to get all evaluations
router.get('/', evaluationController.getAllEvaluations);

// Route to fetch evaluations by criteria ID
router.get('/criteria/:criteriaId/supplier-evaluations', evaluationController.getEvaluationsByCriteriaId);

// Route to add a new evaluation
router.post('/', evaluationController.addEvaluation);

// Route to update an existing evaluation
router.put('/:id', evaluationController.updateEvaluation);

// Route to delete an evaluation
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
