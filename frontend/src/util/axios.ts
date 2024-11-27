import { check, getRereshToken } from '@/api/auth';
import { LogoutUser } from '@/state/auth/authSlice';
import store from '@/state/store';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
});



// req interceptor @desc: get accessToken from local storage and set the default headers 
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("__accessToken");
    if (!token) { 
        throw new Error("token not exist"); }
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Authorization'] = `Bearer ${token}`;
    return config
}, error => Promise.reject(error));


axiosInstance.interceptors.response.use(res => res, async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;

        try {
            const { data } = await getRereshToken();
            localStorage.setItem('__accessToken', data.token);
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
            error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
            return axiosInstance(error.config)
        } catch (error) {
            localStorage.removeItem("__accessToken")
            store.dispatch(LogoutUser());
            return Promise.reject(error)
        }

    }
    return Promise.reject(error)
})

export default axiosInstance


