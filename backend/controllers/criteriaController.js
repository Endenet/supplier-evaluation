const Criteria = require('../models/criteriaModel');

// Add new criteria
exports.addCriteria = (req, res) => {
    const newCriteria = {
        externalCriteriaId: req.body.externalCriteriaId,
        criteriaName: req.body.criteriaName,
        description: req.body.description,
        saat_rating: req.body.saat_rating // Added saat_rating
    };

    Criteria.create(newCriteria, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to add criteria' });
        }
        res.status(201).send({ message: 'Criteria added successfully' });
    });
};

// Get all criteria
exports.getAllCriteria = (req, res) => {
    Criteria.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch criteria' });
        }
        res.status(200).json(results);
    });
};

// Get criteria by internal ID
exports.getCriteriaById = (req, res) => {
    const criteriaID = req.params.criteriaID;
    Criteria.getById(criteriaID, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch criteria' });
        } else if (results.length === 0) {
            return res.status(404).send({ message: 'Criteria not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Get criteria by external ID
exports.getCriteriaByExternalId = (req, res) => {
    const externalCriteriaId = req.params.externalCriteriaId;
    Criteria.getByExternalId(externalCriteriaId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch criteria' });
        } else if (results.length === 0) {
            return res.status(404).send({ message: 'Criteria not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Unified update criteria by internal or external ID
exports.updateCriteria = (req, res) => {
    const updatedCriteria = {
        criteriaName: req.body.criteriaName,
        description: req.body.description,
        saat_rating: req.body.saat_rating // Added saat_rating
    };

    // Check if internal ID is provided
    if (req.params.criteriaID) {
        Criteria.updateById(req.params.criteriaID, updatedCriteria, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Failed to update criteria' });
            } else if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Criteria not found' });
            }
            return res.status(200).send({ message: 'Criteria updated successfully' });
        });
    } 
    // Check if external ID is provided
    else if (req.params.externalCriteriaId) {
        Criteria.updateByExternalId(req.params.externalCriteriaId, updatedCriteria, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Failed to update criteria' });
            } else if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Criteria not found' });
            }
            return res.status(200).send({ message: 'Criteria updated successfully' });
        });
    } else {
        return res.status(400).send({ message: 'Invalid request. Provide either criteriaID or externalCriteriaId.' });
    }
};

// Unified delete criteria by internal or external ID
exports.deleteCriteria = (req, res) => {
    // Check if internal ID is provided
    if (req.params.criteriaID) {
        Criteria.deleteById(req.params.criteriaID, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Failed to delete criteria' });
            } else if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Criteria not found' });
            }
            return res.status(200).send({ message: 'Criteria deleted successfully' });
        });
    } 
    // Check if external ID is provided
    else if (req.params.externalCriteriaId) {
        Criteria.deleteByExternalId(req.params.externalCriteriaId, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Failed to delete criteria' });
            } else if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Criteria not found' });
            }
            return res.status(200).send({ message: 'Criteria deleted successfully' });
        });
    } else {
        return res.status(400).send({ message: 'Invalid request. Provide either criteriaID or externalCriteriaId.' });
    }
};

// Fetch supplier evaluations by criteriaID
exports.getSupplierEvaluationsByCriteriaId = (req, res) => {
    const criteriaID = req.params.criteriaID;
    Criteria.getSupplierEvaluationsByCriteriaId(criteriaID, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch supplier evaluations' });
        } else if (results.length === 0) {
            return res.status(404).send({ message: 'No evaluations found for this criterion' });
        }
        res.status(200).json(results);
    });
};
