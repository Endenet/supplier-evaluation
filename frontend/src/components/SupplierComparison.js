import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllComparisons, generateSupplierComparisons } from '../api/supplierComparisonApi';
import { useAuth } from '../context/AuthContext'; // ✅ Import auth context
import '../styles/SupplierComparisonTable.css';

const SupplierComparison = () => {
  const { user } = useAuth(); // ✅ Get user from context
  const isAdmin = user?.role === 'admin';

  const [comparisons, setComparisons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadComparisons = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllComparisons();
      setComparisons(data || []);
    } catch (error) {
      console.error('Failed to load comparisons:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateComparisons = async () => {
    setIsGenerating(true);
    try {
      await generateSupplierComparisons();
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
      <h2>Supplier Comparisons</h2>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier A</th>
            <th>Supplier B</th>
            <th>Criterion</th>
            <th>Comparison Value</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.supplierA}</td>
              <td>{item.supplierB}</td>
              <td>{item.criterion}</td>
              <td>{item.comparisonValue.toFixed(3)}</td>
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

export default SupplierComparison;
