import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

export const fetchCriteria = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/criteria`);
    return response.data;
  } catch (err) {
    console.error('Error fetching criteria:', err);
    throw err;
  }
};

export const fetchSupplierComparisonByCriterion = async (criterionID) => {
  try {
    const response = await axios.get(`${BASE_URL}/supplier-comparison/${criterionID}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching supplier comparisons:', err);
    throw err;
  }
};
export const fetchWeightsByCriteria = async (criteriaID) => {
  try {
    const response = await axios.get(`${BASE_URL}/supplier-weights/${criteriaID}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching supplier weights:', err);
    throw err;
  }
};
