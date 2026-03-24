import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/suppliers`; // Adjust URL to match your backend

// Get all suppliers
export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response;
    } catch (error) {
        console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to handle it in the component
    }
};

// Add a new supplier
export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(API_BASE_URL, supplierData);
        return response;
    } catch (error) {
        console.error('Error adding supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Get a supplier by external ID
export const getSupplierByExternalId = async (externalId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${externalId}`);
        return response;
    } catch (error) {
        console.error('Error fetching supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update a supplier by external ID
export const updateSupplierByExternalId = async (externalId, supplierData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${externalId}`, supplierData);
        return response;
    } catch (error) {
        console.error('Error updating supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a supplier by external ID
export const deleteSupplierByExternalId = async (externalId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${externalId}`);
        return response;
    } catch (error) {
        console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Search for a supplier by externalSupplierId only
export const searchSupplierById = async (externalId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/external/${externalId}`); // Using the existing endpoint to fetch by ID
        return response;
    } catch (error) {
        console.error('Error searching supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};
// Delete a supplier by internal ID (supplierID)
export const deleteSupplierById = async (supplierId) => { // Changed function name and parameter
    try {
        const response = await axios.delete(`${API_BASE_URL}/${supplierId}`); // Ensure your backend supports this route
        return response;
    } catch (error) {
        console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};