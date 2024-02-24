import axios, { AxiosHeaders } from 'axios';
import { apiUrl } from './constants';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    const lang = store.getState().users.lang;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    headers.set('lang', lang);
    return config;
  });
};

const axiosApi = axios.create({
  baseURL: 'http://161.35.147.84:8000',
});

export default axiosApi;
