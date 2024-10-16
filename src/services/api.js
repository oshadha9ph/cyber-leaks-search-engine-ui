import axios from 'axios';
import logger from './logger';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Add fallback to hardcoded URL
const _URL = 'http://localhost:5000'; // Add fallback to hardcoded URL //Update server endpoint

console.log('Base URL:', BASE_URL); // Check if it’s correctly set

export const searchAPI = async (query, queryType, searchType) => {
    try {
        const isLocal = searchType === "local" ? true : false;
        let response;
        let url;
        let params = {};
        if (isLocal) {
            url = `${_URL}/api/search`;
            params = { query, queryType }
            const newResponse = await axios.get(url, { params });
            response = newResponse.data;
        } else {
            const urlLocal = `${_URL}/api/search`;
            const urlGlobal = `${_URL}/api/osint-search?`;
            const paramsLocal = { query, queryType }
            const paramsGlobal = { query, type: queryType }
            const resLocal = await axios.get(urlLocal, { params: paramsLocal });
            const resGlobal = await axios.get(urlGlobal, { params: paramsGlobal });
            const objResponse = {
                local: resLocal.data,
                global: resGlobal.data
            }
            response = objResponse;
        }

        return response; // Return the data directly
    } catch (error) {
        logger.error(`API error: ${error.message} `);
        // Retry logic
        let retries = 3;
        while (retries > 0) {
            try {
                const url = `${_URL} /api/osint - search ? `
                const response = await axios.get(url, {
                    params: { query, type: queryType },
                });
                return response.data; // Return the data directly
            } catch (err) {
                retries -= 1;
                if (retries === 0) {
                    logger.error(`Retry failed after 3 attempts: ${err.message} `);
                    throw err;
                }
            }
        }
    }
};
