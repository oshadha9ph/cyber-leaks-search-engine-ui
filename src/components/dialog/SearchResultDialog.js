import React, { useState, useEffect } from 'react';
import "./search-result-dialog.css";
import GlobalData from '../global-data/GlobalData.js';
import LocalData from '../local-data/LocalData.js';

const SearchResultDialog = ({ results, isLocal, isOpen, onClose }) => {
    const [localData, setLocalData] = useState([]); // Initialize as array
    const [globalData, setGlobalData] = useState({ local: [], global: [] }); // Initialize with arrays

    useEffect(() => {
        if (isLocal) {
            setLocalData(results.results || []); // Update localData based on isLocal
        } else {
            setGlobalData({
                local: results.local?.results || [],
                global: results.global || [],
            });
        }
    }, [isLocal, results]);

    // Check if there's data to display
    const hasData = isLocal ? localData.length > 0 : globalData.global.length > 0 || globalData.local.length > 0;

    if (!isOpen || !hasData) return null; // Hide dialog if no data or dialog is closed

    return (
        <>
            {/* Overlay and dialog box */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="main-search-dialog relative rounded-lg p-6 bg-gray-800 text-white">
                    
                    {/* Close button */}
                    <button
                        className={`absolute top-2 right-2 text-white text-xl font-bold focus:outline-none ${!isLocal ? 'close-btn' : ''}`}
                        onClick={onClose}
                    >
                        &times;
                    </button>

                    {/* Conditional rendering based on isLocal */}
                    {isLocal ? (
                        <LocalData localData={localData} />
                    ) : (
                        <GlobalData globalData={globalData} />
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchResultDialog;
