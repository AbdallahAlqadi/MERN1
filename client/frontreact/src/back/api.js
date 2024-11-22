import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5002/api',
})

export const fetchUsers=()=>API.get('./users')
export const posthUsers=()=>API.post('./users')