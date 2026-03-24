import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import auth context
import CriteriaComparison from "../components/CriteriaComparison";
import CriteriaWeight from "../components/CriteriaWeights";
import SupplierComparison from "../components/SupplierComparison";
import SupplierWeight from "../components/SupplierWeight";
import FinalSupplierScores from "../components/FinalSupplierScores";
import SupplierComparisonMatrix from "../components/SupplierComparisonMatrix";
import "../styles/EvaluationComparisonPage.css";

const EvaluationComparisonPage = () => {
  const [activeTab, setActiveTab] = useState("criteriaComparison");
  const { user } = useAuth(); // ✅ Get current user
  const dashboardRoute = user?.role === "admin" ? "/admin" : "/user"; // ✅ Determine dashboard route

  return (
    <div className="evaluation-comparison-page">
      <div className="evaluation-header">
        <div className="header-top">
          <h2>Evaluation & Comparison</h2>
          <Link to={dashboardRoute}>
            <button className="back-button">🏠 Main Dashboard</button>
          </Link>
        </div>

        <div className="tab-buttons">
          <button onClick={() => setActiveTab("criteriaComparison")}>
            Criteria Comparison
          </button>
          <button onClick={() => setActiveTab("criteriaWeight")}>
            Criteria Weight
          </button>
          <button onClick={() => setActiveTab("supplierComparison")}>
            Supplier Comparison
          </button>
          <button onClick={() => setActiveTab("supplierWeight")}>
            Supplier Weight
          </button>
          <button onClick={() => setActiveTab("supplierComparisonByCriteria")}>
            Supplier Comparison by Criteria
          </button>
          <button onClick={() => setActiveTab("finalSupplierScore")}>
            Final Supplier Score
          </button>
        </div>
      </div>

      <div className="evaluation-content">
        {activeTab === "criteriaComparison" && <CriteriaComparison />}
        {activeTab === "criteriaWeight" && <CriteriaWeight />}
        {activeTab === "supplierComparison" && <SupplierComparison />}
        {activeTab === "supplierWeight" && <SupplierWeight />}
        {activeTab === "supplierComparisonByCriteria" && <SupplierComparisonMatrix />}
        {activeTab === "finalSupplierScore" && <FinalSupplierScores />}
      </div>

      <footer className="page-footer">
        <p>Evaluation & Comparison Page Footer</p>
      </footer>
    </div>
  );
};

export default EvaluationComparisonPage;
