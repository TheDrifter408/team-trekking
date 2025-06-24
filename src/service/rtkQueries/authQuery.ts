import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { useTMTStore } from '@/stores/zustand';
import {
  ApiResponse,
  UserResponse,
} from '@/types/request-response/ApiResponse.ts';
import {
  CreateUserRequest,
  OTPRequest,
  SigninRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
} from '@/types/request-response/ApiRequest.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
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
    postForgotPassword: builder.mutation<string, ForgotPasswordRequest>({
      query: (body) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
  }),
});

export const {
  usePostSendOtpMutation,
  usePostVerifyOtpMutation,
  usePostCreateUserMutation,
  usePostSignInMutation,
  usePostForgotPasswordMutation,
} = authApi;
