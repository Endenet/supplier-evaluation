import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/criteria-weights`;

export const fetchWeights = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;  // Ensure this returns [{criteriaID, weight}, ...]
    } catch (error) {
        console.error('Error fetching weights:', error);
        throw error;
    }
};

export const calculateWeights = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate`);
        return response.data;
    } catch (error) {
        console.error('Error calculating weights:', error);
        throw error;
    }
};
