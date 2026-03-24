import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { logout } = useAuth();

  // Dummy stats data (replace with actual data later)
  const suppliersCount = 5;
  const criteriaCount = 8;
  const topSupplier = "Mindray";
  const totalEvaluations = 10;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3 className="sidebar-header">Main Panel</h3>
        <ul className="sidebar-nav">
          <li>
            <Link to="/admin" className="nav-link">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          {/* Unified Supplier Management Route */}
          <li>
            <Link to="/suppliers" className="nav-link">
              <i className="fas fa-archive"></i> Supplier Management
            </Link>
          </li>

          <li>
            <Link to="/criteria" className="nav-link">
              <i className="fas fa-cogs"></i> Criteria Management
            </Link>
          </li>
          <li>
            <Link to="/evaluation-comparison" className="nav-link">
              <i className="fas fa-check-square"></i> Evaluation & Comparison
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link">
              <i className="fas fa-chart-bar"></i> Results & Reporting
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        <header className="admin-header">
          <h2>Dashboard</h2>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </header>

        <section className="admin-welcome">
          <h3>Welcome!</h3>
          <p>Here’s a quick overview of the platform:</p>
        </section>

        {/* Quick Stats Section */}
        <section className="admin-statistics">
          <div className="stat-card">
            <h4>Total Suppliers</h4>
            <p>{suppliersCount}</p>
          </div>
          <div className="stat-card">
            <h4>Total Criteria</h4>
            <p>{criteriaCount}</p>
          </div>
          <div className="stat-card">
            <h4>Top Supplier</h4>
            <p>{topSupplier}</p>
          </div>
          <div className="stat-card">
            <h4>Total Evaluations</h4>
            <p>{totalEvaluations}</p>
          </div>
        </section>

        {/* Supplier Management Quick Link */}
        <section className="quick-links">
          <h3>Supplier Management</h3>
          <div className="action-card">
            <Link to="/suppliers">
              <button className="action-button">Manage Suppliers</button>
            </Link>
          </div>
        </section>

        {/* Evaluation & Reporting Section */}
        <section className="quick-links">
          <h3>Evaluation & Reporting</h3>
          <div className="action-card">
            <Link to="/criteria/add">
              <button className="action-button">Add Criterion</button>
            </Link>
          </div>
          <div className="action-card">
            <Link to="/evaluation">
              <button className="action-button">Rate Suppliers</button>
            </Link>
          </div>
          <div className="action-card">
            <Link to="/reports">
              <button className="action-button">View Reports</button>
            </Link>
          </div>
          {/* Updated Evaluation & Comparison Button to Redirect to Criteria Comparison */}
          <div className="action-card">
            <Link to="/criteria-comparison">
              <button className="action-button">Evaluation & Comparison</button>
            </Link>
          </div>
        </section>

        <footer className="admin-footer">
          <p>Admin Dashboard Footer</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
