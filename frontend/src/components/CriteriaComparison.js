import React, { useEffect, useState, useCallback } from 'react';
import { fetchComparisons, generateComparisons } from '../api/criteriaComparisonApi';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import '../styles/CriteriaComparisonTable.css';

const CriteriaComparison = () => {
  const { user } = useAuth(); // ✅ Get user info
  const isAdmin = user?.role === 'admin';

  const [comparisons, setComparisons] = useState([]);
  const [criteriaNames, setCriteriaNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadComparisons = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchComparisons();
      setCriteriaNames(data.criteriaNames);
      setComparisons(data.tableData);
    } catch (error) {
      console.error('Failed to load comparisons:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateComparisons = async () => {
    setIsGenerating(true);
    try {
      await generateComparisons();
      loadComparisons();
    } catch (error) {
      console.error('Failed to generate comparisons:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    loadComparisons();
  }, [loadComparisons]);

  return (
    <div className="comparison-table-container">
      <h2>Criteria Comparison</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Criteria</th>
            {criteriaNames.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td><strong>{criteriaNames[rowIndex]}</strong></td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{typeof value === 'number' ? value.toFixed(2) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons-container">
        <button onClick={loadComparisons} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Comparisons'}
        </button>
        {isAdmin && (
          <button onClick={handleGenerateComparisons} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Comparisons'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CriteriaComparison;
