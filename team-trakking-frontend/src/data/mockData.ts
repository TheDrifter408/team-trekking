import { Workspace, Member, Folder, List } from '@/types/ApiResponse.ts';

export const workspaces: Array<Workspace> = [
  {
    id: 1,
    name: 'Apptitive Team',
    description: 'App development team',
    image: '',
  },
  {
    id: 2,
    name: 'Website Team',
    description: 'Web development team',
    image: '',
  },
];

export const spaces = [
  { id: 0, name: 'default list' },
  { id: 1, workspaceId: 1, name: 'Cappybara App' },
  { id: 2, workspaceId: 1, name: 'Task Manager' },
  { id: 3, workspaceId: 1, name: 'AI Chatbot' },
  { id: 4, workspaceId: 2, name: 'E-Commerce Platform' },
];

export const folders: Folder[] = [
  { id: 1, spaceId: 1, name: 'Going Moon', folderStatusId: 1 },
  { id: 2, spaceId: 1, name: 'Space adventure', folderStatusId: 2 },
  { id: 3, spaceId: 1, name: 'Trade crypto', folderStatusId: 3 },
  { id: 4, spaceId: 4, name: 'Meme posting', folderStatusId: 4 },
  { id: 5, spaceId: 3, name: 'Agent builder', folderStatusId: 1 },
];

export const lists: List[] = [
  { id: 0, statusId: 1, name: 'List', parentId: 0, parentType: 'space' },
  { id: 1, parentId: 1, parentType: 'folder', statusId: 1, name: 'List' },
  { id: 2, parentId: 1, parentType: 'folder', statusId: 2, name: 'List' },
  { id: 3, parentId: 1, parentType: 'folder', statusId: 3, name: 'List' },
  { id: 5, parentId: 1, parentType: 'space', statusId: 4, name: 'List' },
  { id: 4, parentId: 4, parentType: 'folder', statusId: 5, name: 'List' },
  { id: 6, parentId: 3, parentType: 'space', statusId: 5, name: 'List' },
  { id: 7, parentId: 4, parentType: 'folder', statusId: 3, name: 'Memer' },
];

export const folderStatus = [
  { id: 1, color: 'var(--color-active)', name: 'Active' },
  { id: 2, color: 'var(--color-planning)', name: 'Planning' },
  { id: 3, color: 'var(--color-completed)', name: 'Completed' },
  { id: 4, color: 'var(--color-inactive)', name: 'Inactive' },
];

export const statuses = [
  { id: 1, serialId: 1, name: 'Backlog', color: 'var(--color-backlog)' },
  {
    id: 2,
    serialId: 2,
    name: 'Sprint Backlog',
    color: 'var(--color-sprint-backlog)',
  },
  {
    id: 3,
    serialId: 3,
    name: 'In Progress',
    color: 'var(--color-in-progress)',
  },
  { id: 4, serialId: 4, name: 'Completed', color: 'var(--color-completed)' },
  { id: 5, serialId: 5, name: 'Reviewing', color: 'var(--color-reviewing)' },
  { id: 6, serialId: 6, name: 'Rejected', color: 'var(--color-rejected)' },
  { id: 7, serialId: 7, name: 'Cancelled', color: 'var(--color-cancelled)' },
];

export const checklist = [
  {
    id: 1,
    parentId: 1,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 2,
    parentId: 1,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 3,
    parentId: 1,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 4,
    parentId: 2,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 5,
    parentId: 2,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 6,
    parentId: 3,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 7,
    parentId: 3,
    parentType: 'task',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 8,
    parentId: 1,
    parentType: 'subtask',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 9,
    parentId: 1,
    parentType: 'subtask',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 10,
    parentId: 1,
    parentType: 'subtask',
    isCompleted: false,
    description: 'Create x',
  },
  {
    id: 11,
    parentId: 1,
    parentType: 'subtask',
    isCompleted: false,
    description: 'Create x',
  },
];

