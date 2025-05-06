import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/redux/query/base-query.ts';
import { useTMTStore } from '@/stores/zustand';
import { ApiResponse, UserResponse } from '@/types/props/ApiResponse.ts';
import {
  CreateUserRequest,
  OTPRequest,
  SigninRequest,
  VerifyOtpRequest,
} from '@/types/props/ApiRequest.ts';

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
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: any) => response.data,
    }),
    postSendOtp: builder.mutation<string, OTPRequest>({
      query: (body) => ({
        url: 'otp/send',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    postVerifyOtp: builder.mutation<string, VerifyOtpRequest>({
      query: (body) => ({
        url: 'otp/verify',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    postCreateUser: builder.mutation<UserResponse, CreateUserRequest>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<UserResponse>) => response.data,
    }),
    postSignIn: builder.mutation<UserResponse, SigninRequest>({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<UserResponse>) => response.data,
    }),
  }),
});

export const {
  usePostSendOtpMutation,
  usePostVerifyOtpMutation,
  usePostCreateUserMutation,
  usePostSignInMutation,
} = tmtApi;
