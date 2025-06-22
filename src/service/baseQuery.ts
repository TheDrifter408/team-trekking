import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axiosInstance from '@/service/axiosInstance.ts';
import { API_URLS } from '@/lib/constants';
type AxiosBaseQueryArgs = {
  baseUrl?: string;
};
type AxiosQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};
const axiosBaseQuery =
  (
    { baseUrl }: AxiosBaseQueryArgs = { baseUrl: API_URLS.AUTH_BASE_URL }
  ): BaseQueryFn<AxiosQueryParams, unknown, unknown> =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const fullUrl = baseUrl + url;
      const result = await axiosInstance({
        url: fullUrl,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
