import React, { useEffect, useState } from 'react';
import { fetchWeights, calculateWeights } from '../api/criteriaWeightsApi';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import '../styles/CriteriaComparisonTable.css';

const CriteriaWeights = () => {
  const { user } = useAuth(); // ✅ Get user from context
  const isAdmin = user?.role === 'admin';

  const [weights, setWeights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const loadWeights = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWeights();
      setWeights(data);
    } catch (error) {
      console.error('Failed to load weights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculateWeights = async () => {
    setIsCalculating(true);
    try {
      await calculateWeights();
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
    <div className="comparison-table-container">
      <h2>Criteria Weights</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight, index) => (
            <tr key={index}>
              <td>{weight.criteriaName}</td>
              <td>{weight.weight ? weight.weight.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons-container">
        {isAdmin && (
          <button onClick={handleCalculateWeights} disabled={isCalculating}>
            {isCalculating ? 'Calculating...' : 'Calculate Weights'}
          </button>
        )}
        <button onClick={loadWeights} disabled={isLoading}>
          {isLoading ? 'Loading Weights...' : 'Get Weights'}
        </button>
      </div>
    </div>
  );
};

export default CriteriaWeights;
