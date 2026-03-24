const CriteriaWeights = require('../models/CriteriaWeights');

const CriteriaWeightsController = {
  // Calculate and save criteria weights
  calculateAndSaveWeights(req, res) {
    CriteriaWeights.getPairwiseMatrix((error, pairwiseMatrix) => {
      if (error) {
        console.error("Error fetching pairwise matrix:", error);
        return res.status(500).json({ message: "Error fetching pairwise matrix", error });
      }

      // Step 1: Calculate column sums
      const columnSums = {};
      const criteriaIDs = Object.keys(pairwiseMatrix);

      criteriaIDs.forEach(id => {
        columnSums[id] = 0;
      });

      criteriaIDs.forEach(id1 => {
        criteriaIDs.forEach(id2 => {
          const value = pairwiseMatrix[id1][id2] || 0;
          columnSums[id2] += value;
        });
      });

      // Step 2: Normalize the pairwise comparison matrix
      const normalizedMatrix = {};
      criteriaIDs.forEach(id1 => {
        normalizedMatrix[id1] = {};
        criteriaIDs.forEach(id2 => {
          normalizedMatrix[id1][id2] = columnSums[id2] ? pairwiseMatrix[id1][id2] / columnSums[id2] : 0;
        });
      });

      // Step 3: Calculate row averages (weights)
      const weights = {};
      criteriaIDs.forEach(id => {
        const rowValues = Object.values(normalizedMatrix[id]);
        const validValues = rowValues.filter(val => val > 0);
        weights[id] = validValues.length > 0
          ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length
          : 0;
      });

      CriteriaWeights.saveWeights(weights, (error) => {
        if (error) {
          console.error("Error saving weights:", error);
          return res.status(500).json({ message: "Error saving weights", error });
        }
        res.status(200).json({ message: 'Weights calculated and saved successfully', weights });
      });
    });
  },

  // Retrieve all weights with ranking
  getAllWeights(req, res) {
    CriteriaWeights.getAllWeights((error, weights) => {
      if (error) {
        console.error("Error retrieving weights:", error);
        return res.status(500).json({ message: "Error retrieving weights", error });
      }

      // Sort weights in descending order and assign rankings
      const sortedWeights = [...weights].sort((a, b) => b.weight - a.weight);
      sortedWeights.forEach((item, index) => {
        item.ranking = index + 1;
      });

      res.status(200).json(sortedWeights);
    });
  }
};

module.exports = CriteriaWeightsController;
