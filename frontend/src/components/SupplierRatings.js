import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvaluationsByCriteriaId } from '../api/evaluationApi';
import { fetchCriteriaById } from '../api/evsupplierApi';
import '../styles/SupplierRatings.css';

const SupplierRatings = () => {
    const { criteriaId } = useParams(); // Retrieve criteria ID from URL parameters
    const [evaluations, setEvaluations] = useState([]); // State to hold evaluations
    const [criteriaName, setCriteriaName] = useState(''); // State to hold criteria name
    const [error, setError] = useState(null); // State to hold any error messages

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const data = await getEvaluationsByCriteriaId(criteriaId); // Fetch evaluations from API
                setEvaluations(data);
            } catch (err) {
                console.error('Failed to load evaluations:', err);
                setError('Failed to load evaluations');
            }
        };

        const fetchCriteriaName = async () => {
            try {
                const criteriaData = await fetchCriteriaById(criteriaId); // Fetch criteria details from API
                setCriteriaName(criteriaData.criteriaName); // Update criteria name in state
            } catch (err) {
                console.error('Failed to load criteria:', err);
                setError('Failed to load criteria name');
            }
        };

        fetchEvaluations();
        fetchCriteriaName();
    }, [criteriaId]); // Effect runs whenever criteriaId changes

    // Render error message if there is one
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Supplier Ratings for {criteriaName || `Criteria ID: ${criteriaId}`}</h2>
            {evaluations.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map((evalItem) => (
                            <tr key={evalItem.supplierName}>
                                <td>{evalItem.supplierName}</td>
                                <td>{evalItem.rating}</td>
                                <td>{evalItem.ratingDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No evaluations found.</p>
            )}
        </div>
    );
};

export default SupplierRatings;
