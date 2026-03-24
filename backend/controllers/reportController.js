const { pool } = require('../config/db');
const Report = require('../models/Report');

const generateReport = async (req, res) => {
  try {
    const connection = pool.promise();
    const { title, prepared_by, purpose, objective, final_recommendation } = req.body;

    // Fetch data
    const [criteria] = await connection.query('SELECT * FROM criteria');
    const [criteria_comparison] = await connection.query('SELECT * FROM criteria_comparison');
    const [criteria_weights] = await connection.query('SELECT * FROM criteria_weights');
    const [suppliers] = await connection.query('SELECT * FROM suppliers');
    const [supplier_evaluations] = await connection.query('SELECT * FROM supplier_evaluations');
    const [supplier_comparison] = await connection.query('SELECT * FROM supplier_comparison');
    const [supplier_weights] = await connection.query('SELECT * FROM supplier_weight');
    const [supplier_scores] = await connection.query('SELECT * FROM supplier_scores');

    // Map criteria and supplier names
    const criteriaMap = criteria.reduce((map, c) => ({ ...map, [c.criteriaID]: c.criteriaName }), {});
    const supplierMap = suppliers.reduce((map, s) => ({ ...map, [s.supplierID]: s.supplierName }), {});

    // Format Data
    const formatted_criteria = criteria.map(c => ({
      criteriaID: c.criteriaID,
      externalCriteriaId: c.externalCriteriaId,
      criteriaName: c.criteriaName,
      description: c.description,
      saat_rating: c.saat_rating,
      created_at: c.created_at,
      updated_at: c.updated_at,
    }));

    const formatted_criteria_comparison = criteria_comparison.map(c => ({
      id: c.id,
      "criteria Name1": criteriaMap[c.criteriaID1] || c.criteriaID1,
      "criteria Name2": criteriaMap[c.criteriaID2] || c.criteriaID2,
      comparisonValue: c.comparisonValue,
    }));

    const formatted_criteria_weights = criteria_weights
      .map(w => ({
        id: w.id,
        "Criteria Name": criteriaMap[w.criteriaID] || w.criteriaID,
        weight: w.weight,
      }))
      .sort((a, b) => b.weight - a.weight);

    const formatted_supplier_evaluations = supplier_evaluations.map(e => ({
      evaluationID: e.evaluationID,
      "Supplier Name": supplierMap[e.supplierID] || e.supplierID,
      criteria: criteriaMap[e.criteriaID] || e.criteriaID,
      rating: e.rating,
      evaluationDate: e.evaluationDate,
    }));

    const formatted_supplier_comparison = supplier_comparison.map(sc => ({
      id: sc.id,
      "Supplier Name1": supplierMap[sc.supplierID1] || sc.supplierID1,
      "Supplier Name2": supplierMap[sc.supplierID2] || sc.supplierID2,
      criteria: criteriaMap[sc.criteriaID] || sc.criteriaID,
      comparisonValue: sc.comparisonValue,
    }));

    const intermediate_supplier_weights = supplier_weights.map(sw => ({
      id: sw.id,
      "Supplier Name": supplierMap[sw.supplierID] || sw.supplierID,
      criteria: criteriaMap[sw.criteriaID] || sw.criteriaID,
      weight: sw.weight,
    }));

    const groupedByCriteria = intermediate_supplier_weights.reduce((acc, curr) => {
      const criteria = curr.criteria;
      if (!acc[criteria]) acc[criteria] = [];
      acc[criteria].push(curr);
      return acc;
    }, {});

    Object.keys(groupedByCriteria).forEach(criteria => {
      groupedByCriteria[criteria].sort((a, b) => b.weight - a.weight);
    });

    const formatted_supplier_weights = Object.values(groupedByCriteria).flat();

    const formatted_supplier_scores = supplier_scores
      .map(s => ({
        id: s.supplierID,
        "Supplier Name": supplierMap[s.supplierID] || s.supplierID,
        totalScore: s.totalScore,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    const evaluation_data = {
      criteria: formatted_criteria,
      criteria_comparison: formatted_criteria_comparison,
      criteria_weights: formatted_criteria_weights,
      suppliers,
      supplier_evaluations: formatted_supplier_evaluations,
      supplier_comparison: formatted_supplier_comparison,
      supplier_weights: formatted_supplier_weights,
      supplier_scores: formatted_supplier_scores,
    };

    const reportId = await Report.createReport({
      title,
      prepared_by,
      purpose,
      objective,
      final_recommendation,
      evaluation_data,
    });

    res.status(201).json({ message: 'Report created successfully', reportId });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

const getAllReports = async (req, res) => {
  try {
    const connection = pool.promise();
    const [reports] = await connection.query('SELECT * FROM reports');

    const formattedReports = reports.map(report => {
      let parsedData = {};
      try {
        parsedData = JSON.parse(report.evaluation_data);
      } catch (e) {
        console.error(`Failed to parse evaluation_data for report ID ${report.report_id}`);
      }

      return {
        id: report.report_id,
        title: report.title,
        prepared_by: report.prepared_by,
        purpose: report.purpose,
        objective: report.objective,
        date: report.created_at ? new Date(report.created_at).toISOString().split('T')[0] : '',
        final_recommendation: report.final_recommendation,
        evaluation_data: {
          criteria: parsedData.criteria || [],
          criteria_comparison: parsedData.criteria_comparison || [],
          criteria_weights: parsedData.criteria_weights || [],
          suppliers: parsedData.suppliers || [],
          supplier_evaluations: parsedData.supplier_evaluations || [],
          supplier_comparison: parsedData.supplier_comparison || [],
          supplier_weights: parsedData.supplier_weights || [],
          supplier_scores: parsedData.supplier_scores || [],
        }
      };
    });

    res.status(200).json(formattedReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

const getReportById = async (req, res) => {
  const reportId = req.params.id;

  try {
    const connection = pool.promise();
    const [results] = await connection.query('SELECT * FROM reports WHERE report_id = ?', [reportId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = results[0];
    let parsedData = {};

    try {
      parsedData = JSON.parse(report.evaluation_data);
    } catch (e) {
      console.error(`Failed to parse evaluation_data for report ID ${report.report_id}`);
    }

    res.status(200).json({
      id: report.report_id,
      title: report.title,
      prepared_by: report.prepared_by,
      purpose: report.purpose,
      objective: report.objective,
      date: new Date(report.created_at).toISOString().split('T')[0],
      final_recommendation: report.final_recommendation,
      evaluation_data: {
        criteria: parsedData.criteria || [],
        criteria_comparison: parsedData.criteria_comparison || [],
        criteria_weights: parsedData.criteria_weights || [],
        suppliers: parsedData.suppliers || [],
        supplier_evaluations: parsedData.supplier_evaluations || [],
        supplier_comparison: parsedData.supplier_comparison || [],
        supplier_weights: parsedData.supplier_weights || [],
        supplier_scores: parsedData.supplier_scores || [],
      }
    });

  } catch (error) {
    console.error('Error fetching report by ID:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

module.exports = {
  generateReport,
  getAllReports,
  getReportById,
};
