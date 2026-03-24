// supplier.js
import axios from 'axios';

export const fetchSuppliers = async () => {
    const response = await axios.get('/api/suppliers');
    return response.data;
};

export const submitSupplierComparison = async (comparisons, criterionID) => {
    await axios.post(`/api/suppliers/comparisons/${criterionID}`, { comparisons });
};

export const fetchSupplierScores = async () => {
    const response = await axios.get('/api/suppliers/scores');
    return response.data;
};
