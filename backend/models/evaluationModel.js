// backend/models/evaluationModel.js
const db = require('../config/db'); // Adjust the path as needed

// Get all evaluations, optionally filter by supplierID
exports.getAllEvaluations = async (supplierID) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM supplier_evaluations'; // Query the supplier_evaluations table
        const queryParams = [];

        if (supplierID) {
            query += ' WHERE supplierID = ?'; // Filter by supplierID if provided
            queryParams.push(supplierID);
        }

        db.pool.query(query, queryParams, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Fetch evaluations by criteria ID
exports.getEvaluationsByCriteriaId = async (criteriaID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT s.name AS supplierName, se.rating, se.description
            FROM supplier_evaluations se
            JOIN suppliers s ON se.supplierID = s.id
            WHERE se.criteriaID = ?`;
        db.pool.query(query, [criteriaID], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


// Add a new evaluation
exports.addEvaluation = async (evaluationData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO supplier_evaluations (supplierID, criteriaID, rating) VALUES (?, ?, ?)';
        db.pool.query(query, [evaluationData.supplierID, evaluationData.criteriaID, evaluationData.rating], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Update an existing evaluation
exports.updateEvaluation = async (evaluationID, updatedData) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE supplier_evaluations SET rating = ? WHERE evaluationID = ?';
        db.pool.query(query, [updatedData.rating, evaluationID], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Delete an evaluation
exports.deleteEvaluation = async (evaluationID) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM supplier_evaluations WHERE evaluationID = ?';
        db.pool.query(query, [evaluationID], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
