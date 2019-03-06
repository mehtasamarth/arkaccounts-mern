import axios from 'axios';

let baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api/"; 
const instance = axios.create({
    baseURL: baseURL 
});

instance.defaults.headers.common['Authorization'] = 'Auth Token'

export default instance;