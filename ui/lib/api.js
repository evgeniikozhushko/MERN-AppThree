import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/users/create`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);