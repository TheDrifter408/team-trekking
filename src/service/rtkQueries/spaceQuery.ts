import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import {
  SpaceGlobal,
  TagCreateResponse,
  TagListResponse,
  ViewStatusResponse,
} from '@/types/request-response/space/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import {
  CreateSpace,
  CreateSpaceRequest,
  StatusViewRequest,
} from '@/types/request-response/space/ApiRequest.ts';

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
    createStatus: builder.mutation<ViewStatusResponse, StatusViewRequest>({
      query: (data: CreateSpace) => ({
        url: 'space/status',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<ViewStatusResponse>) =>
        response.data,
    }),
    getTags: builder.query<Array<TagListResponse>, number>({
      query: (spaceId: number) => ({
        url: `space/tag/${spaceId}`,
      }),
      transformResponse: (response: ApiResponse<Array<TagListResponse>>) =>
        response.data,
    }),
    createTag: builder.mutation<TagCreateResponse, CreateSpaceRequest>({
      query: (data: CreateSpaceRequest) => ({
        url: 'space/tag',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<TagCreateResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useSpaceGlobalApiQuery,
  useCreateStatusMutation,
  useCreateSpaceMutation,
  useCreateTagMutation,
  useLazyGetTagsQuery,
} = spaceApi;
