// App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/search.css'; // Import global styles

// Dynamically load SearchPage (Code Splitting)
const SearchPage = React.lazy(() => import('./pages/SearchPage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Suspense fallback is shown while loading the lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
