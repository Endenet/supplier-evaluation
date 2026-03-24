// models/SupplierScores.js
const db = require('../config/db');

class SupplierScores {
    static async saveScores(supplierScores) {
        const queries = supplierScores.map(score => {
            return db.execute('INSERT INTO supplier_scores (supplierID, criterionID, scoreValue) VALUES (?, ?, ?)', [score.supplierID, score.criterionID, score.scoreValue]);
        });
        await Promise.all(queries);
        return { message: 'Supplier scores saved successfully' };
    }

    static async getScoresBySupplier(supplierID) {
        const query = 'SELECT * FROM supplier_scores WHERE supplierID = ?';
        const [results] = await db.execute(query, [supplierID]);
        return results;
    }

    static async getAllScores() {
        const query = 'SELECT * FROM supplier_scores';
        const [results] = await db.execute(query);
        return results;
    }
}

module.exports = SupplierScores;
