const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Export the pool for use in other modules
module.exports = {
    pool,
    connectDB: () => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                process.exit(1);
            }
            console.log("Connected to database.");
            if (connection) connection.release(); // Release the connection back to the pool
        });
    },
};
