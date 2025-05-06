import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/redux/query/base-query.ts';
import { useTMTStore } from '@/stores/zustand';
import { ApiResponse } from '@/types/props/ApiResponse.ts';
import { OTPRequest, VerifyOtpRequest } from '@/types/props/ApiRequest.ts';

export const tmtApi = createApi({
  reducerPath: 'teamTrekking',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    postRefreshToken: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useTMTStore.getState()?.user?.refreshToken}`,
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: any) => response.data,
    }),
    postSendOtp: builder.mutation<string, OTPRequest>({
      query: (body) => ({
        url: 'otp/send',
        method: 'POST',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    postVerifyOtp: builder.mutation<string, OTPRequest>({
      query: (body) => ({
        url: 'otp/verify',
        method: 'POST',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
  }),
});

export const { usePostSendOtpMutation, usePostVerifyOtpMutation } = tmtApi;
