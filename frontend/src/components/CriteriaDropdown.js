// src/components/CriteriaDropdown.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCriteria } from '../api/criteriaApi';
import { getAllSupplierWeights, calculateSupplierWeight } from '../api/supplierFinalWeightApi';
import { getAllSupplierScores, calculateSupplierScores } from '../api/supplierScoresApi';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/supplier-comparison';

const CriteriaDropdown = () => {
    const [criteria, setCriteria] = useState([]);
    const [selectedCriterion, setSelectedCriterion] = useState(null);
    const [comparisons, setComparisons] = useState([]);
    const [supplierWeights, setSupplierWeights] = useState([]);
    const [supplierScores, setSupplierScores] = useState([]);
    const navigate = useNavigate();

    // Fetch criteria for dropdown
    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const criteriaList = await getAllCriteria();
                setCriteria(criteriaList);
            } catch (error) {
                console.error('Error loading criteria:', error);
            }
        };
        fetchCriteria();
    }, []);

    // Fetch supplier comparisons
    useEffect(() => {
        const fetchComparisons = async () => {
            try {
                const response = await axios.get(API_URL);
                setComparisons(response.data);
            } catch (error) {
                console.error('Error fetching comparisons:', error);
            }
        };
        fetchComparisons();
    }, []);

    // Fetch supplier weights
    useEffect(() => {
        const loadSupplierWeights = async () => {
            try {
                const response = await getAllSupplierWeights();
                setSupplierWeights(response);
            } catch (error) {
                console.error('Error fetching supplier weights:', error);
            }
        };
        loadSupplierWeights();
    }, []);

    // Fetch supplier scores on component mount
    useEffect(() => {
        const fetchSupplierScores = async () => {
            try {
                const response = await getAllSupplierScores();
                console.log('Supplier Scores fetched:', response); // Log API response
                setSupplierScores(response);
            } catch (error) {
                console.error('Error fetching supplier scores:', error);
            }
        };
        fetchSupplierScores();
    }, []);

    const handleSelect = (event) => {
        setSelectedCriterion(event.target.value);
    };

    const handleGoClick = () => {
        if (selectedCriterion) {
            navigate(`/comparison/${selectedCriterion}`);
        }
    };

    const handleCalculate = async () => {
        try {
            const response = await axios.post(`${API_URL}/calculate`);
            alert('Calculations completed: ' + JSON.stringify(response.data));
        } catch (error) {
            console.error('Error calculating supplier comparisons:', error);
        }
    };

    const handleCalculateWeights = async () => {
        try {
            const response = await calculateSupplierWeight();
            alert('Supplier weights calculated successfully: ' + JSON.stringify(response));
        } catch (error) {
            console.error('Error calculating weights:', error);
        }
    };

    const handleGetAllSupplierWeights = async () => {
        try {
            const response = await getAllSupplierWeights();
            setSupplierWeights(response);
        } catch (error) {
            console.error('Error fetching all supplier weights:', error);
        }
    };

    const handleCalculateSupplierScores = async () => {
        try {
            const response = await calculateSupplierScores();
            alert('Supplier scores calculated successfully: ' + JSON.stringify(response));
            // Fetch the latest scores after calculation
            handleGetAllSupplierScores();
        } catch (error) {
            console.error('Error calculating supplier scores:', error);
        }
    };

    const handleGetAllSupplierScores = async () => {
        try {
            const response = await getAllSupplierScores();
            console.log('Fetched Supplier Scores:', response); // Log API response
            setSupplierScores(response);
        } catch (error) {
            console.error('Error fetching supplier scores:', error);
        }
    };

    return (
        <div>
            <h2>Supplier Comparison by Criterion</h2>
            <select 
                onChange={handleSelect} 
                defaultValue="" 
                style={{ width: '150px', height: '40px', fontSize: '12px' }}
            >
                <option value="" disabled>Select a Criterion</option>
                {criteria.map((criterion) => (
                    <option key={criterion.criteriaID} value={criterion.criteriaID}>
                        {criterion.criteriaName}
                    </option>
                ))}
            </select>
            <button 
                onClick={handleGoClick} 
                disabled={!selectedCriterion}
                style={{ fontSize: '12px', padding: '5px', width: '100px', height: '50px' }}
            >
                GO
            </button>

            <h2>All Supplier Comparisons</h2>
            {comparisons.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Supplier ID 1</th>
                            <th>Supplier ID 2</th>
                            <th>Criteria ID</th>
                            <th>Comparison Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisons.map((comparison) => (
                            <tr key={comparison.id}>
                                <td>{comparison.id}</td>
                                <td>{comparison.supplierID1}</td>
                                <td>{comparison.supplierID2}</td>
                                <td>{comparison.criteriaID}</td>
                                <td>{comparison.comparisonValue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No comparisons found.</p>
            )}
            <button 
                onClick={handleCalculate} 
                style={{ fontSize: '12px', padding: '5px', width: '100px', height: '50px', marginRight: '10px' }}
            >
                Calculate
            </button>
            <button 
                onClick={() => window.location.reload()} 
                style={{ fontSize: '12px', padding: '5px', width: '100px', height: '50px' }}
            >
                Get Comparisons
            </button>

            <h2>All Supplier Weights</h2>
            {Array.isArray(supplierWeights) && supplierWeights.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Supplier ID</th>
                            <th>Criteria ID</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierWeights.map((weight) => (
                            <tr key={weight.id}>
                                <td>{weight.id}</td>
                                <td>{weight.supplierID}</td>
                                <td>{weight.criteriaID}</td>
                                <td>{weight.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No supplier weights available.</p>
            )}
            <div>
                <button 
                    onClick={handleCalculateWeights} 
                    style={{ fontSize: '14px', padding: '8px', width: '200px', marginTop: '20px' }}
                >
                    Calculate Weights
                </button>
                <button 
                    onClick={handleGetAllSupplierWeights} 
                    style={{ fontSize: '14px', padding: '8px', width: '200px', marginTop: '20px' }}
                >
                    Get All Supplier Weights
                </button>
            </div>

            <h2>All Supplier Scores</h2>
            {Array.isArray(supplierScores) && supplierScores.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Supplier ID</th>
                            <th>Supplier Name</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierScores.map((score) => (
                            <tr key={score.supplierID}>
                                <td>{score.supplierID}</td>
                                <td>{score.supplierName}</td>
                                <td>{score.totalScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No supplier scores available.</p>
            )}
            <div>
                <button 
                    onClick={handleCalculateSupplierScores} 
                    style={{ fontSize: '14px', padding: '8px', width: '200px', marginTop: '20px' }}
                >
                    Calculate Supplier Scores
                </button>
                <button 
                    onClick={handleGetAllSupplierScores} 
                    style={{ fontSize: '14px', padding: '8px', width: '200px', marginTop: '20px' }}
                >
                    Get All Supplier Scores
                </button>
            </div>
        </div>
    );
};

export default CriteriaDropdown;
