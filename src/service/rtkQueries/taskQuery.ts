import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import {
  CreateCheckListItemRequest,
  CreateCheckListRequest,
  CreateTaskRequest,
  UpdateCheckListItemRequest,
  updateChecklistRequest,
  UpdateTask,
} from '@/types/request-response/task/ApiRequest.ts';
import {
  CheckList,
  CreateTaskResponse,
  Task,
} from '@/types/request-response/task/ApiResponse.ts';

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
    updateChecklist: builder.mutation<ApiResponse<any>, updateChecklistRequest>(
      {
        query: (data: updateChecklistRequest) => ({
          url: `task/checklist/${data.id}`,
          method: 'PATCH',
          data,
        }),
        transformResponse: (response: ApiResponse<ApiResponse<any>>) =>
          response.data,
      }
    ),
    deleteChecklist: builder.mutation<string, number>({
      query: (checklistId: number) => ({
        url: `task/checklist/${checklistId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    createChecklistItem: builder.mutation<string, CreateCheckListItemRequest>({
      query: (data: CreateCheckListItemRequest) => ({
        url: `task/checklist/item`,
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
    updateChecklistItem: builder.mutation<string, UpdateCheckListItemRequest>({
      query: (data: UpdateCheckListItemRequest) => ({
        url: `task/checklist/item/${data.id}`,
        method: 'PATCH',
        data,
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
    createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
      query: (data: CreateTaskRequest) => ({
        url: 'task',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<CreateTaskResponse>) =>
        response.data,
    }),
    getTask: builder.query<Task, number>({
      query: (taskId: number) => ({
        url: `task/${taskId}`,
      }),
      transformResponse: (response: ApiResponse<Task>) => response.data,
    }),
    updateTask: builder.mutation<Task, UpdateTask>({
      query: (updateTask: UpdateTask) => ({
        url: `task/${updateTask.id}`,
        data: updateTask,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse<Task>) => response.data,
    }),
    getSubtasks: builder.query<Task[], number>({
      query: (taskId: number) => ({
        url: `task/${taskId}/sub-task`,
      }),
      transformResponse: (response: ApiResponse<Task[]>) => response.data,
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
  useCreateTaskMutation,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useGetSubtasksQuery,
} = taskApi;
