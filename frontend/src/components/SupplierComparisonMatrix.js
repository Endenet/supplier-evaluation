import React, { useState, useEffect } from 'react';
import {
  fetchCriteria,
  fetchSupplierComparisonByCriterion,
  fetchWeightsByCriteria
} from '../api/supplierComparisonMatrixApi';
import '../styles/SupplierComparisonMatrix.css';

const SupplierComparisonMatrix = () => {
  const [criteria, setCriteria] = useState([]);
  const [selectedCriterionId, setSelectedCriterionId] = useState('');
  const [selectedCriterionName, setSelectedCriterionName] = useState('');
  const [comparisonMatrix, setComparisonMatrix] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [weights, setWeights] = useState([]);
  const [loadingMatrix, setLoadingMatrix] = useState(false);
  const [loadingWeights, setLoadingWeights] = useState(false);

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const data = await fetchCriteria();
        setCriteria(data);
      } catch (err) {
        console.error('Failed to fetch criteria:', err);
      }
    };
    loadCriteria();
  }, []);

  const loadMatrix = async (criterionId) => {
    setLoadingMatrix(true);
    try {
      const data = await fetchSupplierComparisonByCriterion(criterionId);
      if (data.length === 0) return;

      const name = data[0].criterion;
      const supplierSet = new Set();
      data.forEach(item => {
        supplierSet.add(item.supplierA);
        supplierSet.add(item.supplierB);
      });

      const suppliers = Array.from(supplierSet);
      const matrix = suppliers.map(() => Array(suppliers.length).fill(1.0));

      data.forEach(({ supplierA, supplierB, comparisonValue }) => {
        const row = suppliers.indexOf(supplierA);
        const col = suppliers.indexOf(supplierB);
        matrix[row][col] = parseFloat(comparisonValue.toFixed(2));
        matrix[col][row] = parseFloat((1 / comparisonValue).toFixed(2));
      });

      setSupplierNames(suppliers);
      setComparisonMatrix(matrix);
      setSelectedCriterionName(name);
    } catch (err) {
      console.error('Failed to fetch supplier comparisons:', err);
    } finally {
      setLoadingMatrix(false);
    }
  };

  const loadWeights = async (criterionId) => {
    setLoadingWeights(true);
    try {
      const data = await fetchWeightsByCriteria(criterionId);
      if (data && data.criteriaName && Array.isArray(data.suppliers)) {
        setSelectedCriterionName(data.criteriaName); // ensure consistent name
        setWeights(data.suppliers); // only array of suppliers with weight
      } else {
        setWeights([]);
      }
    } catch (err) {
      console.error('Failed to fetch weights:', err);
    } finally {
      setLoadingWeights(false);
    }
  };

  const handleCriterionChange = (e) => {
    const criterionId = e.target.value;
    setSelectedCriterionId(criterionId);
    if (criterionId) {
      loadMatrix(criterionId);
      loadWeights(criterionId);
    }
  };

  return (
    <div className="comparison-matrix-container">
      <h2>Supplier Evaluation by Criteria</h2>

      <div className="dropdown-section">
        <label htmlFor="criterion-select">Select Criterion:</label>
        <select
          id="criterion-select"
          value={selectedCriterionId}
          onChange={handleCriterionChange}
        >
          <option value="">-- Select --</option>
          {criteria.map(crit => (
            <option key={crit.criteriaID} value={crit.criteriaID}>
              {crit.criteriaName}
            </option>
          ))}
        </select>
      </div>

      {/* Supplier Comparison Table */}
      {comparisonMatrix.length > 0 && (
        <div className="matrix-table-section">
          <h3>Comparison Matrix - {selectedCriterionName}</h3>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Supplier</th>
                {supplierNames.map((name, idx) => (
                  <th key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td><strong>{supplierNames[rowIndex]}</strong></td>
                  {row.map((val, colIndex) => (
                    <td key={colIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => loadMatrix(selectedCriterionId)} disabled={!selectedCriterionId || loadingMatrix}>
              🔁 {loadingMatrix ? 'Refreshing...' : 'Refresh Comparison'}
            </button>
          </div>
        </div>
      )}

      {/* Supplier Weights Table */}
      {weights.length > 0 && (
        <div className="matrix-table-section">
          <h3>Supplier Weights - {selectedCriterionName}</h3>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {weights.map((item, index) => (
                <tr key={index}>
                  <td>{item.supplierName}</td>
                  <td>{item.weight.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => loadWeights(selectedCriterionId)} disabled={!selectedCriterionId || loadingWeights}>
              🔁 {loadingWeights ? 'Refreshing...' : 'Refresh Weights'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierComparisonMatrix;
