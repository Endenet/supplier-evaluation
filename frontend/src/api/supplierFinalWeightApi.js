// src/api/supplierFinalWeightApi.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/supplier-weights`;

// Function to calculate supplier weights
export const calculateSupplierWeight = async () => {
    try {
        const response = await axios.post(`${API_URL}/calculate-weight`);
        return response.data;
    } catch (error) {
        console.error('Error calculating supplier weight:', error);
        throw error;
    }
};

// Function to get all supplier weights
export const getAllSupplierWeights = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log('API Response:', response); // Log the entire response for debugging
        return response.data;  // Ensure this is the correct data structure
    } catch (error) {
        console.error('Error fetching all supplier weights:', error);
        throw error;
    }
};
