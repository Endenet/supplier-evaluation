const { connection } = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (userData) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const query = `INSERT INTO Users (username, password, role) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(query, [userData.username, hashedPassword, userData.role], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    findByUsername: (username) => {
        const query = `SELECT * FROM Users WHERE username = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [username], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    },

    updatePassword: async (userID, newPassword) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const query = `UPDATE Users SET password = ? WHERE userID = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [hashedPassword, userID], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = User;
