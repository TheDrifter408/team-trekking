import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { API_URLS } from '@/lib/constants';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse';
import { ListResponse } from '@/types/request-response/list/ApiResponse';
import { CreateListRequest } from '@/types/request-response/list/ApiRequest';

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.LIST_BASE_URL }),
  endpoints: (builder) => ({
    createList: builder.mutation<ApiResponse<ListResponse>, CreateListRequest>({
      query: (body) => ({
        url: 'list',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});

export const { useCreateListMutation } = listApi;
