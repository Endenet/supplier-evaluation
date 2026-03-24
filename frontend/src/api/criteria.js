// src/api/criteria.js
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api`; // Update this URL based on your backend setup

export const fetchCriteriaComparisons = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/criteria-comparisons`);
        return response.data; // Returns the criteria comparisons data
    } catch (error) {
        console.error("Error fetching criteria comparisons:", error);
        throw error; // Propagate error for handling in the calling component
    }
};

export const fetchCriteriaWeights = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/criteria-weights`);
        return response.data; // Returns the criteria weights data
    } catch (error) {
        console.error("Error fetching criteria weights:", error);
        throw error; // Propagate error for handling in the calling component
    }
};
