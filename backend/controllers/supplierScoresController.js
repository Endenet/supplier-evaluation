const supplierScoresModel = require('../models/supplierScoresModel');

const supplierScoresController = {
    calculateAndSaveScores: (req, res) => {
        supplierScoresModel.getCriteriaWeights((err, criteriaWeights) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch criteria weights' });

            const criteriaMap = {};
            criteriaWeights.forEach(({ criteriaID, weight }) => {
                criteriaMap[criteriaID] = weight;
            });

            supplierScoresModel.getAllSuppliers((err, suppliers) => {
                if (err) return res.status(500).json({ error: 'Failed to fetch suppliers' });

                let scoreCalculationPromises = suppliers.map((supplierID) => {
                    return new Promise((resolve, reject) => {
                        supplierScoresModel.getSupplierWeights(supplierID, (err, supplierWeights) => {
                            if (err) return reject(err);

                            let totalScore = 0;
                            supplierWeights.forEach(({ criteriaID, weight }) => {
                                const criteriaWeight = criteriaMap[criteriaID] || 0;
                                totalScore += weight * criteriaWeight;
                            });

                            supplierScoresModel.saveSupplierScore(supplierID, totalScore, (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        });
                    });
                });

                Promise.all(scoreCalculationPromises)
                    .then(() => res.status(200).json({ message: 'Supplier scores calculated and saved successfully' }))
                    .catch(error => res.status(500).json({ error: `Failed to calculate scores: ${error.message}` }));
            });
        });
    },

    getSupplierScores: (req, res) => {
        supplierScoresModel.getAllSupplierScores((err, scores) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch supplier scores' });
    
            // Sort scores in descending order
            const sortedScores = scores.sort((a, b) => b.totalScore - a.totalScore);
    
            // Return the sorted scores in ranking order (without adding a rank field)
            res.status(200).json(sortedScores);
        });
    }
    
};

module.exports = supplierScoresController;
