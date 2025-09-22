import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Axios-Retry
axiosRetry(api, {
  retries: 3, // Retry up to 3 times
  retryDelay: retryCount => retryCount * 2000, // Backoff: 2s, 4s, 6s
  retryCondition: error => {
    // Retry only on network errors or 5xx errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status >= 500
    );
  },
});

export default api;

// Example API calls
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async userData => {
  const response = await api.post('/users', userData);
  return response.data;
};
