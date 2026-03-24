import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/criteria-comparison`;

export const fetchComparisons = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comparisons`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comparisons:', error);
        throw error;
    }
};

export const generateComparisons = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate`);
        return response.data;
    } catch (error) {
        console.error('Error generating comparisons:', error);
        throw error;
    }
};
