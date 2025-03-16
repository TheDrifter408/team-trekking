import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from '@utils/data2.ts';
import { Workspace } from '@/types/ApiResponse';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getWorkSpaces: builder.query<Workspace[], void>({
      queryFn: async () => {
        return { data: [...data] };
      },
    }),
    getWorkSpace: builder.query<Workspace | null, string>({
      queryFn: async (workspaceId) => {
        const workspace = data.find((workspace: Workspace) => workspace.id === workspaceId) || null;
        return { data: workspace };
      },
    }),

  }),
});

export const { useGetWorkSpacesQuery, useGetWorkSpaceQuery } = mainApi;
