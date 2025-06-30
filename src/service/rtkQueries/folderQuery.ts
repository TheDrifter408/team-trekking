import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/service/baseQuery.ts';
import { CreateFolderRequest } from '@/types/request-response/folder/ApiRequest.ts';
import { Folder } from '@/types/request-response/folder/ApiResponse.ts';
import { API_URLS } from '@/lib/constants';
import { ApiResponse } from '@/types/request-response/auth/ApiResponse';

export const folderApi = createApi({
  reducerPath: 'folderApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URLS.FOLDER_BASE_URL }),
  endpoints: (builder) => ({
    createFolder: builder.mutation<ApiResponse<Folder>, CreateFolderRequest>({
      query: (body) => ({
        url: 'folder',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});

export const { useCreateFolderMutation } = folderApi;
