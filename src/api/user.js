import axios from 'axios';

const isDev = true;
const baseURL = isDev ? "http://localhost:4000/api" : "https://user-management-server-iejx.onrender.com/api";

const API = axios.create({ baseURL });

export const fetchUsers = (search) => search ? API.get('/user', { params: { search } }) : API.get('/user');
export const getUser = (id) => API.get(`/user/${id}`);
export const createUser = (data) => API.post('/user', data);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/user/${id}`);