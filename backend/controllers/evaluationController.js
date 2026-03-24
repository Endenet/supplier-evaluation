// backend/controllers/evaluationController.js
const evaluationModel = require('../models/evaluationModel');

// Fetch evaluations based on supplierID
exports.getAllEvaluations = async (req, res) => {
    const supplierID = req.query.supplierID; // Get the supplierID from query parameters

    try {
        const evaluations = await evaluationModel.getAllEvaluations(supplierID);
        res.json(evaluations); // Return evaluations
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch evaluations based on criteriaID
exports.getEvaluationsByCriteriaId = async (req, res) => {
    const criteriaID = req.params.criteriaId; // Get criteriaID from URL parameters

    try {
        const evaluations = await evaluationModel.getEvaluationsByCriteriaId(criteriaID); // Call model function
        if (evaluations.length === 0) {
            return res.status(404).json({ message: 'No evaluations found for this criteria.' });
        }
        res.json(evaluations); // Return evaluations
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new evaluation
exports.addEvaluation = async (req, res) => {
    const evaluationData = req.body; // Get evaluation data from the request body

    try {
        const result = await evaluationModel.addEvaluation(evaluationData);
        res.status(201).json({ message: 'Evaluation added', evaluationID: result.insertId });
    } catch (error) {
        console.error('Error adding evaluation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing evaluation
exports.updateEvaluation = async (req, res) => {
    const evaluationID = req.params.id; // Get evaluationID from URL parameters
    const updatedData = req.body; // Get updated data from the request body

    try {
        await evaluationModel.updateEvaluation(evaluationID, updatedData);
        res.json({ message: 'Evaluation updated' });
    } catch (error) {
        console.error('Error updating evaluation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an evaluation
exports.deleteEvaluation = async (req, res) => {
    const evaluationID = req.params.id; // Get evaluationID from URL parameters

    try {
        await evaluationModel.deleteEvaluation(evaluationID);
        res.json({ message: 'Evaluation deleted' });
    } catch (error) {
        console.error('Error deleting evaluation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
