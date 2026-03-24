// models/SupplierComparison.js
const db = require('../config/db');

class SupplierComparison {
    static async createComparison(criterionID, supplierID1, supplierID2, comparisonValue) {
        const query = 'INSERT INTO supplier_comparison (criterionID, supplierID1, supplierID2, comparisonValue) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [criterionID, supplierID1, supplierID2, comparisonValue]);
        return result.insertId; // Return the ID of the newly created comparison
    }

    static async getComparisonsByCriterion(criterionID) {
        const query = 'SELECT * FROM supplier_comparison WHERE criterionID = ?';
        const [results] = await db.execute(query, [criterionID]);
        return results;
    }

    static async updateComparison(comparisonID, comparisonValue) {
        const query = 'UPDATE supplier_comparison SET comparisonValue = ? WHERE comparisonID = ?';
        await db.execute(query, [comparisonValue, comparisonID]);
        return { message: 'Supplier comparison updated successfully' };
    }

    static async deleteComparison(comparisonID) {
        const query = 'DELETE FROM supplier_comparison WHERE comparisonID = ?';
        await db.execute(query, [comparisonID]);
        return { message: 'Supplier comparison deleted successfully' };
    }
}

module.exports = SupplierComparison;
