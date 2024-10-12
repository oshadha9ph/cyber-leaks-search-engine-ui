import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ErrorBoundary component to catch runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details (send to analytics service if required)
    console.error("ErrorBoundary caught an error", error, errorInfo);
    // Example: send to an external logging service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Send performance metrics to an analytics service or log to console
//reportWebVitals(console.log);

// Optionally, you can send performance data to an external service
// reportWebVitals((metric) => {
//   if (process.env.NODE_ENV === 'production') {
//     // Send metric data to your analytics endpoint
//     console.log('Analytics metric:', metric);
//     // Example: sendPerformanceMetricsToServer(metric);
//   }
// });
