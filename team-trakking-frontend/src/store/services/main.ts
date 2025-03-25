import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { folders, spaces, workspaces, lists } from '@/data/mockData';
import {
  WorkspaceItem,
  WorkspaceDetails,
  SpaceDetails,
  Folder,
  List,
} from '@/types/ApiResponse';
import {
  enrichSpace,
  enrichWorkspace,
  getListWithTasks,
  getFolderWithLists,
} from '@utils/Common.ts';
import {
  CreateSpaceResponse,
  CreateFolderResponse,
  CreateListResponse,
} from '@/types/ApiRequest.ts';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getWorkSpaces: builder.query<WorkspaceItem[], void>({
      queryFn: async () => {
        const enrichedWorkspaces = workspaces
          .map((workspace) => {
            const enriched = enrichWorkspace(workspace.id);
            return enriched ? { ...enriched, members: enriched.members } : null;
          })
          .filter(Boolean);
        return { data: enrichedWorkspaces };
      },
    }),
    getWorkspace: builder.query<WorkspaceDetails | null, number>({
      queryFn: async (workspaceId) => {
        const workspace = enrichWorkspace(workspaceId);
        if (!workspace) return { data: null };

        const workspaceDetails = {
          ...workspace,
          spaces: workspace.spaces.map((space) => {
            const enrichedSpace = enrichSpace(space.id);
            if (!enrichedSpace) return null;

            return {
              ...enrichedSpace,
              folders: enrichedSpace.folders.map((folder) =>
                getFolderWithLists(folder.id)
              ),
              lists: enrichedSpace.lists.map((list) =>
                getListWithTasks(list.id)
              ),
            };
          }),
        };

        return { data: workspaceDetails };
      },
    }),
    getSpace: builder.query<SpaceDetails | null, number>({
      queryFn: async (spaceId) => {
        const space = enrichSpace(spaceId);
        if (!space) return { data: null };

        return { data: space };
      },
    }),
    createSpace: builder.mutation<SpaceDetails, CreateSpaceResponse>({
      queryFn: async ({ workspaceId, spaceName }: CreateSpaceResponse) => {
        const newSpace = {
          id: spaces.length + 1, // New ID based on the current length of spaces
          workspaceId: workspaceId,
          name: spaceName,
          color: '',
        };
        spaces.push(newSpace);

        return { data: newSpace };
      },
    }),
    createFolder: builder.mutation<Folder, CreateFolderResponse>({
      queryFn: async (body: CreateFolderResponse) => {
        const maxId = Math.max(...folders.map((folder) => folder.id), 0);
        const newFolder: Folder = {
          id: maxId + 1,
          name: body.folderName,
          spaceId: body.spaceId,
          color: body.color,
          folderStatusId: 1,
        };
        folders.push(newFolder);
        return { data: newFolder };
      },
    }),
    createList: builder.mutation<List, CreateListResponse>({
      queryFn: async (body: CreateListResponse) => {
        const maxId = Math.max(...lists.map((list) => list.id), 0);
        const newList: List = {
          id: maxId,
          name: body.listName,
          parentId: Number(body.parentId),
          parentType: body.parentType === 'space' ? 'space' : 'folder',
        };
        lists.push(newList);
        return { data: newList };
      },
    }),
  }),
});

export const {
  useGetWorkSpacesQuery,
  useGetWorkspaceQuery,
  useGetSpaceQuery,
  useCreateSpaceMutation,
  useCreateFolderMutation,
  useCreateListMutation,
} = mainApi;
