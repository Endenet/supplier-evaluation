import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/report.css';
import GenerateReport from '../components/GenerateReport';
import SavedReports from '../components/SavedReports';

const ReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('saved'); // Default for user

  // Set default view based on user role (admin or user)
  useEffect(() => {
    if (user?.role === 'admin') {
      setView('generate'); // Admin defaults to Generate Report
    } else {
      setView('saved'); // User defaults to View Saved Reports
    }
  }, [user]);

  const handleBackToDashboard = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <h2>Report & Results</h2>
        <button className="back-button" onClick={handleBackToDashboard}>
          🏠 Main Dashboard
        </button>
      </div>

      <div className="tab-buttons">
        <button
          className={view === 'generate' ? 'active' : ''}
          onClick={() => setView('generate')}
        >
          Generate Report
        </button>
        <button
          className={view === 'saved' ? 'active' : ''}
          onClick={() => setView('saved')}
        >
          View Saved Reports
        </button>
      </div>

      <div className="report-content">
        {view === 'generate' ? <GenerateReport /> : <SavedReports />}
      </div>
    </div>
  );
};

export default ReportPage;
