import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from '@utils/data2.ts';
import { Workspace } from '@/types/ApiResponse';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // query to get all workspaces
    getWorkSpaces: builder.query<Workspace[], void>({
      queryFn: async () => {
        return { data: [...data] };
      },
    }),
    // query to get a single workspace
    getWorkSpace: builder.query<Workspace | null, string>({
      queryFn: async (workspaceId) => {
        const workspace = data.find((workspace: Workspace) => workspace.id === workspaceId) || null;
        return { data: workspace };
      },
    }),
    // mutation to create a new workspace
    createWorkSpace: builder.mutation<Workspace | null, Workspace>({
      queryFn: async (workspace) => {
        const newId = data.length + 1;
        workspace.id = String(newId);
        data.push(workspace as Workspace);
        const newWorkspace = data.find((w) => w.id === String(newId));
        if (newWorkspace) {
          return { data: newWorkspace };
        }
        return { data: null };
      },
    }),
  }),
});

export const { useGetWorkSpacesQuery, useLazyGetWorkSpacesQuery, useGetWorkSpaceQuery, useCreateWorkSpaceMutation } = mainApi;
