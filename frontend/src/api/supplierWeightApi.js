import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/supplier-weights`;

export const fetchAllWeights = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all supplier weights:', error);
        throw error;
    }
};

export const calculateWeight = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate-weight`);
        return response.data;
    } catch (error) {
        console.error('Error calculating supplier weights:', error);
        throw error;
    }
};
