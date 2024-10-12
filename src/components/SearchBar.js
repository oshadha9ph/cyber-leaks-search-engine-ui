// components/SearchBar.js
import React, { useState, useEffect } from 'react';
import SuggestionList from './SuggestionList';
import { sanitizeInput } from '../utils/security';
import { searchAPI } from '../services/api'; // Import the Axios-based API function

const SearchBar = ({ query, setQuery, queryType, setQueryType, onSearch, loading }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null); // State to store errors

    // Fetch search suggestions using searchAPI
    const fetchSuggestions = async (searchTerm) => {
        try {
            const response = await searchAPI(searchTerm, queryType); // Use the Axios API function
            setSuggestions(response.data); // Axios stores the response data in `response.data`
        } catch (err) {
            console.error('Failed to fetch suggestions:', err);
            setError('Failed to load suggestions. Please try again later.');
        }
    };

    useEffect(() => {
        if (query.length > 2) {
            fetchSuggestions(sanitizeInput(query)); // Fetch suggestions after 2 characters
        } else {
            setSuggestions([]);
            setError(null); // Reset error when query is cleared
        }
    }, [query, queryType]);

    return (
        <div className="flex flex-col items-center mb-4">
            {/* Query Type Selector */}
            <select
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
                className="mb-2 border border-gray-300 rounded p-2"
            >
                <option value="email">Email</option>
                <option value="username">Username</option>
                <option value="password">Password</option>
                <option value="address">Address</option>
                <option value="phone">Phone</option>
                <option value="ip">IP</option>
            </select>

            {/* Search Input and Button */}
            <div className="relative w-full max-w-lg">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(sanitizeInput(e.target.value))}
                    placeholder="Search..."
                    className="border border-gray-300 rounded w-full p-3 mb-2"
                />
                <button
                    onClick={onSearch}
                    className="bg-blue-500 text-white p-2 rounded absolute right-2 top-2"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {/* Display Error Message if there's an error */}
            {error && <div className="text-red-500 mt-2">{error}</div>}

            {/* Suggestion List */}
            <SuggestionList suggestions={suggestions} />
        </div>
    );
};

export default SearchBar;
