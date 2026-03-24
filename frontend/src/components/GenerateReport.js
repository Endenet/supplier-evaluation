import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { generateReport } from '../api/reportApi';
import '../styles/report.css';

const GenerateReport = () => {
  const { user } = useAuth(); // ✅ Get user from context

  const [form, setForm] = useState({
    title: '',
    prepared_by: '',
    purpose: '',
    objective: '',
    final_recommendation: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await generateReport(form);
      setMessage(`✅ Report generated successfully. Report ID: ${result.reportId}`);
      setForm({
        title: '',
        prepared_by: '',
        purpose: '',
        objective: '',
        final_recommendation: '',
      });
    } catch (error) {
      setMessage('❌ Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (user?.role !== 'admin') {
    return (
      <div className="report-container">
        <h2 className="report-header">Generate Evaluation Report</h2>
        <p className="report-message warning">⚠️ Only admins can generate reports.</p>
      </div>
    );
  }

  return (
    <div className="report-container">
      <h2 className="report-header">Generate Evaluation Report</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-box">
          <input
            type="text"
            name="title"
            placeholder="Report Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-box">
          <input
            type="text"
            name="prepared_by"
            placeholder="Prepared By"
            value={form.prepared_by}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-box">
          <textarea
            name="purpose"
            placeholder="Purpose"
            value={form.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-box">
          <textarea
            name="objective"
            placeholder="Objective"
            value={form.objective}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-box">
          <textarea
            name="final_recommendation"
            placeholder="Final Recommendation"
            value={form.final_recommendation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </form>

      {message && <p className="report-message">{message}</p>}
    </div>
  );
};

export default GenerateReport;
