import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplierList from "./SupplierList";
import AddSupplier from "./AddSupplier";
import SearchSupplier from "./SearchSupplier";
import "../styles/SupplierManagement.css";
import { useAuth } from "../context/AuthContext"; // ✅ Added to access current user info

const SupplierManagement = () => {
  const [activeTab, setActiveTab] = useState("list");
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get user from auth context

  const handleBackToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin"); // ✅ Navigate to admin dashboard
    } else {
      navigate("/user"); // ✅ Navigate to user dashboard
    }
  };

  const handleEvaluation = () => {
    navigate("/evaluation"); // Updated route for Supplier Evaluation page
  };

  return (
    <div className="supplier-management-container">
      <div className="supplier-management-header">
        <h2>Supplier Management</h2>
        <button className="back-button" onClick={handleBackToDashboard}>
          🏠 Main Dashboard
        </button>
      </div>

      <div className="tab-buttons">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          List Suppliers
        </button>
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Supplier
        </button>
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          Search Supplier
        </button>
        <button className="evaluation-button" onClick={handleEvaluation}>
          Supplier Evaluation
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "list" && <SupplierList />}
        {activeTab === "add" && <AddSupplier setActiveTab={setActiveTab} />}
        {activeTab === "search" && <SearchSupplier />}
      </div>
    </div>
  );
};

export default SupplierManagement;
