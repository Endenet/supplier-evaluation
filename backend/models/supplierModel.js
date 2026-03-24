const db = require('../config/db');

// Create Supplier model
const Supplier = {
    create: (data, callback) => {
        const query = 'INSERT INTO suppliers (supplierID, externalSupplierId, supplierName, contactEmail, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?)';
        db.pool.query(query, [data.supplierID, data.externalSupplierId, data.supplierName, data.contactEmail, data.phoneNumber, data.address], callback);
    },

    getAll: (callback) => {
        db.pool.query('SELECT * FROM suppliers', callback);
    },

    getById: (supplierID, callback) => {
        db.pool.query('SELECT * FROM suppliers WHERE supplierID = ?', [supplierID], callback);
    },

    getByExternalId: (externalSupplierId, callback) => {
        db.pool.query('SELECT * FROM suppliers WHERE externalSupplierId = ?', [externalSupplierId], callback);
    },

    updateById: (supplierID, data, callback) => {
        const query = 'UPDATE suppliers SET supplierName = ?, contactEmail = ?, phoneNumber = ?, address = ? WHERE supplierID = ?';
        db.pool.query(query, [data.supplierName, data.contactEmail, data.phoneNumber, data.address, supplierID], callback);
    },

    updateByExternalId: (externalSupplierId, data, callback) => {
        const query = 'UPDATE suppliers SET supplierName = ?, contactEmail = ?, phoneNumber = ?, address = ? WHERE externalSupplierId = ?';
        db.pool.query(query, [data.supplierName, data.contactEmail, data.phoneNumber, data.address, externalSupplierId], callback);
    },

    deleteById: (supplierID, callback) => {
        db.pool.query('DELETE FROM suppliers WHERE supplierID = ?', [supplierID], callback);
    },

    deleteByExternalId: (externalSupplierId, callback) => {
        db.pool.query('DELETE FROM suppliers WHERE externalSupplierId = ?', [externalSupplierId], callback);
    },

    // Method to get suppliers by name
    getByName: (supplierName, callback) => {
        const query = 'SELECT * FROM suppliers WHERE supplierName LIKE ?';
        db.pool.query(query, [`%${supplierName}%`], callback);
    },

    // Add this method in your Supplier model
    getAllNames: (callback) => {
        const query = 'SELECT supplierName FROM suppliers';
        console.log("Executing query:", query);
        db.pool.query(query, (err, results) => {
            console.log("Query results:", results); // Log results for debugging
            callback(err, results);
        });
     },
};

module.exports = Supplier;
