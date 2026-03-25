const db = require('../config/db');

// Create Criteria Comparison Model
const CriteriaComparison = {
    // Save multiple comparisons
    saveMultipleComparisons: async (comparisons) => {
        const promises = comparisons.map(async (comparison) => {
            const { criteriaID1, criteriaID2, comparisonValue } = comparison;

            // Check if the comparison already exists
            const [existingComparison] = await db.pool.promise().query(
                'SELECT * FROM criteria_comparison WHERE criteriaID1 = ? AND criteriaID2 = ?',
                [criteriaID1, criteriaID2]
            );

            if (existingComparison.length > 0) {
                // Update existing comparison
                await db.pool.promise().query(
                    'UPDATE criteria_comparison SET comparisonValue = ? WHERE criteriaID1 = ? AND criteriaID2 = ?',
                    [comparisonValue, criteriaID1, criteriaID2]
                );
            } else {
                // Insert new comparison
                await db.pool.promise().query(
                    'INSERT INTO criteria_comparison (criteriaID1, criteriaID2, comparisonValue) VALUES (?, ?, ?)',
                    [criteriaID1, criteriaID2, comparisonValue]
                );
            }
        });

        // Wait for all promises to complete
        await Promise.all(promises);
    },

    // Fetch all comparisons for building a matrix
    getAllComparisons: async () => {
        const [results] = await db.pool.promise().query('SELECT * FROM criteria_comparison');
        return results;
    }
};

module.exports = CriteriaComparison;
