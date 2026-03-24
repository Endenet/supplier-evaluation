import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/supplier-scores`;

export const fetchAllSupplierScores = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching supplier scores:', error);
        throw error;
    }
};

export const calculateFinalScores = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/calculate`);
        return response.data;
    } catch (error) {
        console.error('Error calculating final scores:', error);
        throw error;
    }
};
