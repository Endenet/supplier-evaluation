const db = require('../config/db');

// Create Criteria Model
const Criteria = {
    // Create a new criteria
    create: (data, callback) => {
        const query = 'INSERT INTO criteria (externalCriteriaId, criteriaName, description, saat_rating) VALUES (?, ?, ?, ?)';
        db.pool.query(query, [data.externalCriteriaId, data.criteriaName, data.description, data.saat_rating], callback);
    },

    // Get all criteria
    getAll: (callback) => {
        db.pool.query('SELECT * FROM criteria', callback);
    },

    // Get all criteria
    getAllCriteria: async () => {
        const [results] = await db.pool.promise().query('SELECT * FROM criteria');
        return results; // Returns a list of all criteria
    },

    // Get criteria by criteriaID
    getById: (criteriaID, callback) => {
        db.pool.query('SELECT * FROM criteria WHERE criteriaID = ?', [criteriaID], callback);
    },

    // Get criteria by externalCriteriaId
    getByExternalId: (externalCriteriaId, callback) => {
        db.pool.query('SELECT * FROM criteria WHERE externalCriteriaId = ?', [externalCriteriaId], callback);
    },

    // Update criteria by criteriaID
    updateById: (criteriaID, data, callback) => {
        const query = 'UPDATE criteria SET criteriaName = ?, description = ?, saat_rating = ?, updated_at = CURRENT_TIMESTAMP WHERE criteriaID = ?';
        db.pool.query(query, [data.criteriaName, data.description, data.saat_rating, criteriaID], callback);
    },

    // Update criteria by externalCriteriaId
    updateByExternalId: (externalCriteriaId, data, callback) => {
        const query = 'UPDATE criteria SET criteriaName = ?, description = ?, saat_rating = ?, updated_at = CURRENT_TIMESTAMP WHERE externalCriteriaId = ?';
        db.pool.query(query, [data.criteriaName, data.description, data.saat_rating, externalCriteriaId], callback);
    },

    // Delete criteria by criteriaID
    deleteById: (criteriaID, callback) => {
        db.pool.query('DELETE FROM criteria WHERE criteriaID = ?', [criteriaID], callback);
    },

    // Delete criteria by externalCriteriaId
    deleteByExternalId: (externalCriteriaId, callback) => {
        db.pool.query('DELETE FROM criteria WHERE externalCriteriaId = ?', [externalCriteriaId], callback);
    },

    // Fetch supplier evaluations by criteriaID
    getSupplierEvaluationsByCriteriaId: (criteriaID, callback) => {
        const query = `
            SELECT 
                s.supplierName,
                IFNULL(se.rating, 'Not Rated') AS rating,  -- Handling unrated suppliers
                CASE 
                    WHEN se.rating = 1 THEN 'Poor'
                    WHEN se.rating = 3 THEN 'Fair'
                    WHEN se.rating = 5 THEN 'Good'
                    WHEN se.rating = 7 THEN 'Very Good'
                    WHEN se.rating = 9 THEN 'Excellent'
                    ELSE 'Not Rated'
                END AS ratingDescription
            FROM 
                suppliers s
            LEFT JOIN 
                supplier_evaluations se ON s.supplierID = se.supplierID AND se.criteriaID = ?
            WHERE 
                se.criteriaID = ? OR se.criteriaID IS NULL;
        `;
        db.pool.query(query, [criteriaID, criteriaID], callback);
    }
};

module.exports = Criteria;
