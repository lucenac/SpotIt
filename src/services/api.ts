import axios from 'axios';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken'); 
  
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/token/', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/usuarios/', {
      name,
      email,
      password,
      is_active: true,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/usuarios/me/');
    return response.data;
  },
};