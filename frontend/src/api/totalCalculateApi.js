// src/api/totalCalculateApi.js
import axios from 'axios';

const totalCalculateApi = async () => {
    try {
        // Step 1: Generate criteria comparisons
        await axios.post(`${process.env.REACT_APP_API_URL}/api/criteria-comparison/generate`);
        
        // Step 2: Calculate criteria weights
        await axios.post(`${process.env.REACT_APP_API_URL}/api/criteria-weights/calculate`);
        
        // Step 3: Calculate supplier comparisons
        await axios.post(`${process.env.REACT_APP_API_URL}/api/supplier-comparison/calculate`);
        
        // Step 4: Calculate supplier weights
        await axios.post(`${process.env.REACT_APP_API_URL}/api/supplier-weights/calculate-weight`);
        
        // Step 5: Calculate supplier scores
        await axios.post(`${process.env.REACT_APP_API_URL}/api/supplier-scores/calculate`);
        
        // Return success message after all steps are completed
        return { success: true, message: 'All calculations completed successfully!' };
    } catch (error) {
        console.error('Error in total calculation API:', error);
        
        // Return error message if something went wrong
        return { success: false, message: 'Error occurred during calculations.' };
    }
};

// Export the API function
export { totalCalculateApi };
