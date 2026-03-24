const Criteria = require('../models/criteriaModel');
const CriteriaComparison = require('../models/criteriaComparisonModel');

// Generate comparisons and save or update them in the database
exports.generateComparisons = async (req, res) => {
    try {
        const criteriaList = await Criteria.getAllCriteria(); // Fetch all criteria
        if (!criteriaList || criteriaList.length < 2) {
            return res.status(400).json({ error: 'At least two criteria are needed to generate comparisons' });
        }

        const comparisons = [];
        for (let i = 0; i < criteriaList.length; i++) {
            for (let j = i + 1; j < criteriaList.length; j++) {
                const rating1 = criteriaList[i].saat_rating;
                const rating2 = criteriaList[j].saat_rating;

                if (rating2 === 0) continue; // Avoid division by zero

                const comparisonValue = rating1 / rating2; // Calculate comparison value
                comparisons.push({
                    criteriaID1: criteriaList[i].criteriaID,
                    criteriaID2: criteriaList[j].criteriaID,
                    comparisonValue
                });
            }
        }

        await CriteriaComparison.saveMultipleComparisons(comparisons);
        res.status(200).json({ message: 'Comparisons generated and updated successfully' });
    } catch (error) {
        console.error('Error generating comparisons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch all comparisons in matrix format
exports.getAllComparisons = async (req, res) => {
    try {
        const criteriaList = await Criteria.getAllCriteria();
        const comparisons = await CriteriaComparison.getAllComparisons();

        if (!criteriaList.length || !comparisons.length) {
            return res.status(404).json({ error: 'No criteria or comparisons found' });
        }

        // Build a lookup table for comparison values
        const comparisonMatrix = {};
        comparisons.forEach(comp => {
            comparisonMatrix[`${comp.criteriaID1}-${comp.criteriaID2}`] = comp.comparisonValue;
        });

        // Create 2D array matrix for the response
        const tableData = criteriaList.map((crit1) => {
            return criteriaList.map((crit2) => {
                if (crit1.criteriaID === crit2.criteriaID) return 1;
                const comparison = comparisonMatrix[`${crit1.criteriaID}-${crit2.criteriaID}`];
                return comparison ? comparison : `1/${comparisonMatrix[`${crit2.criteriaID}-${crit1.criteriaID}`] || 1}`;
            });
        });

        // Response with criteria names as headers and tableData as rows
        res.status(200).json({
            criteriaNames: criteriaList.map(c => c.criteriaName),
            tableData
        });
    } catch (error) {
        console.error('Error fetching comparisons:', error);
        res.status(500).json({ error: 'Failed to fetch comparisons' });
    }
};
