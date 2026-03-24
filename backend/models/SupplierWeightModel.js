const db = require('../config/db');

class SupplierWeightModel {
    // Fetch all pairwise comparisons
    static findAllComparisons(callback) {
        const query = `
            SELECT criteriaID, supplierID1, supplierID2, comparisonValue 
            FROM supplier_comparison
        `;
        db.pool.query(query, (error, results) => {
            if (error) {
                console.error("Error fetching comparisons:", error);
                return callback(error); // Return error in callback
            }
            callback(null, results); // Return results in callback
        });
    }

    // Save weights to the database
    static saveWeight(supplierID, criteriaID, weight, callback) {
        const query = `
            INSERT INTO supplier_weight (supplierID, criteriaID, weight)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE weight = VALUES(weight)
        `;
        db.pool.query(query, [supplierID, criteriaID, weight], (error, results) => {
            if (error) {
                console.error("Error saving weight:", error);
                return callback(error); // Return error in callback
            }
            callback(null, results); // Return results in callback
        });
    }

    // Get all supplier weights with 'id', 'supplierName', and 'criteriaName' included
    static getAllWeights(callback) {
        const query = `
            SELECT sw.id, sw.supplierID, sw.criteriaID, sw.weight, s.supplierName, c.criteriaName 
            FROM supplier_weight sw
            JOIN suppliers s ON sw.supplierID = s.supplierID
            JOIN criteria c ON sw.criteriaID = c.criteriaID
        `;
        db.pool.query(query, (error, results) => {
            if (error) {
                console.error("Error fetching supplier weights:", error);
                return callback(error); // Return error in callback
            }
            callback(null, results); // Return results in callback
        });
    }

    // Get weights by specific criteriaID with supplier and criteria names
    static getWeightsByCriteria(criteriaID, callback) {
        const query = `
            SELECT sw.supplierID, s.supplierName, sw.criteriaID, c.criteriaName, sw.weight
            FROM supplier_weight sw
            JOIN suppliers s ON sw.supplierID = s.supplierID
            JOIN criteria c ON sw.criteriaID = c.criteriaID
            WHERE sw.criteriaID = ?
        `;
        db.pool.query(query, [criteriaID], (error, results) => {
            if (error) {
                console.error("Error fetching weights by criteriaID:", error);
                return callback(error); // Return error in callback
            }
            callback(null, results); // Return results in callback
        });
    }
}

module.exports = SupplierWeightModel;
