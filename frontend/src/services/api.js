import axios from 'axios';

// Get the API URL from environment variables, with a fallback for safety
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: `${API_URL}/api`,
});

// Add a request interceptor to include the auth token in every request
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Auth Services ---
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);

// --- Post Services ---
export const createPost = (postData) => api.post('/posts', postData);
export const getAllPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;