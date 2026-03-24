import React, { useState } from 'react';
import { generateReport } from '../api/reportApi';

const ReportForm = ({ onReportGenerated }) => {
  const [formData, setFormData] = useState({
    title: '',
    prepared_by: '',
    purpose: '',
    objective: '',
    final_recommendation: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await generateReport(formData);
      alert('Report generated successfully!');
      if (onReportGenerated) onReportGenerated(data.reportId);
    } catch (err) {
      alert('Error generating report');
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Generate New Evaluation Report</h2>
      {['title', 'prepared_by', 'purpose', 'objective', 'final_recommendation'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.replace('_', ' ')}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Generate Report</button>
    </form>
  );
};

export default ReportForm;
