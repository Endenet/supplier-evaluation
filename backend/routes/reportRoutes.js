const express = require('express');
const router = express.Router();
const {
  generateReport,
  getAllReports,
  getReportById,
} = require('../controllers/reportController');

// POST /api/reports
router.post('/', generateReport);

// GET /api/reports
router.get('/', getAllReports);

// ✅ GET /api/reports/:id
router.get('/:id', getReportById);

module.exports = router;
