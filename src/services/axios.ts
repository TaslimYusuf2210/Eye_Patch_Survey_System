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

    if (error.response?.data) {
      const data = error.response.data;

      // Handle your backend's error format
      if (data.message) {
        errorMessage = data.message;
      } else if (typeof data === 'string') {
        errorMessage = data;
      } else if (data.error) {
        errorMessage = data.error;
      }
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