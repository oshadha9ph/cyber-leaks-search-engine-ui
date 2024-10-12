// services/logger.js
const logger = {
    info: (message) => {
        if (process.env.NODE_ENV === 'production') {
            // Send logs to a logging service like Datadog, Loggly, etc.
        } else {
            console.info(message);
        }
    },
    error: (message) => {
        if (process.env.NODE_ENV === 'production') {
            // Send error logs to a logging service
        } else {
            console.error(message);
        }
    },
};

export default logger;
