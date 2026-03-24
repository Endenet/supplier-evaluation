import React, { useState, useEffect } from 'react'; 
import { fetchCriteria, fetchSuppliers } from '../api/evsupplierApi';
import { useNavigate } from 'react-router-dom';
import '../styles/SupplierEvaluation.css';
import { useAuth } from '../context/AuthContext'; // ✅ Import Auth context

const SupplierEvaluation = ({ onSupplierSelect }) => {
  const [criteria, setCriteria] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Access user context

  useEffect(() => {
    const loadCriteriaAndSuppliers = async () => {
      try {
        const criteriaData = await fetchCriteria();
        const supplierData = await fetchSuppliers();
        setCriteria(criteriaData);
        setSuppliers(supplierData);
      } catch (error) {
        console.error('Error fetching criteria or suppliers:', error);
      }
    };
    loadCriteriaAndSuppliers();
  }, []);

  const handleGoClick = () => {
    if (selectedSupplier) {
      navigate(`/evaluation/${selectedSupplier}`);
    } else {
      alert('Please select a supplier.');
    }
  };

  const handleDashboardRedirect = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="supplier-evaluation">
      <h1>Supplier Evaluation</h1>
      <h2>Criteria</h2>
      <table>
        <thead>
          <tr>
            <th>Criteria Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion.criteriaID}>
              <td>{criterion.criteriaName}</td>
              <td>{criterion.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="supplier-selection">
        <select
          onChange={(e) => setSelectedSupplier(e.target.value)}
          value={selectedSupplier}
          className="supplier-dropdown"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.supplierID} value={supplier.supplierID} style={{ color: 'blue' }}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
        <button onClick={handleGoClick} className="go-button">Go</button>
      </div>

      <div className="button-group">
        <button onClick={() => navigate(-1)} className="back-button">⬅ Back</button>
        <button onClick={handleDashboardRedirect} className="dashboard-button">🏠 Main Dashboard</button>
      </div>
    </div>
  );
};

export default SupplierEvaluation;
