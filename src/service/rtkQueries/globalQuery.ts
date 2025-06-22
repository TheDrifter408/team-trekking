import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/ApiResponse.ts';
import { WorkSpaceGlobal } from '@/types/request-response/workspace/ApiRessponse.ts';
import { API_URLS } from '@/lib/constants';

export const globalApi = createApi({
  reducerPath: 'globalApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.WORK_SPACE_BASE_URL }),
  endpoints: (builder) => ({
    workspaceGlobalApi: builder.query<WorkSpaceGlobal, void>({
      query: () => ({
        url: 'workspace/global',
      }),
      transformResponse: (response: ApiResponse<WorkSpaceGlobal>) =>
        response.data,
      keepUnusedDataFor: 60 * 60 * 24,
    }),
  }),
});

export const { useWorkspaceGlobalApiQuery } = globalApi;
