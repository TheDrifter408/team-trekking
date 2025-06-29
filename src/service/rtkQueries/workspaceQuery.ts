import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import { withPersistentCache } from '@/lib/utils/utils.ts';
import {
  WorkSpaceGlobal,
  WorkSpaceRecent,
} from '@/types/request-response/workspace/ApiResponse';
import { CreateWorkSpace } from '@/types/request-response/workspace/ApiRequest.ts';

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.WORK_SPACE_BASE_URL }),
  endpoints: (builder) => ({
    workspaceGlobal: builder.query<WorkSpaceGlobal, void>({
      query: () => ({
        url: 'workspace/global',
      }),
      transformResponse: (response: ApiResponse<WorkSpaceGlobal>) =>
        response.data,
      keepUnusedDataFor: 60 * 60 * 24,
      ...withPersistentCache(15),
    }),
    workspaceDashBoardRecent: builder.query<Array<WorkSpaceRecent>, void>({
      query: () => ({
        url: 'workspace/dashboard/recents',
      }),
      transformResponse: (response: ApiResponse<Array<WorkSpaceRecent>>) =>
        response.data,
    }),
    createWorkSpace: builder.mutation<any, CreateWorkSpace>({
      query: () => ({
        url: 'workspace',
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
    }),
  }),
});

export const {
  useWorkspaceGlobalQuery,
  useWorkspaceDashBoardRecentQuery,
  useCreateWorkSpaceMutation,
} = workspaceApi;