export const tasks = [
  {
    id: 0,
    name: 'Default task',
    statusId: 1,
    listId: 0,
    dueDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    serialId: 1,
  },
  {
    id: 1,
    name: 'Task 1',
    statusId: 1,
    listId: 1,
    dueDate: new Date().toISOString(),
    estimatedTime: '3 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 20,
    priorityType: 'high',
    tags: ['bug', 'checklist'],
    assignees: [
      { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api' },
      { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api' },
    ],
  },
  {
    id: 2,
    name: 'Task 2',
    statusId: 2,
    listId: 2,
    dueDate: new Date().toISOString(),
    estimatedTime: '5 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 40,
    priorityType: 'medium',
    tags: ['feature', 'backend'],
    assignees: [
      { id: '3', name: 'Alice Brown', avatar: 'https://randomuser.me/api' },
    ],
  },
  {
    id: 3,
    name: 'Task 3',
    statusId: 3,
    listId: 3,
    dueDate: new Date().toISOString(),
    estimatedTime: '2 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 10,
    priorityType: 'low',
    tags: ['UI', 'bug'],
    assignees: [
      { id: '4', name: 'Charlie Green', avatar: 'https://randomuser.me/api' },
    ],
  },
  {
    id: 4,
    name: 'Task 4',
    statusId: 4,
    listId: 1,
    dueDate: new Date().toISOString(),
    estimatedTime: '6 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 60,
    priorityType: 'high',
    tags: ['database', 'optimization'],
    assignees: [
      { id: '5', name: 'David White', avatar: 'https://randomuser.me/api' },
    ],
  },
  {
    id: 5,
    name: 'Task 5',
    statusId: 5,
    listId: 2,
    dueDate: new Date().toISOString(),
    estimatedTime: '4 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 80,
    priorityType: 'medium',
    tags: ['bugfix', 'frontend'],
    assignees: [
      { id: '6', name: 'Emma Black', avatar: 'https://randomuser.me/api' },
    ],
  },
  {
    id: 5,
    name: 'Task 6',
    statusId: 5,
    listId: 6,
    dueDate: new Date().toISOString(),
    estimatedTime: '4 hours',
    startDate: new Date().toISOString(),
    serialId: 1,
    progress: 80,
    priorityType: 'medium',
    tags: ['bugfix', 'frontend'],
    assignees: [
      { id: '6', name: 'Emma Black', avatar: 'https://randomuser.me/api' },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 6,
    name: `Task ${i + 6}`,
    statusId: (i % 3) + 1,
    listId: (i % 3) + 1,
    dueDate: new Date().toISOString(),
    estimatedTime: `${(i % 5) + 2} hours`,
    startDate: new Date().toISOString(),
    serialId: i + 6,
    progress: (i % 10) * 10,
    priorityType: ['low', 'medium', 'high'][i % 3],
    tags: ['bug', 'feature', 'UI', 'database'][i % 4],
    assignees: [
      {
        id: `${i + 7}`,
        name: `User ${i + 7}`,
        avatar: 'https://randomuser.me/api',
      },
    ],
  })),
];

export const members: Array<Member> = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: '',
    workspaceId: 1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: '',
    workspaceId: 1,
  },
  {
    id: 3,
    name: 'Pinky Point',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: '',
    workspaceId: 1,
  },
  {
    id: 4,
    name: 'Kaggle Kuggle',
    avatar: '',
    email: '',
    workspaceId: 2,
  },
  {
    id: 5,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: '',
    workspaceId: 2,
  },
  {
    id: 6,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: '',
    workspaceId: 2,
  },
  {
    id: 9,
    name: 'Pinky Point',
    avatar: '',
    email: '',
    workspaceId: 2,
  },
  {
    id: 8,
    name: 'Kaggle Kuggle',
    avatar: '',
    email: '',
    workspaceId: 2,
  },
];

export const createFolderColors = {
  '#ef4444': 'Focus',
  '#f97316': 'In Progress',
  '#f59e0b': 'Pending',
  '#10b981': 'Completed',
  '#06b6d4': 'Review',
  '#3b82f6': 'Planned',
  '#6366f1': 'Active',
  '#8b5cf6': 'Waiting',
  '#ec4899': 'Archived',
  '#64748b': 'Open',
};

// Mock activities data
export const mockActivities = [
  {
    id: 1,
    userName: 'Jane Cooper',
    userAvatar: '/api/placeholder/24/24',
    action: 'created',
    itemName: 'Marketing Campaign',
    itemType: 'task',
    timestamp: '10 minutes ago',
  },
  {
    id: 2,
    userName: 'Robert Fox',
    userAvatar: '/api/placeholder/24/24',
    action: 'completed',
    itemName: 'Website Redesign',
    itemType: 'task',
    timestamp: '45 minutes ago',
  },
  {
    id: 3,
    userName: 'Esther Howard',
    userAvatar: '/api/placeholder/24/24',
    action: 'added',
    itemName: 'New Product Launch',
    itemType: 'folder',
    timestamp: '2 hours ago',
  },
  {
    id: 4,
    userName: 'Leslie Alexander',
    userAvatar: '/api/placeholder/24/24',
    action: 'assigned',
    itemName: 'Budget Review',
    itemType: 'task',
    timestamp: '3 hours ago',
  },
];

// Mock stats data
export const taskCompletionData = [
  { name: 'Mon', completed: 5, total: 8 },
  { name: 'Tue', completed: 7, total: 10 },
  { name: 'Wed', completed: 4, total: 6 },
  { name: 'Thu', completed: 8, total: 12 },
  { name: 'Fri', completed: 6, total: 8 },
  { name: 'Sat', completed: 3, total: 5 },
  { name: 'Sun', completed: 2, total: 3 },
];

export const workloadData = [
  { name: 'Marketing', tasks: 24 },
  { name: 'Development', tasks: 35 },
  { name: 'Design', tasks: 18 },
  { name: 'Operations', tasks: 29 },
];
