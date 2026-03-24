const SupplierComparison = require('../models/supplierComparisonModel');
const db = require('../config/db');

exports.calculateComparisons = (req, res) => {
    // Fetch unique criteria IDs from supplier evaluations
    db.pool.query('SELECT DISTINCT criteriaID FROM supplier_evaluations', (err, criteria) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });

        const comparisons = [];
        let completedRequests = 0;

        criteria.forEach(({ criteriaID }) => {
            db.pool.query(
                `SELECT supplierID, rating FROM supplier_evaluations WHERE criteriaID = ?`,
                [criteriaID],
                (err, ratings) => {
                    if (err) {
                        console.error('Error fetching supplier evaluations:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    for (let i = 0; i < ratings.length; i++) {
                        for (let j = i + 1; j < ratings.length; j++) {
                            const { supplierID: supplierID1, rating: rating1 } = ratings[i];
                            const { supplierID: supplierID2, rating: rating2 } = ratings[j];

                            const comparisonValue = rating1 / rating2;
                            comparisons.push({
                                criterionID: criteriaID,
                                supplierID1,
                                supplierID2,
                                comparisonValue
                            });
                        }
                    }

                    completedRequests++;

                    if (completedRequests === criteria.length) {
                        // Save all comparisons in the database
                        SupplierComparison.saveMultipleComparisons(comparisons, (error) => {
                            if (error) {
                                console.error('Error saving comparisons:', error);
                                return res.status(500).json({ error: 'Internal Server Error' });
                            }
                            res.status(200).json({ message: 'Supplier comparisons calculated and saved successfully' });
                        });
                    }
                }
            );
        });
    });
};

exports.getComparisonsByCriterion = (req, res) => {
    const { criterionID } = req.params;

    SupplierComparison.getComparisonsByCriterion(criterionID, (error, comparisons) => {
        if (error) {
            console.error('Error fetching comparisons:', error);
            return res.status(500).json({ error: 'Failed to fetch comparisons' });
        }

        if (!comparisons.length) {
            return res.status(404).json({ error: 'No comparisons found for the specified criterion' });
        }

        // Retrieve the criterion name and supplier names
        db.pool.query(`SELECT criteriaName FROM criteria WHERE criteriaID = ?`, [criterionID], (err, criteriaData) => {
            if (err) {
                console.error('Error fetching criterion name:', err);
                return res.status(500).json({ error: 'Failed to fetch criterion name' });
            }

            const criterionName = criteriaData.length > 0 ? criteriaData[0].criteriaName : 'Unknown Criterion';

            // Retrieve supplier names
            const supplierIDs = [...new Set([...comparisons.map(c => c.supplierID1), ...comparisons.map(c => c.supplierID2)])];
            const query = `SELECT supplierID, supplierName FROM suppliers WHERE supplierID IN (?)`;

            db.pool.query(query, [supplierIDs], (err, supplierData) => {
                if (err) {
                    console.error('Error fetching supplier names:', err);
                    return res.status(500).json({ error: 'Failed to fetch supplier names' });
                }

                const supplierMap = {};
                supplierData.forEach(supplier => {
                    supplierMap[supplier.supplierID] = supplier.supplierName;
                });

                // Build and format the response
                const formattedComparisons = comparisons.map(comp => ({
                    id: comp.id,
                    supplierA: supplierMap[comp.supplierID1],
                    supplierB: supplierMap[comp.supplierID2],
                    criterion: criterionName,  // Using actual criterion name
                    comparisonValue: comp.comparisonValue
                }));

                res.status(200).json(formattedComparisons);
            });
        });
    });
};

exports.getAllComparisons = (req, res) => {
    SupplierComparison.getAllComparisons((error, comparisons) => {
        if (error) {
            console.error('Error fetching all comparisons:', error);
            return res.status(500).json({ error: 'Failed to fetch all comparisons' });
        }

        if (!comparisons.length) {
            return res.status(404).json({ error: 'No comparisons found' });
        }

        // Retrieve all criterion names and supplier names
        const criteriaIDs = [...new Set(comparisons.map(c => c.criteriaID))];
        const supplierIDs = [...new Set([...comparisons.map(c => c.supplierID1), ...comparisons.map(c => c.supplierID2)])];

        const criteriaQuery = `SELECT criteriaID, criteriaName FROM criteria WHERE criteriaID IN (?)`;
        const suppliersQuery = `SELECT supplierID, supplierName FROM suppliers WHERE supplierID IN (?)`;

        db.pool.query(criteriaQuery, [criteriaIDs], (err, criteriaData) => {
            if (err) {
                console.error('Error fetching criteria names:', err);
                return res.status(500).json({ error: 'Failed to fetch criteria names' });
            }

            db.pool.query(suppliersQuery, [supplierIDs], (err, supplierData) => {
                if (err) {
                    console.error('Error fetching supplier names:', err);
                    return res.status(500).json({ error: 'Failed to fetch supplier names' });
                }

                const supplierMap = {};
                supplierData.forEach(supplier => {
                    supplierMap[supplier.supplierID] = supplier.supplierName;
                });

                const criteriaMap = {};
                criteriaData.forEach(criteria => {
                    criteriaMap[criteria.criteriaID] = criteria.criteriaName;
                });

                const formattedComparisons = comparisons.map(comp => ({
                    id: comp.id,
                    supplierA: supplierMap[comp.supplierID1],
                    supplierB: supplierMap[comp.supplierID2],
                    criterion: criteriaMap[comp.criteriaID] || 'Unknown Criterion',  // Using actual criterion name
                    comparisonValue: comp.comparisonValue
                }));

                res.status(200).json(formattedComparisons);
            });
        });
    });
};
