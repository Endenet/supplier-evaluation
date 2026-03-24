const { pool } = require('../config/db');

const Report = {
  createReport: async (reportData) => {
    const connection = pool.promise();
    const {
      title,
      prepared_by,
      purpose,
      objective,
      final_recommendation,
      evaluation_data,
    } = reportData;

    const query = `
      INSERT INTO reports 
      (title, prepared_by, purpose, objective, final_recommendation, evaluation_data)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
      title,
      prepared_by,
      purpose,
      objective,
      final_recommendation,
      JSON.stringify(evaluation_data),
    ]);

    return result.insertId;
  },
};

module.exports = Report;
