const Supplier = require('../models/supplierModel');

// Add new supplier
exports.addSupplier = (req, res) => {
    const newSupplier = {
        supplierID: req.body.supplierID,
        externalSupplierId: req.body.externalSupplierId,
        supplierName: req.body.supplierName,
        contactEmail: req.body.contactEmail,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    };

    Supplier.create(newSupplier, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to add supplier' });
        } else {
            res.status(201).send({ message: 'Supplier added successfully', externalSupplierId: newSupplier.externalSupplierId });
        }
    });
};

// Get all suppliers
exports.getAllSuppliers = (req, res) => {
    Supplier.getAll((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to fetch suppliers' });
        } else {
            res.status(200).json(results);
        }
    });
};

// Get supplier by supplierID
exports.getSupplierById = (req, res) => {
    Supplier.getById(req.params.supplierID, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to fetch supplier' });
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// Get supplier by externalSupplierId
exports.getSupplierByExternalId = (req, res) => {
    Supplier.getByExternalId(req.params.externalSupplierId, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to fetch supplier' });
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

// Get suppliers by name
exports.getSuppliersByName = (req, res) => {
    const { supplierName } = req.query;

    Supplier.getByName(supplierName, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch suppliers' });
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'No suppliers found' });
        }
        res.status(200).json(results);
    });
};

// Update supplier by supplierID
exports.updateSupplierById = (req, res) => {
    const updatedSupplier = {
        supplierName: req.body.supplierName,
        contactEmail: req.body.contactEmail,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    };

    Supplier.updateById(req.params.supplierID, updatedSupplier, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to update supplier' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).send({ message: 'Supplier updated successfully' });
        }
    });
};

// Update supplier by externalSupplierId
exports.updateSupplierByExternalId = (req, res) => {
    const updatedSupplier = {
        supplierName: req.body.supplierName,
        contactEmail: req.body.contactEmail,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    };

    Supplier.updateByExternalId(req.params.externalSupplierId, updatedSupplier, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to update supplier' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).send({ message: 'Supplier updated successfully' });
        }
    });
};

// Delete supplier by supplierID
exports.deleteSupplierById = (req, res) => {
    Supplier.deleteById(req.params.supplierID, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to delete supplier' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).send({ message: 'Supplier deleted successfully' });
        }
    });
};

// Delete supplier by externalSupplierId
exports.deleteSupplierByExternalId = (req, res) => {
    Supplier.deleteByExternalId(req.params.externalSupplierId, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to delete supplier' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Supplier not found' });
        } else {
            res.status(200).send({ message: 'Supplier deleted successfully' });
        }
    });
};

// Get all supplier names
exports.getAllSupplierNames = (req, res) => {
    Supplier.getAllNames((err, results) => {
        if (err) {
            console.error('Error fetching supplier names:', err);
            return res.status(500).send({ error: 'Failed to fetch supplier names' });
        }
        
        // Check if results are empty and handle accordingly
        if (results.length === 0) {
            return res.status(200).json([]); // Return empty array if no suppliers
        }

        res.status(200).json(results);
    });
};
