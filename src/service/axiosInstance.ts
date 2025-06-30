import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { useTMTStore } from '@/stores/zustand';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
axiosInstance.interceptors.response.use(AxiosLogger.responseLogger);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useTMTStore.getState().user?.token;
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useTMTStore.getState().clearUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
