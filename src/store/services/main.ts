import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from '@utils/data2.ts';
import { SpaceItem, Workspace } from '@/types/ApiResponse';


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
        const workspace =
          data.find((workspace: Workspace) => workspace.id === workspaceId) ||
          null;
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

    getWorkspaceItems: builder.query<SpaceItem[], string>({
      queryFn: async (workspaceId: string): Promise<{ data: SpaceItem[] }> => {
        const workspace = data.find((ws) => ws.id === workspaceId);
        if (!workspace) return { data: [] }; // Always return an array

        const workspaceItems = (workspace.spaces ?? []).map((space) => ({
          workspaceName: workspace.name,
          id: space.id,
          name: space.name,
          folders: (space.folders ?? []).map((folder) => ({
            id: folder.id,
            name: folder.name,
            lists: (folder.lists ?? []).map(list => list.name),
          })),
        })) as SpaceItem[];

        return { data: workspaceItems };
      },
    })

  }),
});

export const {
  useGetWorkSpacesQuery,
  useLazyGetWorkSpacesQuery,
  useGetWorkSpaceQuery,
  useCreateWorkSpaceMutation,
  useGetWorkspaceItemsQuery
} = mainApi;
