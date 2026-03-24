import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// Fetch all criteria
export const fetchCriteria = async () => {
  try {
    const response = await api.get('/criteria');
    return response.data;
  } catch (error) {
    console.error('Error fetching criteria:', error);
    throw error;
  }
};

// Fetch a specific criterion by ID
export const fetchCriteriaById = async (criteriaID) => {
  if (!criteriaID) {
    throw new Error('Criteria ID is required to fetch criterion information.');
  }
  try {
    const response = await api.get(`/criteria/${criteriaID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching criterion by ID:', error);
    throw error;
  }
};

// Fetch suppliers
export const fetchSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

// Fetch a specific supplier by ID
export const fetchSupplierById = async (supplierID) => {
  if (!supplierID) {
    throw new Error('Supplier ID is required to fetch supplier information.');
  }
  try {
    const response = await api.get(`/suppliers/${supplierID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier by ID:', error);
    throw error;
  }
};
