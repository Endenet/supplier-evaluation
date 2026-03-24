import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllSupplierScores, calculateFinalScores } from '../api/supplierScoresApi';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import '../styles/FinalSupplierScores.css';

const FinalSupplierScores = () => {
  const { user } = useAuth(); // ✅ Get user info
  const isAdmin = user?.role === 'admin';

  const [supplierScores, setSupplierScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const loadSupplierScores = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllSupplierScores();
      setSupplierScores(data || []);
    } catch (error) {
      console.error('Failed to load supplier scores:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCalculateScores = async () => {
    setIsCalculating(true);
    try {
      await calculateFinalScores();
      loadSupplierScores();
    } catch (error) {
      console.error('Failed to calculate scores:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    loadSupplierScores();
  }, [loadSupplierScores]);

  return (
    <div className="final-supplier-scores-container">
      <h2>Final Supplier Scores</h2>

      <table className="final-supplier-scores-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {supplierScores.map((score) => (
            <tr key={score.supplierID}>
              <td>{score.supplierID}</td>
              <td>{score.supplierName}</td>
              <td>{score.totalScore.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons-container">
        <button onClick={loadSupplierScores} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Get Final Scores'}
        </button>
        {isAdmin && (
          <button onClick={handleCalculateScores} disabled={isCalculating}>
            {isCalculating ? 'Calculating...' : 'Calculate Final Score'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FinalSupplierScores;
