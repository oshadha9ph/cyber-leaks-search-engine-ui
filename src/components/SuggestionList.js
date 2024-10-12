import React from 'react';

const SuggestionList = ({ suggestions }) => {
    // Ensure that suggestions is always an array and not undefined
    if (!Array.isArray(suggestions) || suggestions.length === 0) return null;

    return (
        <ul className="suggestion-list border border-gray-200 rounded shadow-md w-full max-w-lg p-2">
            {suggestions.map((suggestion, index) => (
                <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                    {suggestion}
                </li>
            ))}
        </ul>
    );
};

export default SuggestionList;
