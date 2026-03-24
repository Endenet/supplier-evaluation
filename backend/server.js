const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Importing database configuration
const db = require('./config/db');
db.connectDB(); // Connect to the database

// Importing routes
const authRoutes = require('./routes/auth'); // Authentication routes
const protectedRoutes = require('./routes/protected'); // Protected routes (e.g., admin-only)
const supplierRoutes = require('./routes/supplierRoutes');
const criteriaRoutes = require('./routes/criteriaRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const criteriaComparisonRoutes = require('./routes/criteriaComparisonRoutes');
const criteriaWeightsRoutes = require('./routes/criteriaWeightsRoutes');
const supplierComparisonRoutes = require('./routes/supplierComparisonRoutes');
const supplierScoresRoutes = require('./routes/supplierScoresRoutes');
const supplierWeightRoutes = require('./routes/supplierWeightRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Auth and Role-based Access Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Evaluation System API Routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/criteria-comparison', criteriaComparisonRoutes);
app.use('/api/criteria-weights', criteriaWeightsRoutes);
app.use('/api/supplier-comparison', supplierComparisonRoutes);
app.use('/api/supplier-scores', supplierScoresRoutes);
app.use('/api/supplier-weights', supplierWeightRoutes);
app.use('/api/reports', reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
