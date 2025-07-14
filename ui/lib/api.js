import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/users/create`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);