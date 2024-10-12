import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate  = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        // You can add login logic here
        console.log('Logging in with:', { username, password });
        // Check credentials

        if (username === 'user' && password === 'userPass') {
            navigate('/search'); // Navigate to SearchPage on successful login
        } else {
            alert('Invalid credentials');
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
                </form>
            </div>

            {/* Optional: Background canvas for visual effect */}
            <canvas className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        </div>
    );
};

export default LoginPage;
