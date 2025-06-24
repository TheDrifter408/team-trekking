import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/ApiResponse.ts';
import { SpaceGlobal } from '@/types/request-response/space/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import { withPersistentCache } from '@/lib/utils/utils.ts';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.SPACE_BASE_URL }),
  endpoints: (builder) => ({
    spaceGlobalApi: builder.query<SpaceGlobal, void>({
      query: () => ({
        url: 'space/global',
      }),
      transformResponse: (response: ApiResponse<SpaceGlobal>) => response.data,
      keepUnusedDataFor: 60 * 60 * 24,
      ...withPersistentCache(15),
    }),
  }),
});

export const { useSpaceGlobalApiQuery } = spaceApi;
