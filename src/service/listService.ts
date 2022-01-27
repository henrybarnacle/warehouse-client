import axios from 'axios';

export const listService = axios.create({
    baseURL: "http://localhost:3001"
});

