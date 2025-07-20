import axios from 'axios';

// Use environment variable for API URL, fallback to Render backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://appthree.onrender.com';

export const getUsers = () => axios.get(`${API_BASE_URL}/api/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/api/users/create`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/api/users/${id}`);