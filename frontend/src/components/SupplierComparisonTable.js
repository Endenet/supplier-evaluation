// src/components/SupplierComparisonTable.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComparisonsByCriterion } from '../api/supplierComparisonApi';
import { getSupplierWeightsByCriterion } from '../api/supplierWeightApi'; // New API for supplier weights
import { getAllCriteria } from '../api/criteriaApi';

const SupplierComparisonTable = () => {
    const { criterionID } = useParams();
    const [comparisonData, setComparisonData] = useState(null);
    const [supplierWeights, setSupplierWeights] = useState(null);
    const [criterionName, setCriterionName] = useState('');

    // Function to fetch comparison data for the selected criterion
    const fetchComparisonData = async () => {
        try {
            const data = await getComparisonsByCriterion(criterionID);
            setComparisonData(data);
        } catch (error) {
            console.error('Error fetching comparison data:', error);
        }
    };

    // Function to fetch supplier weights for the selected criterion
    const fetchSupplierWeights = async () => {
        try {
            const weights = await getSupplierWeightsByCriterion(criterionID);
            setSupplierWeights(weights);
        } catch (error) {
            console.error('Error fetching supplier weights:', error);
        }
    };

    // Function to fetch criterion name
    const fetchCriterionName = async () => {
        try {
            const criteriaList = await getAllCriteria();
            const criterion = criteriaList.find(c => c.criteriaID === parseInt(criterionID));
            if (criterion) {
                setCriterionName(criterion.criteriaName);
            }
        } catch (error) {
            console.error('Error fetching criteria:', error);
        }
    };

    useEffect(() => {
        fetchComparisonData();
        fetchSupplierWeights();
        fetchCriterionName();
    }, [criterionID]);

    // Display loading state until data is fetched
    if (!comparisonData || !supplierWeights) return <p>Loading...</p>;

    return (
        <div>
            <h3>Supplier Comparison for Criterion: {criterionName}</h3>
            
            {/* Comparison Table */}
            <h4>Comparison Table</h4>
            <table border="1" style={{ marginBottom: '10px' }}>
                <thead>
                    <tr>
                        <th></th>
                        {comparisonData.supplierNames.map((name, index) => (
                            <th key={index}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {comparisonData.comparisonMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{comparisonData.supplierNames[rowIndex]}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                onClick={fetchComparisonData} 
                style={{ 
                    fontSize: '15px', 
                    padding: '5px', 
                    marginTop: '5px', 
                    height: '40px', 
                    width: '150px' // Set height and width for button
                }}
            >
                Refresh Comparisons
            </button> {/* Button below the comparison table */}

            {/* Supplier Weights Table */}
            <h4>Supplier Weights</h4>
            <table border="1" style={{ marginBottom: '10px' }}>
                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {supplierWeights.map((weight, index) => (
                        <tr key={index}>
                            <td>{weight.supplierName}</td>
                            <td>{weight.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                onClick={fetchSupplierWeights} 
                style={{ 
                    fontSize: '15px', 
                    padding: '5px', 
                    marginTop: '5px', 
                    height: '40px', 
                    width: '150px' // Set height and width for button
                }}
            >
                Refresh Weights
            </button> {/* Button below the supplier weights table */}
        </div>
    );
};

export default SupplierComparisonTable;
