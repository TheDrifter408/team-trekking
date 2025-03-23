import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from '@utils/data2.ts';
import {
  workspaces,
  members,
  spaces,
  folders,
  lists,
  folderStatus,
  statuses,
  tasks,
  checklist,
} from '@/data/mockData';
import {
  SpaceItem,
  Workspace,
  WorkspaceItem,
  WorkspaceDetails,
  SpaceDetails,
} from '@/types/ApiResponse';

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
    getWorkspace: builder.query<WorkspaceDetails | null, number>({
      queryFn: async (workspaceId) => {
        const workspace = workspaces.find((w) => w.id === workspaceId);
        if (!workspace) return { data: null };

        const workspaceMembers = members.filter(
          (m) => m.workspaceId === workspaceId
        );
        const workspaceSpaces = spaces.filter(
          (s) => s.workspaceId === workspaceId
        );

        const workspaceDetails = {
          ...workspace,
          members: workspaceMembers,
          spaces: workspaceSpaces.map((space) => {
            const spaceFolders = folders.filter((f) => f.spaceId === space.id);
            const spacesLists = lists.filter(
              (l) => l.parentId === space.id && l.parentType === 'space'
            );
            return {
              ...space,
              folders: spaceFolders.map((folder) => {
                const status = folderStatus.find(
                  (fs) => fs.id === folder.folderStatusId
                );
                const folderLists = lists.filter(
                  (l) => l.parentId === folder.id && l.parentType === 'folder'
                );

                return {
                  ...folder,
                  status: status || { id: 0, color: '', name: 'Undefined' },
                  lists: folderLists.map((list) => {
                    const listStatus = statuses.find(
                      (s) => s.id === list.statusId
                    );
                    const listTasks = tasks.filter((t) => t.listId === list.id);
                    return {
                      ...list,
                      status: listStatus || {
                        id: 0,
                        serialId: 0,
                        name: 'Undefined',
                        color: '',
                      },
                      tasks: listTasks.map((task) => {
                        const taskChecklist = checklist.filter(
                          (c) =>
                            c.parentId === task.id && c.parentType === 'task'
                        );
                        return {
                          ...task,
                          checklist: taskChecklist,
                        };
                      }),
                    };
                  }),
                };
              }),
              lists: spacesLists.map((list) => {
                const listStatus = statuses.find((s) => s.id === list.statusId);
                const listTasks = tasks.filter((t) => t.listId === list.id);
                return {
                  ...list,
                  status: listStatus || {
                    id: 0,
                    serialId: 0,
                    name: 'Undefined',
                    color: '',
                  },
                  tasks: listTasks.map((task) => {
                    const taskChecklist = checklist.filter(
                      (c) => c.parentId === task.id && c.parentType === 'task'
                    );
                    return {
                      ...task,
                      checklist: taskChecklist,
                    };
                  }),
                };
              }),
            };
          }),
        };

        return { data: workspaceDetails };
      },
    }),
    getSpace: builder.query<SpaceDetails | null, number>({
      queryFn: async (spaceId) => {
        const space = spaces.find((s) => s.id === spaceId);
        if (!space) return { data: null };

        // Get the workspace that contains this space
        const workspace = workspaces.find((w) => w.id === space.workspaceId);
        if (!workspace) return { data: null };

        // Get folders for this space
        const spaceFolders = folders.filter((f) => f.spaceId === spaceId);

        // Get lists directly under this space
        const spaceLists = lists.filter(
          (l) => l.parentId === spaceId && l.parentType === 'space'
        );

        const spaceDetails = {
          ...space,
          workspace: {
            id: workspace.id,
            name: workspace.name,
          },
          folders: spaceFolders.map((folder) => {
            const status = folderStatus.find(
              (fs) => fs.id === folder.folderStatusId
            );
            const folderLists = lists.filter(
              (l) => l.parentId === folder.id && l.parentType === 'folder'
            );

            return {
              ...folder,
              status: status || { id: 0, color: '', name: 'Undefined' },
              lists: folderLists.map((list) => {
                const listStatus = statuses.find((s) => s.id === list.statusId);
                const listTasks = tasks.filter((t) => t.listId === list.id);
                return {
                  ...list,
                  status: listStatus || {
                    id: 0,
                    serialId: 0,
                    name: 'Undefined',
                    color: '',
                  },
                  tasks: listTasks.map((task) => {
                    const taskChecklist = checklist.filter(
                      (c) => c.parentId === task.id && c.parentType === 'task'
                    );
                    return {
                      ...task,
                      checklist: taskChecklist,
                    };
                  }),
                };
              }),
            };
          }),
          lists: spaceLists.map((list) => {
            const listStatus = statuses.find((s) => s.id === list.statusId);
            const listTasks = tasks.filter((t) => t.listId === list.id);
            return {
              ...list,
              status: listStatus || {
                id: 0,
                serialId: 0,
                name: 'Undefined',
                color: '',
              },
              tasks: listTasks.map((task) => {
                const taskChecklist = checklist.filter(
                  (c) => c.parentId === task.id && c.parentType === 'task'
                );
                return {
                  ...task,
                  checklist: taskChecklist,
                };
              }),
            };
          }),
        };

        return { data: spaceDetails };
      },
    }),
    createWorkSpace: builder.mutation<Workspace | null, Workspace>({
      queryFn: async (workspace) => {
        const newId = data.length + 1;
        workspace.id = newId;
        data.push(workspace as Workspace);
        const newWorkspace = data.find((w) => w.id === newId);
        if (newWorkspace) {
          return { data: newWorkspace };
        }
        return { data: null };
      },
    }),
  }),
});

export const {
  useGetWorkSpacesQuery,
  useGetWorkspaceQuery,
  useGetSpaceQuery,
  useCreateWorkSpaceMutation,
} = mainApi;
