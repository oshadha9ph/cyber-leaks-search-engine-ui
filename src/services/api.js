import axios from 'axios';
import logger from './logger';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://sec-api.knc.lv'; // Add fallback to hardcoded URL

console.log('Base URL:', BASE_URL); // Check if it’s correctly set

export const searchAPI = async (query, queryType) => {
    try {
        const response = await axios.get(`https://sec-api.knc.lv/api/search`, {
            params: { query, queryType },
        });

        return response.data; // Return the data directly
    } catch (error) {
        logger.error(`API error: ${error.message}`);
        // Retry logic
        let retries = 3;
        while (retries > 0) {
            try {
                const response = await axios.get(`https://sec-api.knc.lv/api/search`, {
                    params: { query, queryType },
                });
                return response.data; // Return the data directly
            } catch (err) {
                retries -= 1;
                if (retries === 0) {
                    logger.error(`Retry failed after 3 attempts: ${err.message}`);
                    throw err;
                }
            }
        }
    }
};
