

import React from 'react';
import GlobalDataTable from '../tables/GlobalDataTable.js';
import "./global-data-dialog.css"

const GlobalDataDialog = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null; // Return null if dialog is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div> */}
            <div className="main-global-table rounded-lg p-6 z-10">
                <h2 className="text-lg font-bold text-white mb-4">Results</h2>
                <GlobalDataTable data={data} />
                <button
                    className="relative bg-blue-900 text-neon-green px-8 py-3 mt-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                    onClick={onClose}
                    style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default GlobalDataDialog;