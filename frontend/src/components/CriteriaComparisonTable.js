import React, { useEffect, useState, useCallback } from 'react';
import { fetchComparisons, generateComparisons } from '../api/criteriaComparisonApi';
import { fetchWeights, calculateWeights } from '../api/criteriaWeightsApi';
import '../styles/CriteriaComparisonTable.css';

const CriteriaComparisonTable = () => {
    const [comparisons, setComparisons] = useState([]);
    const [criteriaNames, setCriteriaNames] = useState([]);
    const [weights, setWeights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const loadComparisons = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchComparisons();
            processComparisons(data);
        } catch (error) {
            console.error('Failed to load comparisons:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadWeights = async () => {
        try {
            const data = await fetchWeights();
            setWeights(data);
        } catch (error) {
            console.error('Failed to load weights:', error);
        }
    };

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

    const processComparisons = (data) => {
        setCriteriaNames(data.criteriaNames);
        setComparisons(data.tableData);
    };

    useEffect(() => {
        loadComparisons();
        loadWeights();
    }, [loadComparisons]);

    return (
        <div className="comparison-table-container">
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
                <button onClick={loadComparisons} disabled={isLoading} className="refresh-button">
                    {isLoading ? 'Refreshing...' : 'Refresh Comparisons'}
                </button>
                <button onClick={handleGenerateComparisons} disabled={isGenerating} className="generate-button">
                    {isGenerating ? 'Generating...' : 'Generate Comparisons'}
                </button>
            </div>

            <div className="weights-container">
                <h2>Criteria Weights:</h2>
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
            </div>

            <div className="buttons-container">
                <button onClick={handleCalculateWeights} disabled={isCalculating} className="calculate-button">
                    {isCalculating ? 'Calculating...' : 'Calculate Weights'}
                </button>
                <button onClick={loadWeights} disabled={isLoading} className="get-weights-button">
                    {isLoading ? 'Loading Weights...' : 'Get Weights'}
                </button>
            </div>
        </div>
    );
};

export default CriteriaComparisonTable;
