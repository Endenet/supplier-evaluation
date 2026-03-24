import React, { useEffect, useState } from 'react';
import { fetchAllWeights, calculateWeight } from '../api/supplierWeightApi';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import '../styles/SupplierWeightTable.css';

const SupplierWeight = () => {
  const { user } = useAuth(); // ✅ Get user from context
  const isAdmin = user?.role === 'admin';

  const [weights, setWeights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const loadWeights = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllWeights();
      setWeights(data || []);
    } catch (error) {
      console.error('Failed to load supplier weights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculateWeight = async () => {
    setIsCalculating(true);
    try {
      await calculateWeight();
      loadWeights();
    } catch (error) {
      console.error('Failed to calculate weights:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    loadWeights();
  }, []);

  return (
    <div className="weight-table-container">
      <h2>Supplier Weights</h2>

      <table className="weight-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Criteria Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight) => (
            <tr key={weight.id}>
              <td>{weight.id}</td>
              <td>{weight.supplierName}</td>
              <td>{weight.criteriaName}</td>
              <td>{weight.weight.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons-container">
        <button onClick={loadWeights} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Weights'}
        </button>
        {isAdmin && (
          <button onClick={handleCalculateWeight} disabled={isCalculating}>
            {isCalculating ? 'Calculating...' : 'Calculate Weights'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SupplierWeight;
