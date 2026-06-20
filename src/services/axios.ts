import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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

    if (error.response) {
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