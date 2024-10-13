// components/ErrorPopup.js
import React from 'react';

const ErrorPopup = ({ message }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <div className="fixed bottom-5 right-5 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            <strong>Error: </strong>{message}
        </div>
    );
};

export default ErrorPopup;
