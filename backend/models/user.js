const { pool } = require('../config/db');

const createUser = (username, email, passwordHash, role) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        pool.query(query, [username, email, passwordHash, role], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        pool.query(query, [email], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

module.exports = { createUser, findUserByEmail };
