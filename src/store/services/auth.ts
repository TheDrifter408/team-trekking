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

// Mock API that doesn't make actual HTTP requests
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: (credentials) => {
        // Mock successful response
        return {
          data: {
            user: {
              id: '1',
              email: credentials.email,
            },
            token: 'mock-jwt-token',
          },
        };
      },
    }),
    signup: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: (credentials) => {
        // Mock successful response
        return {
          data: {
            user: {
              id: '1',
              email: credentials.email,
            },
            token: 'mock-jwt-token',
          },
        };
      },
    }),
  }),
});