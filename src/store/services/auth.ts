import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (credentials) => {
        const response = {
          user: { id: '1', email: credentials.email },
          token: 'mock-jwt-token',
        };

        localStorage.setItem('token', response.token);

        return { data: response };
      },
    }),
    signup: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (credentials) => {
        const response = {
          user: { id: '1', email: credentials.email },
          token: 'mock-jwt-token',
        };

        // Store token in localStorage
        localStorage.setItem('token', response.token);

        return { data: response };
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('theme');
        return { data: undefined };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
