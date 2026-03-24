// SupplierComparisonPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SupplierComparisonTable from '../components/SupplierComparisonTable';

const SupplierComparisonPage = () => {
    const { criterionID } = useParams();

    return (
        <div>
            <h2>Supplier Comparison for Criterion {criterionID}</h2>
            <SupplierComparisonTable criterionID={criterionID} />
        </div>
    );
};

export default SupplierComparisonPage;
