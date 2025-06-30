import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { SpaceGlobal } from '@/types/request-response/space/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import { withPersistentCache } from '@/lib/utils/utils.ts';
import { CreateSpace } from '@/types/request-response/space/ApiRequest.ts';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.SPACE_BASE_URL }),
  endpoints: (builder) => ({
    spaceGlobalApi: builder.query<SpaceGlobal, void>({
      query: () => ({
        url: 'space/global',
      }),
      transformResponse: (response: ApiResponse<SpaceGlobal>) => response.data,
    }),
    createSpace: builder.mutation<string, CreateSpace>({
      query: (data: CreateSpace) => ({
        url: 'space',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
  }),
});

export const { useSpaceGlobalApiQuery, useCreateSpaceMutation } = spaceApi;
