import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.movis.klr.kr', 
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default axiosInstance;