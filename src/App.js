import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/search.css'; // Import global styles

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* Use <SearchPage /> */}
        <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* Use <SearchPage /> */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} /> {/* Use <LoginPage /> */}
        <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} /> {/* Use <RegisterPage /> */}
      </Routes>
    </Router>
  );
};

export default App;
