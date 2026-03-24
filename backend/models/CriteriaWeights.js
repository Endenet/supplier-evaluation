const db = require('../config/db');

const CriteriaWeights = {
  // Fetch the pairwise comparison matrix from the criteria_comparison table
  getPairwiseMatrix(callback) {
    const query = 'SELECT criteriaID1, criteriaID2, comparisonValue FROM criteria_comparison ORDER BY criteriaID1, criteriaID2';

    db.pool.execute(query, (error, rows) => {
      if (error) {
        callback(error, null);
        return;
      }

      const matrix = {};
      const criteriaIDs = new Set();

      // Build the pairwise comparison matrix
      rows.forEach(row => {
        if (!matrix[row.criteriaID1]) matrix[row.criteriaID1] = {};
        matrix[row.criteriaID1][row.criteriaID2] = row.comparisonValue;

        // Track all unique criteria IDs
        criteriaIDs.add(row.criteriaID1);
        criteriaIDs.add(row.criteriaID2);
      });

      // Include self-comparisons with a value of 1
      criteriaIDs.forEach(id => {
        if (!matrix[id]) matrix[id] = {};
        matrix[id][id] = 1; // Self-comparison
      });

      // Fill in missing comparisons with 1 (for reciprocal)
      criteriaIDs.forEach(id1 => {
        criteriaIDs.forEach(id2 => {
          if (matrix[id1][id2] === undefined) {
            matrix[id1][id2] = 1 / (matrix[id2][id1] || 1);
          }
        });
      });

      callback(null, matrix);
    });
  },

  // Save the computed weights into the criteria_weights table
  saveWeights(weights, callback) {
    const query = `
      INSERT INTO criteria_weights (criteriaID, weight) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE weight = VALUES(weight)
    `;

    const criteriaIDs = Object.keys(weights);
    let completed = 0;
    let hasError = false;

    criteriaIDs.forEach(criteriaID => {
      db.pool.execute(query, [criteriaID, weights[criteriaID]], (error) => {
        if (error) {
          if (!hasError) {
            hasError = true;
            callback(error);
          }
          return;
        }

        completed += 1;
        if (completed === criteriaIDs.length && !hasError) {
          callback(null);
        }
      });
    });
  },

  // Retrieve all saved weights from the criteria_weights table with criteria names
  getAllWeights(callback) {
    const query = `
      SELECT cw.criteriaID, c.criteriaName, cw.weight 
      FROM criteria_weights AS cw
      JOIN criteria AS c ON cw.criteriaID = c.criteriaID
    `;

    db.pool.execute(query, (error, rows) => {
      if (error) {
        callback(error, null);
        return;
      }

      // Format data with criteria names and weights
      const formattedWeights = rows.map(row => ({
        criteriaName: row.criteriaName,
        weight: row.weight
      }));

      callback(null, formattedWeights);
    });
  }
};

module.exports = CriteriaWeights;
