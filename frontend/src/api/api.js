// src/services/api.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; // This should return the token or user data
    } catch (error) {
        // Throw the error response for proper handling
        throw error.response ? error.response : new Error('Login failed');
    }
};

export const resetPassword = async ({ token, newPassword }) => {
    const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
    return response.data;
};

export const forgotPassword = async ({ username }) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { username });
    return response.data;
};

// Add other API calls as needed
