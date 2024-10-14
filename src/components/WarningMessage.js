import React, { useEffect, useState } from 'react';

const WarningMessage = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // Hide after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    if (!visible) return null; // If not visible, render nothing

    return (
        <div className="fixed bottom-5 right-5 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            <strong>Warning: </strong>{message}
        </div>
    );
};

export default WarningMessage;