import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from '@utils/data2.ts';
import { workspaces, members } from '@/data/mockData';
import { SpaceItem, Workspace, WorkspaceItem } from '@/types/ApiResponse';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getWorkSpaces: builder.query<WorkspaceItem[], void>({
      queryFn: async () => {
        const enrichedWorkspaces = workspaces.map((workspace) => ({
          ...workspace,
          members: members.filter(
            (member) => member.workspaceId === workspace.id
          ),
        }));
        return { data: enrichedWorkspaces };
      },
    }),
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
          statusType: workspace.taskTypes,
          folders: (space.folders ?? []).map((folder) => ({
            id: folder.id,
            name: folder.name,
            lists: (folder.lists ?? []).map((list) => list.name),
          })),
        })) as SpaceItem[];

        return { data: workspaceItems };
      },
    }),
  }),
});

export const {
  useGetWorkSpacesQuery,
  useLazyGetWorkSpacesQuery,
  useGetWorkSpaceQuery,
  useCreateWorkSpaceMutation,
  useGetWorkspaceItemsQuery,
} = mainApi;
