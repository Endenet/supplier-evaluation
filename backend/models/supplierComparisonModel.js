const db = require('../config/db');

class SupplierComparison {
    // Save multiple comparisons at once
    static saveMultipleComparisons(comparisons, callback) {
        if (comparisons.length === 0) {
            return callback(null, { affectedRows: 0 });
        }
        
        const query = `
            INSERT INTO \`supplier_comparison\` (criteriaID, supplierID1, supplierID2, comparisonValue)
            VALUES ?
            ON DUPLICATE KEY UPDATE comparisonValue = VALUES(comparisonValue)
        `;
        
        const values = comparisons.map(comp => [comp.criterionID, comp.supplierID1, comp.supplierID2, comp.comparisonValue]);

        db.pool.query(query, [values], (error, results) => {
            if (error) return callback(new Error(`Error saving comparisons: ${error.message}`));
            callback(null, results);
        });
    }

    // Retrieve all pairwise comparisons for a specific criterion
    static getComparisonsByCriterion(criterionID, callback) {
        const query = `
            SELECT supplierID1, supplierID2, comparisonValue
            FROM \`supplier_comparison\`
            WHERE criteriaID = ?
        `;
        db.pool.query(query, [criterionID], (error, rows) => {
            if (error) return callback(new Error(`Error fetching comparisons: ${error.message}`));
            callback(null, rows);
        });
    }

    // Retrieve all comparisons
    static getAllComparisons(callback) {
        const query = `SELECT * FROM \`supplier_comparison\``;
        db.pool.query(query, (error, rows) => {
            if (error) return callback(new Error(`Error fetching all comparisons: ${error.message}`));
            callback(null, rows);
        });
    }
}

module.exports = SupplierComparison;
