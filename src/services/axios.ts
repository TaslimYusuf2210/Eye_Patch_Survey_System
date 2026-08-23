import axios from 'axios';

// Resolve the backend host from the page URL so the API works from any device on
// the network — `localhost` on the dev machine, or the machine's LAN IP when the
// app is opened from a phone/tablet (e.g. http://192.168.0.113:5173).
// Set VITE_BASE_URL in .env to override this (e.g. for production deployments).
const backendBaseURL = import.meta.env.VITE_BASE_URL || `http://${window.location.hostname}:3000`;

const api = axios.create({
  baseURL: backendBaseURL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;        // Must return the config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,                    // Success case

  (error) => {
    let errorMessage = 'An unexpected error occurred';

    // Prefer the backend's specific message when available
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Session expired. Please log in again.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 409:
          errorMessage = 'A conflict occurred. The data may already exist.';
          break;
        case 422:
          errorMessage = 'Validation failed. Please check your input.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later.';
          break;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please try again.';
    } else if (!navigator.onLine) {
      errorMessage = 'No internet connection.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    // Attach clean message to the error object
    error.userMessage = errorMessage;
    console.error('API Error:', errorMessage, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;