import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.movis.klr.kr', 
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

export default axiosInstance;