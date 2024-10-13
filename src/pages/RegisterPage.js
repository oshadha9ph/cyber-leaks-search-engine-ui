import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Clear success message after 3 seconds
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 3000); // Change 3000 to the desired number of milliseconds

            // Cleanup the timer on component unmount or when success changes
            return () => clearTimeout(timer);
        }
    }, [success]);

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

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !email) {
            setError('All fields are required');
            return;
        } else {
            try {
                const response = await axios.post('https://sec-api.knc.lv/register', { username, email, password });//Update server endpoint

                if (response.data.status === "success") {
                    setSuccess('User has registered');
                    setIsLoggedIn(false); // Update the login status
                    navigate('/login'); // Navigate to SearchPage on successful login
                } else {
                    setError(response.data.message);
                    setIsLoggedIn(false); // Update the login status
                }
            } catch (error) {
                console.error('Login error:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data.message : error.message);
            }
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

            {/* Register Form */}
            <div className="w-96 p-8 bg-gray-800 rounded-lg shadow-lg relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Register
                </h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg text-gray-300 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-neon-green"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Submit
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

export default RegisterPage;
