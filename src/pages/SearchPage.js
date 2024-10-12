import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import SearchResults from '../components/SearchResults';
import ErrorAlert from '../components/ErrorAlert';
import { searchAPI } from '../services/api';
import logger from '../services/logger';
import { validateEmail, validateIP } from '../utils/validations';
import ErrorPopup from '../components/ErrorPopup'; // Assuming you have an ErrorPopup component

const SearchPage = () => {
    const buttonRef = useRef(null);
    const searchBoxRef = useRef(null);
    const dropdownRef = useRef(null);
    const canvasRef = useRef(null); // For 3D background
    const loadingCanvasRef = useRef(null); // For loading animation

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('email');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false); // To control the floating animation
    const [searchType, setSearchType] = useState('local'); // Default to local search

    // Animation: Search Box, Button, and Dropdown
    useEffect(() => {
        gsap.fromTo(buttonRef.current, { scale: 1 }, {
            scale: 1.1,
            duration: 0.5,
            paused: true,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut',
        });
    }, []);

    useEffect(() => {
        gsap.fromTo(searchBoxRef.current, { scale: 1 }, {
            scale: 1.05,
            duration: 0.5,
            paused: true,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut',
        });
    }, []);

    useEffect(() => {
        const button = buttonRef.current;

        // Hover animation
        const hoverAnim = gsap.to(button, {
            scale: 1.1,
            boxShadow: '0px 0px 20px #00ff00', // Neon green glow
            paused: true,
            duration: 0.3,
            ease: 'power1.out',
        });

        // Hover in and out actions
        button.addEventListener('mouseenter', () => hoverAnim.play());
        button.addEventListener('mouseleave', () => hoverAnim.reverse());

        // Click animation
        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        // Cleanup listeners on unmount
        return () => {
            button.removeEventListener('mouseenter', () => hoverAnim.play());
            button.removeEventListener('mouseleave', () => hoverAnim.reverse());
            button.removeEventListener('mousedown', () => { });
            button.removeEventListener('mouseup', () => { });
        };
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        const searchBox = searchBoxRef.current;
        const dropdown = dropdownRef.current;

        // Hover animation for search button
        const hoverAnimButton = gsap.to(button, {
            scale: 1.1,
            boxShadow: '0px 0px 20px #00ff00', // Neon green glow
            paused: true,
            duration: 0.3,
            ease: 'power1.out',
        });

        // Hover in and out actions for the button
        button.addEventListener('mouseenter', () => hoverAnimButton.play());
        button.addEventListener('mouseleave', () => hoverAnimButton.reverse());

        // Click animation for search button
        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        // Hover animation for search box
        const hoverAnimSearchBox = gsap.to(searchBox, {
            scale: 1.05,
            boxShadow: '0px 0px 20px #00ff00', // Neon green glow
            paused: true,
            duration: 0.3,
            ease: 'power1.out',
        });

        // Hover in and out actions for search box
        searchBox.addEventListener('mouseenter', () => hoverAnimSearchBox.play());
        searchBox.addEventListener('mouseleave', () => hoverAnimSearchBox.reverse());

        // Click animation for search box
        searchBox.addEventListener('mousedown', () => {
            gsap.to(searchBox, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        searchBox.addEventListener('mouseup', () => {
            gsap.to(searchBox, {
                scale: 1.05,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        // Hover animation for options dropdown
        const hoverAnimDropdown = gsap.to(dropdown, {
            scale: 1.05,
            boxShadow: '0px 0px 20px #00ff00', // Neon green glow
            paused: true,
            duration: 0.3,
            ease: 'power1.out',
        });

        // Hover in and out actions for the dropdown
        dropdown.addEventListener('mouseenter', () => hoverAnimDropdown.play());
        dropdown.addEventListener('mouseleave', () => hoverAnimDropdown.reverse());

        // Click animation for dropdown
        dropdown.addEventListener('mousedown', () => {
            gsap.to(dropdown, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        dropdown.addEventListener('mouseup', () => {
            gsap.to(dropdown, {
                scale: 1.05,
                duration: 0.1,
                ease: 'power1.inOut',
            });
        });

        // Cleanup listeners on unmount
        return () => {
            button.removeEventListener('mouseenter', () => hoverAnimButton.play());
            button.removeEventListener('mouseleave', () => hoverAnimButton.reverse());
            button.removeEventListener('mousedown', () => { });
            button.removeEventListener('mouseup', () => { });

            searchBox.removeEventListener('mouseenter', () => hoverAnimSearchBox.play());
            searchBox.removeEventListener('mouseleave', () => hoverAnimSearchBox.reverse());
            searchBox.removeEventListener('mousedown', () => { });
            searchBox.removeEventListener('mouseup', () => { });

            dropdown.removeEventListener('mouseenter', () => hoverAnimDropdown.play());
            dropdown.removeEventListener('mouseleave', () => hoverAnimDropdown.reverse());
            dropdown.removeEventListener('mousedown', () => { });
            dropdown.removeEventListener('mouseup', () => { });
        };
    }, []);


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        if (!dropdownOpen) {
            gsap.to(dropdownRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                onStart: () => {
                    dropdownRef.current.style.display = "block";
                },
            });
        } else {
            gsap.to(dropdownRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => {
                    dropdownRef.current.style.display = "none";
                },
            });
        }
    };

    // Search API Request
    const handleSearch = useCallback(async () => {
        let isValid = true;

        // Check for an empty search field
        if (!query.trim()) {
            setError('Search field cannot be empty.');
            setTimeout(() => setError(null), 2000);
            isValid = false;
        }
        // Perform validation based on the selected option
        else if (selectedOption === 'email' && !validateEmail(query)) {
            setError('Invalid email format');
            setTimeout(() => setError(null), 2000);
            isValid = false;
        } else if (selectedOption === 'IP' && !validateIP(query)) {
            setError('Invalid IP address');
            setTimeout(() => setError(null), 2000);
            isValid = false;
        } else if (selectedOption === 'Phone Number' && !validatePhoneNumber(query)) {
            setError('Invalid phone number format. Make sure it includes the country code.');
            setTimeout(() => setError(null), 2000);
            isValid = false;
        } else {
            setError(''); // Clear error if valid
        }

        if (!isValid) return; // Stop search if validation fails

        setMoveToTop(true); // Move elements to top
        try {
            setLoading(true);
            const res = await searchAPI(query, selectedOption, searchType); // Pass the search type to API
            setResults(res.data);
        } catch (err) {
            logger.error(`Error in search: ${err.message}`);
            setError('An error occurred while fetching search results.');
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false);
        }
    }, [query, selectedOption, searchType]);

    // Handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Set the selected option
        toggleDropdown(); // Close the dropdown after selection
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-screen bg-gray-900">
            {/* Error Popup */}
            {error && <ErrorPopup message={error} />}

            {/* Popup loading animation */}
            {loading && (
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
                        <canvas ref={loadingCanvasRef} className="mx-auto"></canvas>
                        <p className="text-gray-300 text-center mt-2">Loading...</p>
                    </div>
                </div>
            )}

            {/* Top Login & Register Buttons */}
            <div className="relative flex flex-col justify-center items-center h-screen bg-gray-900">

                {/* Login and Register Buttons at the Top-Right Corner with same style and animation */}
                <div className="absolute top-4 right-4 space-x-4">
                    <button
                        ref={buttonRef}  // Reusing the same ref for the animation
                        className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                        style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                    >
                        Login
                    </button>
                    <button
                        ref={buttonRef}  // Reusing the same ref for the animation
                        className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                        style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                    >
                        Register
                    </button>
                </div>

                {/* Error Popup - Positioned at the Bottom-Right Corner */}
                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                        <ErrorPopup message={error} />
                    </div>
                )}
            </div>

            {/* Cybersecurity 3D view canvas */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>

            {/* Topic Heading */}
            <div className={`transition-all duration-700 ease-in-out ${moveToTop ? 'mt-6' : 'mt-32'} w-full flex flex-col items-center`}>
                <h1 className="text-3xl font-bold mb-4 text-center text-white relative z-10">
                    Cyber Leaks Search Engine
                </h1>

                {/* Search Input and Dropdown */}
                <div className={`flex space-x-4 items-start ${moveToTop ? 'mt-2' : 'mt-10'} relative z-10`}>
                    <div className="relative w-48">
                        <div
                            className="px-4 py-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            {selectedOption}
                        </div>

                        <ul
                            ref={dropdownRef}
                            className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg opacity-0 overflow-hidden"
                            style={{ display: "none", height: 0, maxHeight: '200px', overflowY: 'auto' }}
                        >
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("email")}
                            >
                                Email
                            </li>
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("IP")}
                            >
                                IP
                            </li>
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("Username")}
                            >
                                Username
                            </li>
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("Password")}
                            >
                                Password
                            </li>
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("Phone Number")}
                            >
                                Phone Number
                            </li>
                            <li
                                className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleOptionSelect("Address")}
                            >
                                Address
                            </li>
                        </ul>
                    </div>

                    {/* Search bar */}
                    <input
                        ref={searchBoxRef}
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-3 rounded-lg text-gray-300 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-green w-64"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Search button */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                            onClick={handleSearch}
                            style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Local/Global Search Toggle */}
                <div className="flex items-center mt-4 text-white">
                    <label className="mr-4">Search Type:</label>
                    <div className="flex items-center space-x-2">
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="local"
                                checked={searchType === 'local'}
                                onChange={(e) => setSearchType(e.target.value)}  // Fix: Ensure value is updated correctly
                                className="mr-2"
                            />
                            Local Search
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="global"
                                checked={searchType === 'global'}
                                onChange={(e) => setSearchType(e.target.value)}  // Fix: Ensure value is updated correctly
                                className="mr-2"
                            />
                            Global Search
                        </label>
                    </div>
                </div>

            </div>

            {/* Display Search Results */}
            <div className="mt-10">
                {results.length > 0 && <SearchResults results={results} />}
            </div>
        </div>
    );
};

export default SearchPage;
