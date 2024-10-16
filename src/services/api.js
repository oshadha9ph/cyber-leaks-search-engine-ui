import axios from 'axios';
import logger from './logger';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Add fallback to hardcoded URL
const _URL = 'https://sec-api.knc.lv'; // Add fallback to hardcoded URL //Update server endpoint

console.log('Base URL:', BASE_URL); // Check if it’s correctly set

export const searchAPI = async (query, queryType, searchType) => {
    try {
        const isLocal = searchType === "local";
        let response;

        if (isLocal) {
            const url = `${_URL}/api/search`;
            const params = { query, queryType };
            const newResponse = await axios.get(url, { params });
            return newResponse.data;
        } else {
            const urlLocal = `${_URL}/api/search`;
            const urlGlobal = `${_URL}/api/osint-search?`;
            const paramsLocal = { query, queryType };
            const paramsGlobal = { query, type: queryType };

            // Make API calls for local and global data
            const resLocal = await axios.get(urlLocal, { params: paramsLocal });
            const resGlobal = await axios.get(urlGlobal, { params: paramsGlobal });
            console.log("api local ", resLocal);
            console.log("api osint ", resGlobal);
            // Create the response object here
            return {
                local: resLocal.data,
                osint: resGlobal.data
            };
        }

        // return response; // Return the populated response object
    } catch (error) {
        logger.error(`API error: ${error.message} `);
        // Retry logic
        // let retries = 3;
        // while (retries > 0) {
        //     try {
        //         const url = `${_URL}/api/osint-search?`
        //         const response = await axios.get(url, {
        //             params: { query, type: queryType },
        //         });
        //         return response.data; // Return the data directly
        //     } catch (err) {
        //         retries -= 1;
        //         if (retries === 0) {
        //             logger.error(`Retry failed after 3 attempts: ${err.message} `);
        //             throw err;
        //         }
        //     }
        // }
    }
};
