const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Define routes with the new base path
router.post('/', supplierController.addSupplier); // Add a new supplier
router.get('/', supplierController.getAllSuppliers); // Get all suppliers
router.get('/names', supplierController.getAllSupplierNames); // Fetch only supplier names
router.get('/name', supplierController.getSuppliersByName); // Get suppliers by name
router.get('/external/:externalSupplierId', supplierController.getSupplierByExternalId); // Get supplier by external ID
router.get('/:supplierID', supplierController.getSupplierById); // Get supplier by supplier ID
router.put('/external/:externalSupplierId', supplierController.updateSupplierByExternalId); // Update supplier by external ID
router.put('/:supplierID', supplierController.updateSupplierById); // Update supplier by supplier ID
router.delete('/external/:externalSupplierId', supplierController.deleteSupplierByExternalId); // Delete supplier by external ID
router.delete('/:supplierID', supplierController.deleteSupplierById); // Delete supplier by supplier ID

module.exports = router;
