import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:9091/api',
    headers: {
        'Authorization': localStorage.getItem('jwt')
    }
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwt');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        if (error.response.status === 403) {
            localStorage.removeItem('jwt')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
);

export default instance;