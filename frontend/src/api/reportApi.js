import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/reports`; // Update if using different base

// Generate a new report
export const generateReport = async (reportData) => {
  try {
    const response = await axios.post(API_BASE_URL, reportData);
    return response.data;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

// Get all saved reports
export const getAllReports = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Get a specific report by ID
export const getReportById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching report with ID ${id}:`, error);
    throw error;
  }
};
