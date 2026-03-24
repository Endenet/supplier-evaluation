const SupplierWeightModel = require('../models/SupplierWeightModel');
const db = require('../config/db');

class SupplierWeightController {
    // Calculate and save weights for all criteria
    static calculateWeight(req, res) {
        // Step 1: Fetch all comparisons
        SupplierWeightModel.findAllComparisons((error, comparisons) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error fetching comparisons." });
            }

            // Organize data by criteria
            const criteriaMap = {};
            comparisons.forEach(({ criteriaID, supplierID1, supplierID2, comparisonValue }) => {
                if (!criteriaMap[criteriaID]) {
                    criteriaMap[criteriaID] = {
                        suppliers: new Set(),
                        matrix: {},
                        columnSums: {}
                    };
                }
                const criteriaData = criteriaMap[criteriaID];
                criteriaData.suppliers.add(supplierID1);
                criteriaData.suppliers.add(supplierID2);

                if (!criteriaData.matrix[supplierID1]) {
                    criteriaData.matrix[supplierID1] = {};
                }

                criteriaData.matrix[supplierID1][supplierID2] = comparisonValue;
                criteriaData.matrix[supplierID2] = criteriaData.matrix[supplierID2] || {};
                criteriaData.matrix[supplierID2][supplierID1] = 1 / comparisonValue; // Assuming reciprocal values
            });

            // Step 2: Normalize and calculate weights for each criterion
            let criteriaKeys = Object.keys(criteriaMap);
            let remainingCriteria = criteriaKeys.length;

            criteriaKeys.forEach(criteriaID => {
                const { suppliers, matrix, columnSums } = criteriaMap[criteriaID];
                const supplierList = Array.from(suppliers);

                // Build full matrix with 1s where no direct comparison exists
                supplierList.forEach(supplierID1 => {
                    supplierList.forEach(supplierID2 => {
                        if (supplierID1 === supplierID2) {
                            matrix[supplierID1][supplierID2] = 1; // Self-comparison
                        } else {
                            matrix[supplierID1][supplierID2] = matrix[supplierID1][supplierID2] || 1; // Default to 1 if not set
                        }
                        columnSums[supplierID2] = (columnSums[supplierID2] || 0) + matrix[supplierID1][supplierID2];
                    });
                });

                // Step 3: Normalize matrix and calculate row averages
                const weights = {};
                supplierList.forEach(supplierID1 => {
                    let rowSum = 0;
                    supplierList.forEach(supplierID2 => {
                        matrix[supplierID1][supplierID2] /= columnSums[supplierID2]; // Normalize the row
                        rowSum += matrix[supplierID1][supplierID2];
                    });
                    weights[supplierID1] = rowSum / supplierList.length; // Average weight for the supplier

                    // Save weight to the database
                    SupplierWeightModel.saveWeight(supplierID1, criteriaID, weights[supplierID1], (err) => {
                        if (err) {
                            console.error(err);
                        }
                        // Check if all criteria have been processed
                        if (--remainingCriteria === 0) {
                            res.status(200).json({ message: "Weights calculated and saved successfully." });
                        }
                    });
                });
            });
        });
    }

    // Get all supplier weights with supplier and criteria names
   // Get all supplier weights with supplier and criteria names, ranked under each criteria
static getAllWeights(req, res) {
    SupplierWeightModel.getAllWeights((error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching supplier weights." });
        }

        // Group by criteriaName
        const groupedByCriteria = {};
        results.forEach(result => {
            const key = result.criteriaName;
            if (!groupedByCriteria[key]) {
                groupedByCriteria[key] = [];
            }
            groupedByCriteria[key].push({
                id: result.id,
                supplierName: result.supplierName,
                criteriaName: result.criteriaName,
                weight: result.weight
            });
        });

        // Sort each group by weight descending and flatten
        const sortedFlattenedResults = Object.values(groupedByCriteria)
            .flatMap(group => group.sort((a, b) => b.weight - a.weight));

        res.status(200).json(sortedFlattenedResults);
    });
}


    // Get supplier weights by criteria with supplier and criteria names
   // Get supplier weights by criteria, sorted by weight (no rank field)
static getWeightsByCriteria(req, res) {
    const { criteriaID } = req.params;
    SupplierWeightModel.getWeightsByCriteria(criteriaID, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching supplier weights by criteria." });
        }

        // Sort suppliers by weight in descending order, without assigning rank
        const sorted = results.sort((a, b) => b.weight - a.weight);

        res.status(200).json({
            criteriaName: sorted.length > 0 ? sorted[0].criteriaName : '',
            suppliers: sorted.map(result => ({
                supplierName: result.supplierName,
                weight: result.weight
            }))
        });
    });
}

}

module.exports = SupplierWeightController;
