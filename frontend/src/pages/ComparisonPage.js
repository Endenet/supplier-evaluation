// ComparisonPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CriteriaDropdown from '../components/CriteriaDropdown';

const ComparisonPage = () => {
    const [selectedCriterion, setSelectedCriterion] = useState(null);
    const navigate = useNavigate();

    const handleCriterionSelect = (criterionID) => {
        setSelectedCriterion(criterionID);
    };

    const handleGoClick = () => {
        if (selectedCriterion) {
            navigate(`/comparison/${selectedCriterion}`);
        }
    };

    return (
        <div>
            <h2>Supplier Comparison by Criterion</h2>
            <CriteriaDropdown onSelect={handleCriterionSelect} />
            <button onClick={handleGoClick} disabled={!selectedCriterion}>GO</button>
        </div>
    );
};

export default ComparisonPage;
