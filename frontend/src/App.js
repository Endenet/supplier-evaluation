import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import SupplierManagement from "./components/SupplierManagement";
import EditSupplier from "./components/EditSupplier";
import CriteriaManagement from "./components/CriteriaManagement";
import EditCriteria from "./components/EditCriteria";
import SupplierEvaluation from "./components/SupplierEvaluation";
import EvaluationPage from "./components/EvaluationPage";
import SupplierRatings from "./components/SupplierRatings";
import EvaluationComparisonPage from "./pages/EvaluationComparisonPage";
import CriteriaComparison from "./components/CriteriaComparison";
import CriteriaWeights from "./components/CriteriaWeights";
import SupplierComparison from "./components/SupplierComparison";
import SupplierWeight from "./components/SupplierWeight";
import FinalSupplierScores from "./components/FinalSupplierScores";
import SupplierComparisonMatrix from "./components/SupplierComparisonMatrix";
import ReportPage from "./pages/ReportPage";
import ReportDetail from "./components/ReportDetail";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* All following routes now allow both admin and user */}
          <Route
            path="/suppliers"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:externalId"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <EditSupplier />
              </ProtectedRoute>
            }
          />

          <Route
            path="/criteria"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <CriteriaManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/criteria/edit/:externalId"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <EditCriteria />
              </ProtectedRoute>
            }
          />

          <Route
            path="/evaluation"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierEvaluation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/evaluation/:supplierId"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <EvaluationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ratings/:criteriaId"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierRatings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/evaluation-comparison"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <EvaluationComparisonPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/criteria-comparison"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <CriteriaComparison />
              </ProtectedRoute>
            }
          />

          <Route
            path="/criteria-weight"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <CriteriaWeights />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supplier-comparison"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierComparison />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supplier-weight"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierWeight />
              </ProtectedRoute>
            }
          />

          <Route
            path="/final-supplier-scores"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <FinalSupplierScores />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supplier-comparison-by-criteria"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <SupplierComparisonMatrix />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <ReportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports/:id"
            element={
              <ProtectedRoute role={["admin", "user"]}>
                <ReportDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
