import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axiosInstance from '@/service/axiosInstance.ts';
import { App } from "@/lib/constants/app.ts";
type AxiosQueryParams = {
  url: string;
  baseUrl?: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};
const axiosBaseQuery =
  () // { baseUrl }: AxiosBaseQueryArgs = { baseUrl: AppConstants.AUTH_BASE_URL }
  : BaseQueryFn<AxiosQueryParams, unknown, unknown> =>
  async ({ baseUrl = App.AUTH_BASE_URL, url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
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
