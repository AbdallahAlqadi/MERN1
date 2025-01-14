import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5002/api',
})

export const fetchUsers=()=>API.get('./users')
export const adduser=(userData)=>API.post('./users',userData)

export const deleteUser=(id)=>API.delete(`./users/${id}`);
export const updateUser = (id, data) => API.put(`./users/update/${id}`, data);



