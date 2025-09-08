import axios from 'axios';
import { getItem, removeItem } from './storage'; //storage utils

const API_BASE_URL = 'https://907778e74f2c.ngrok-free.app/api'; //backend URL

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token before each request
apiClient.interceptors.request.use(async config => {
  try {
    const token = await getItem('authToken'); //from storage.js
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error attaching token:', error);
  }
  return config;
});

// Handle errors (auto logout on 401)
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Clearing token...');
      await removeItem('authToken'); //from storage.js
      //A navigation to login
    }
    return Promise.reject(error);
  },
);

export default apiClient;
