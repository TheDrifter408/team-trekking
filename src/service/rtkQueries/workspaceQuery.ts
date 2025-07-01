import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import { withPersistentCache } from '@/lib/utils/utils.ts';
import {
  WorkSpaceGlobal,
  WorkSpaceRecent,
  WorkSpaceCreated,
  WorkSpaceResponse,
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
    getWorkSpace: builder.query<Array<WorkSpaceResponse>, void>({
      query: () => ({
        url: 'workspace',
      }),
      transformResponse: (response: ApiResponse<Array<WorkSpaceResponse>>) =>
        response.data,
    }),
    createWorkSpace: builder.mutation<WorkSpaceCreated, CreateWorkSpace>({
      query: (body: CreateWorkSpace) => ({
        url: 'workspace',
        method: 'POST',
        data: body,
      }),
      transformResponse: (response: ApiResponse<WorkSpaceCreated>) =>
        response.data,
    }),
  }),
});

export const {
  useWorkspaceGlobalQuery,
  useWorkspaceDashBoardRecentQuery,
  useGetWorkSpaceQuery,
  useCreateWorkSpaceMutation,
} = workspaceApi;
