import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import SearchResults from '../components/SearchResults';
import { searchAPI } from '../services/api';
import logger from '../services/logger';
import { validateEmail, validateIP, validatePhoneNumber } from '../utils/validations';
import ErrorPopup from '../components/ErrorPopup'; // Assuming you have an ErrorPopup component
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';


const SearchPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const buttonRef = useRef(null);
    const searchBoxRef = useRef(null);
    const dropdownRef = useRef(null);
    const canvasRef = useRef(null); // For 3D background
    const loadingCanvasRef = useRef(null); // For loading animation

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Email');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false); // To control the floating animation
    const [searchType, setSearchType] = useState('local'); // Default to local search

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

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
        setDropdownOpen(prev => !prev);
    };
    // Search API Request
    const handleSearch = useCallback(async () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
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

            let formattedOption;
            switch (selectedOption) {
                case "IP":
                    formattedOption = "ip"
                    break;
                case "Username":
                    formattedOption = "username"
                    break;
                case "Password":
                    formattedOption = "password"
                    break;
                case "Address":
                    formattedOption = "address"
                    break;
                case "Phone Number":
                    formattedOption = "phone"
                    break;
                case "Email":
                    formattedOption = "email"
                    break;
            }


            if (searchType === "global") {
                if (formattedOption === "ip" || formattedOption === "password" || formattedOption === "address") {
                    setError(`Selected type of "${selectedOption}" is not available for Global search at the moment`);
                    setTimeout(() => setError(null), 2000);
                    isValid = false;
                }
            }

            if (!isValid) return; // Stop search if validation fails

            setMoveToTop(true); // Move elements to top

            try {
                setLoading(true);
                try {
                    const res = await searchAPI(query, formattedOption, searchType); // Pass the search type to API
                    setResults(res);
                } catch (error) {
                    console.error('error:', error.message);
                    setError(error.response ? error.response.data.message : error.message);
                }

            } catch (err) {
                logger.error(`Error in search: ${err.message}`);
                setError('An error occurred while fetching search results.');
                setTimeout(() => setError(null), 3000);
            } finally {
                setLoading(false);
            }
        }
    }, [query, selectedOption, searchType, isLoggedIn, selectedOption]);

    // Handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Set the selected option
        toggleDropdown(); // Close the dropdown after selection
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Update the login status
        navigate('/'); // Navigate to SearchPage on logout
    }


    const handleChange = (event) => {
        setResults([]);
        setSearchType(event.target.value);
    };

    return (
        <div className="main relative flex flex-col justify-center items-center h-screen bg-gray-900">
            {/* Error Popup */}
            {error && <ErrorPopup message={error} />}

            {/* Popup loading animation */}
            {loading && (
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="flex flex-col items-center">
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="dark" />
                        <p className="text-gray-300 text-lg text-center mt-3">Loading...</p>
                    </div>
                </div>
            )}

            {/* Login and Register Buttons at the Top-Right Corner */}
            <div className="absolute top-4 right-4 space-x-4">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                        style={{ position: "relative", zIndex: 2, color: "#00ff00" }}>
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                            style={{ position: "relative", zIndex: 2, color: "#00ff00" }}>
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            // ref={buttonRef}  // Reusing the same ref for the animation
                            className="relative bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                            style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>

            {/* Error Popup - Positioned at the Bottom-Right Corner */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    <ErrorPopup message={error} />
                </div>
            )}

            {/* Cybersecurity 3D view canvas */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>

            {/* Topic Heading */}
            <div className={`transition-all duration-700 ease-in-out ${moveToTop ? 'mt-6' : 'mt-32'} w-full flex flex-col items-center`}>
                <h1 className="text-3xl font-bold mb-4 text-center text-white relative z-10">
                    Cyber Leaks Search Engine
                </h1>

                {/* Search Input and Dropdown */}
                <div className={`flex space-x-4 items-start ${moveToTop ? 'mt-2' : 'mt-10'} relative z-auto`}>
                    <div className="relative w-48">
                        <div
                            className="px-4 py-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            {selectedOption}
                        </div>

                        <ul
                            ref={dropdownRef}
                            className={`absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 ${dropdownOpen ? 'opacity-100' : 'opacity-0 overflow-hidden'}`}
                        >
                            {['Email', 'IP', 'Username', 'Password', 'Phone Number', 'Address'].map(option => (
                                <li
                                    key={option}
                                    className="px-4 py-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Search bar and button */}
                    {/* ... search bar and button elements */}

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
                <div className="flex items-center mt-4 text-white z-10">
                    <label className="mr-4">Search Type:</label>
                    <div className="flex items-center space-x-2">
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="local"
                                checked={searchType === 'local'}
                                onChange={handleChange}  // Fix: Ensure value is updated correctly
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
                                onChange={handleChange}  // Fix: Ensure value is updated correctly
                                className="mr-2"
                            />
                            Global Search
                        </label>
                    </div>
                </div>

            </div>

            {/* Display Search Results */}
            <div className="mt-10  result-main">
                {results && (((!Array.isArray(results) && ((Array.isArray(results.results) && results.results.length > 0)) || ((results.local && Array.isArray(results.local.results) && results.local.results.length > 0) || (Array.isArray(results.global) && results.global.length > 0))))
                    || (Array.isArray(results) && results.length > 0)) && <SearchResults results={results} isLocal={searchType === "local" ? true : false} />}
            </div>
        </div>

    );
};

export default SearchPage;
