import React from 'react';

const SearchResults = ({ results }) => {
    // Ensure that results is an array and defined
    if (!Array.isArray(results) || results.length === 0) {
        return <p className="text-center">No results found</p>;
    }

    return (
        <ul className="search-results border border-gray-200 rounded shadow-md w-full max-w-lg p-4">
            {results.map((result, index) => (
                <li key={index} className="p-2 border-b last:border-none">
                    {result}
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
