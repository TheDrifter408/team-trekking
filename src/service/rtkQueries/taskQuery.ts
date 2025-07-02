import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import {
  CreateCheckListItemRequest,
  CreateCheckListRequest,
} from '@/types/request-response/task/ApiRequest.ts';
import { CheckList } from '@/types/request-response/task/ApiResponse.ts';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.TASK_BASE_URL }),
  endpoints: (builder) => ({
    createCheckList: builder.mutation<string, CreateCheckListRequest>({
      query: (data: CreateCheckListRequest) => ({
        url: 'task/checklist',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    getChecklist: builder.query<Array<CheckList>, number>({
      query: (taskId: number) => ({
        url: `task/checklist/${taskId}`,
      }),
      transformResponse: (response: ApiResponse<Array<CheckList>>) =>
        response.data,
    }),
    updateChecklist: builder.mutation<ApiResponse<any>, number>({
      query: (checklistId: number) => ({
        url: `task/checklist/${checklistId}`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse<ApiResponse<any>>) =>
        response.data,
    }),
    deleteChecklist: builder.mutation<string, number>({
      query: (checklistId: number) => ({
        url: `task/checklist/${checklistId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    createChecklistItem: builder.mutation<string, CreateCheckListItemRequest>({
      query: (data: CreateCheckListItemRequest) => ({
        url: `task/checklist/item}`,
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    updateChecklistItem: builder.mutation<string, number>({
      query: (checklistItemId: number) => ({
        url: `task/checklist/item/${checklistItemId}`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    deleteChecklistItem: builder.mutation<string, number>({
      query: (checklistItemId: number) => ({
        url: `task/checklist/item/${checklistItemId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
  }),
});

export const {
  useLazyGetChecklistQuery,
  useCreateCheckListMutation,
  useUpdateChecklistMutation,
  useDeleteChecklistMutation,
  useCreateChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
} = taskApi;
