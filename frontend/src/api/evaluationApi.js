import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/evaluations`; // Adjust URL as necessary
const SUPPLIER_API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/suppliers`; // New base URL for suppliers

// Fetch evaluations by supplier ID
export const getEvaluationsBySupplierId = async (supplierID) => {
    if (!supplierID) {
        throw new Error('Supplier ID is required to fetch evaluations.');
    }
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { supplierID }, // Pass supplierID as query parameter
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        throw error;
    }
};

// Fetch evaluations by criteria ID 
export const getEvaluationsByCriteriaId = async (criteriaID) => {
    if (!criteriaID) {
        throw new Error('Criteria ID is required to fetch evaluations.');
    }
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/criteria/${criteriaID}/supplier-evaluations`);
        return response.data; // Ensure this matches your API response structure
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        throw error;
    }
};

// Add a new evaluation
export const addEvaluation = async (evaluationData) => {
    if (!evaluationData || !evaluationData.supplierID || !evaluationData.criteriaID || !evaluationData.rating) {
        throw new Error('Invalid evaluation data provided.');
    }
    try {
        const response = await axios.post(API_BASE_URL, evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error adding evaluation:', error);
        throw error;
    }
};

// Update an existing evaluation
export const updateEvaluation = async (evaluationID, updatedData) => {
    if (!evaluationID || !updatedData) {
        throw new Error('Invalid evaluation ID or update data.');
    }
    try {
        const response = await axios.put(`${API_BASE_URL}/${evaluationID}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating evaluation:', error);
        throw error;
    }
};

// Delete an evaluation
export const deleteEvaluation = async (evaluationID) => {
    if (!evaluationID) {
        throw new Error('Evaluation ID is required to delete.');
    }
    try {
        const response = await axios.delete(`${API_BASE_URL}/${evaluationID}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting evaluation:', error);
        throw error;
    }
};

// Fetch supplier information by ID
export const fetchSupplierById = async (supplierID) => {
    if (!supplierID) {
        throw new Error('Supplier ID is required to fetch supplier information.');
    }
    try {
        const response = await axios.get(`${SUPPLIER_API_BASE_URL}/${supplierID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching supplier information:', error);
        throw error;
    }
};
