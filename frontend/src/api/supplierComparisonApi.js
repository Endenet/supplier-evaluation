import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/supplier-comparison`;

export const fetchAllComparisons = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comparisons:', error);
        throw error;
    }
};

export const fetchComparisonsByCriterion = async (criterionID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${criterionID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comparisons by criterion:', error);
        throw error;
    }
};

export const generateSupplierComparisons = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate`);
        return response.data;
    } catch (error) {
        console.error('Error generating supplier comparisons:', error);
        throw error;
    }
};
