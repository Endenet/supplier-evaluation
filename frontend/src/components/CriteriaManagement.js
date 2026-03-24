import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCriteria from "./AddCriteria";
import CriteriaList from "./CriteriaList";
import SupplierList from "./SupplierList";
import "../styles/SupplierManagement.css";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const CriteriaManagement = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [refresh, setRefresh] = useState(0);
  const [viewingSuppliers, setViewingSuppliers] = useState(false);
  const [currentCriteriaId, setCurrentCriteriaId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Access user info

  const handleBackToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const handleBackToCriteriaManagement = () => {
    setViewingSuppliers(false);
    setCurrentCriteriaId(null);
  };

  const handleViewSuppliers = (criteriaId) => {
    setViewingSuppliers(true);
    setCurrentCriteriaId(criteriaId);
  };

  const handleAddCriteria = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="supplier-management-container">
      <div className="supplier-management-header">
        <h2>Criteria Management</h2>

        {viewingSuppliers ? (
          <button className="back-button" onClick={handleBackToCriteriaManagement}>
            🏠 Back to Criteria Management
          </button>
        ) : (
          <button className="back-button" onClick={handleBackToDashboard}>
            🏠 Main Dashboard
          </button>
        )}
      </div>

      <div className="tab-buttons">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          List Criteria
        </button>
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Criteria
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "list" && !viewingSuppliers && (
          <CriteriaList refreshTrigger={refresh} onViewSuppliers={handleViewSuppliers} />
        )}
        {activeTab === "add" && (
          <AddCriteria setActiveTab={setActiveTab} onAdd={handleAddCriteria} />
        )}
        {viewingSuppliers && <SupplierList criteriaId={currentCriteriaId} />}
      </div>
    </div>
  );
};

export default CriteriaManagement;
