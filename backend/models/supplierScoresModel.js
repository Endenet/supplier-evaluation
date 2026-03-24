const db = require('../config/db');

const supplierScoresModel = {
    getCriteriaWeights: (callback) => {
        const sql = 'SELECT criteriaID, weight FROM criteria_weights';
        db.pool.query(sql, (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    getSupplierWeights: (supplierID, callback) => {
        const sql = 'SELECT criteriaID, weight FROM supplier_weight WHERE supplierID = ?';
        db.pool.query(sql, [supplierID], (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    saveSupplierScore: (supplierID, totalScore, callback) => {
        const sql = 'INSERT INTO supplier_scores (supplierID, totalScore) VALUES (?, ?) ON DUPLICATE KEY UPDATE totalScore = VALUES(totalScore)';
        db.pool.query(sql, [supplierID, totalScore], (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    getAllSupplierScores: (callback) => {
        // Updated query to join with `suppliers` table and retrieve supplier names
        const sql = `
            SELECT ss.supplierID, s.supplierName, ss.totalScore
            FROM supplier_scores ss
            JOIN suppliers s ON ss.supplierID = s.supplierID
        `;
        db.pool.query(sql, (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    getAllSuppliers: (callback) => {
        const sql = 'SELECT DISTINCT supplierID FROM supplier_weight';
        db.pool.query(sql, (error, results) => {
            if (error) return callback(error);
            const suppliers = results.map(row => row.supplierID);
            callback(null, suppliers);
        });
    }
};

module.exports = supplierScoresModel;
