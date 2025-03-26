import {
  checklist,
  folders,
  folderStatus,
  lists,
  members,
  spaces,
  statuses,
  tasks,
  workspaces,
} from '@/data/mockData.ts';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
    .slice(0, 2);
};

const enrichWorkspace = (workspaceId: number) => {
  const workspace = workspaces.find((w) => w.id === workspaceId);
  if (!workspace) return null;

  const workspaceMembers = members.filter((m) => m.workspaceId === workspaceId);
  const workspaceSpaces = spaces.filter((s) => s.workspaceId === workspaceId);

  return { ...workspace, members: workspaceMembers, spaces: workspaceSpaces };
};

const enrichSpace = (spaceId: number) => {
  const space = spaces.find((s) => s.id === spaceId);
  if (!space) return null;

  const workspace = workspaces.find((w) => w.id === space.workspaceId);
  if (!workspace) return null;

  const spaceFolders = folders.filter((f) => f.spaceId === spaceId);
  const spaceLists = lists.filter(
    (l) => l.parentId === spaceId && l.parentType === 'space'
  );

  return {
    ...space,
    workspace: { id: workspace.id, name: workspace.name },
    folders: spaceFolders,
    lists: spaceLists,
  };
};

const getFolderWithLists = (folderId: number) => {
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return null;

  const status = folderStatus.find((fs) => fs.id === folder.folderStatusId);
  const folderLists = lists.filter(
    (l) => l.parentId === folder.id && l.parentType === 'folder'
  );

  return {
    ...folder,
    status: status || { id: 0, color: '', name: 'Undefined' },
    lists: folderLists,
  };
};

const getListWithTasks = (listId: number) => {
  const list = lists.find((l) => l.id === listId);
  if (!list) return null;

  const listStatus = statuses.find((s) => s.id === list.statusId);
  const listTasks = tasks.filter((t) => t.listId === list.id);

  return {
    ...list,
    status: listStatus || { id: 0, serialId: 0, name: 'Undefined', color: '' },
    tasks: listTasks.map((task) => ({
      ...task,
      checklist: checklist.filter(
        (c) => c.parentId === task.id && c.parentType === 'task'
      ),
    })),
  };
};
const formatTime = (hours: number): string => {
  return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
};

const generateRandomSubtask = () => {
  const priorities = ['Low', 'Medium', 'High'];

  return {
    id: Math.floor(Math.random() * 100).toString(),
    name: '',
    status: 'Open',
    progress: 0,
    dueDate: new Date(),
    estimatedTime: `${0}h`, // 1-5 hours
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  };
};

export {
  getInitials,
  enrichSpace,
  enrichWorkspace,
  getFolderWithLists,
  getListWithTasks,
  formatTime,
  generateRandomSubtask,
};
