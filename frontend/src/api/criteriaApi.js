import axios from 'axios';

// Define the base URL for the criteria API
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/criteria`; // Adjust URL to match your backend

// Get all criteria
export const getAllCriteria = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new criteria
export const addCriteria = async (criteriaData) => {
    try {
        const response = await axios.post(API_BASE_URL, criteriaData);
        return response.data;
    } catch (error) {
        console.error('Error adding criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Get criteria by external ID
export const getCriteriaByExternalId = async (externalCriteriaId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/external/${externalCriteriaId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching criteria by external ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Get supplier evaluations by criteria ID
export const getSupplierEvaluationsByCriteriaId = async (criteriaID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${criteriaID}/supplier-evaluations`);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('Error fetching supplier evaluations:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update a criteria by external ID
export const updateCriteriaByExternalId = async (externalCriteriaId, criteriaData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/external/${externalCriteriaId}`, criteriaData);
        return response.data;
    } catch (error) {
        console.error('Error updating criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a criteria by external ID
export const deleteCriteriaByExternalId = async (externalCriteriaId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/external/${externalCriteriaId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Additional function to get criteria by ID
export const getCriteriaById = async (criteriaID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/id/${criteriaID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching criteria by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update a criteria by ID
export const updateCriteriaById = async (criteriaID, criteriaData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/id/${criteriaID}`, criteriaData);
        return response.data;
    } catch (error) {
        console.error('Error updating criteria by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a criteria by ID
export const deleteCriteriaById = async (criteriaID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/id/${criteriaID}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting criteria by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Unified update criteria method by either ID
export const updateCriteria = async (id, criteriaData, isExternal = false) => {
    try {
        const url = isExternal ? `${API_BASE_URL}/external/${id}` : `${API_BASE_URL}/id/${id}`;
        const response = await axios.put(url, criteriaData);
        return response.data;
    } catch (error) {
        console.error('Error updating criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Unified delete criteria method by either ID
export const deleteCriteria = async (id, isExternal = false) => {
    try {
        const url = isExternal ? `${API_BASE_URL}/external/${id}` : `${API_BASE_URL}/id/${id}`;
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error deleting criteria:', error.response ? error.response.data : error.message);
        throw error;
    }
};
