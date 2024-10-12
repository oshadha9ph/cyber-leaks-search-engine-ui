import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import './styles/search.css'; // Import global styles

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} /> {/* Use <SearchPage /> */}
        <Route path="/search" element={<SearchPage />} /> {/* Use <SearchPage /> */}
        <Route path="/login" element={<LoginPage />} /> {/* Use <LoginPage /> */}
      </Routes>
    </Router>
  );
};

export default App;
