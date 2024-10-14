import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Clear error message after 5 seconds
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000); // Change 5000 to the desired number of milliseconds

            // Cleanup the timer on component unmount or when error changes
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        try {
            const response = await axios.post('https://sec-api.knc.lv/api/login', { username, password });//Update server endpoint
            if (response.data.status === "success") {
                setIsLoggedIn(true); // Update the login status
                navigate('/search'); // Navigate to SearchPage on successful login
            } else {
                setIsLoggedIn(false); // Update the login status
                setError(data.message);
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-screen bg-gray-900">
            {/* Error Popup */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    {error}
                </div>
            )}

            {/* Login Form */}
            <div className="w-96 p-8 bg-gray-800 rounded-lg shadow-lg relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Login
                </h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg text-gray-300 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-green"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg text-gray-300 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-green"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring"
                        style={{ color: "#00ff00" }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring mt-2"
                        style={{ color: "#00ff00" }}
                    >
                        Cancel
                    </button>
                </form>
            </div>

            {/* Optional: Background canvas for visual effect */}
            <canvas className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        </div>
    );
};

export default LoginPage;
