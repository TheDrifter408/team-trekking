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

export const spaceData = [
  {
    id: 1,
    name: 'ProjecX Moon',
    folders: [
      {
        id: 11,
        name: 'Space shuttle',
        lists: [
          {
            id: 111,
            name: 'Steps',
            taskNumber: 21,
          },
          {
            id: 112,
            name: 'Rocks',
            taskNumber: 120,
          },
        ],
      },
      {
        id: 12,
        name: 'Combustion engine',
        lists: [],
      },
    ],
    lists: [
      {
        id: 13,
        name: 'Mock List',
        taskNumber: 779,
      },
      {
        id: 14,
        name: 'Mock List',
        taskNumber: 120,
      },
    ],
  },
  {
    id: 2,
    name: 'Peanut App Development PVT LTD.',
    folders: [
      {
        id: 21,
        name: 'Peanut App Frontend Development',
        lists: [
          {
            id: 211,
            name: 'List',
            taskNumber: 4,
          },
        ],
      },
      {
        id: 21,
        name: 'Peanut App Backend Development',
        lists: [
          {
            id: 212,
            name: 'List',
            taskNumber: 44,
          },
        ],
      },
    ],
    lists: [],
  },
  {
    id: 3,
    name: 'Giant Timber Ltd.',
    folders: [
      {
        id: 31,
        name: 'Space shuttle',
        lists: [
          {
            id: 311,
            name: 'Steps',
            taskNumber: 21,
          },
          {
            id: 312,
            name: 'Rocks',
            taskNumber: 120,
          },
        ],
      },
    ],
    lists: [
      {
        id: 313,
        name: 'Mock List',
        taskNumber: 779,
      },
      {
        id: 314,
        name: 'Mock List',
        taskNumber: 120,
      },
    ],
  },
];

export const taskStatuses = [
  { id: '1', name: 'Open', color: 'bg-gray-200', category: 'Not Started' },
  {
    id: '2',
    name: 'Pending',
    color: 'bg-yellow-300',
    category: 'Not Started',
  },
  { id: '3', name: 'In Progress', color: 'bg-green-300', category: 'Active' },
  { id: '4', name: 'Completed', color: 'bg-green-500', category: 'Active' },
  { id: '5', name: 'Accepted', color: 'bg-green-600', category: 'Active' },
  { id: '6', name: 'Released', color: 'bg-green-700', category: 'Active' },
  { id: '7', name: 'Blocked', color: 'bg-orange-400', category: 'Active' },
  { id: '8', name: 'Rejected', color: 'bg-red-400', category: 'Active' },
  {
    id: '9',
    name: 'Sprint Backlog',
    color: 'bg-yellow-400',
    category: 'Active',
  },
  { id: '10', name: 'Backlog', color: 'bg-gray-400', category: 'Active' },
  { id: '11', name: 'Closed', color: 'bg-green-800', category: 'Closed' },
  { id: '12', name: 'Cancelled', color: 'bg-gray-900', category: 'Closed' },
];

export const statusColors: Record<string, string> = {
  todo: 'bg-gray-500',
  in_progress: 'bg-blue-500',
  review: 'bg-purple-500',
  done: 'bg-green-500',
};

export const priorityColors: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-gray-500',
};

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
];

export const mockSubtasks = [
  {
    id: '1',
    title: 'Design UI components',
    progress: 75,
    dueDate: '2024-03-25T15:00:00.000Z',
    estimatedTime: 4,
    priority: 'high',
    status: 'in_progress',
  },
  {
    id: '2',
    title: 'Implement API integration',
    progress: 30,
    dueDate: '2024-03-28T15:00:00.000Z',
    estimatedTime: 6,
    priority: 'normal',
    status: 'todo',
  },
];

export const mockChecklist = [
  {
    id: '1',
    content: 'Review requirements document',
    completed: true,
  },
  {
    id: '2',
    content: 'Set up development environment',
    completed: true,
  },
  {
    id: '3',
    content: 'Create component structure',
    completed: false,
  },
];

export const myTasks = [
  {
    id: '1',
    status: 'in_progress',
    name: 'Frontend development',
    priority: 'high',
    dueDate: '2024-03-28T15:00:00.000Z',
    startDate: '2024-03-28T15:00:00.000Z',
    subtasks: [
      {
        id: '11',
        name: 'App Layout page',
        priority: 'high',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
      {
        id: '12',
        name: 'Page header',
        priority: 'medium',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
      {
        id: '13',
        name: 'Home page',
        priority: 'low',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },

      {
        id: '14',
        name: 'Footer component',
        priority: '',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
    ],
  },
  {
    id: '2',
    status: 'completed',
    name: 'Backend development',
    priority: 'high',
    dueDate: '2024-03-28T15:00:00.000Z',
    startDate: '2024-03-28T15:00:00.000Z',
    subtasks: [
      {
        id: '21',
        name: 'Home page API',
        priority: 'high',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
      {
        id: '22',
        name: 'Notifications',
        priority: 'medium',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
      {
        id: '23',
        name: 'Microservices ',
        priority: 'low',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },

      {
        id: '24',
        name: 'Model',
        priority: '',
        dueDate: '2024-03-28T15:00:00.000Z',
        startDate: '2024-03-28T15:00:00.000Z',
      },
    ],
  },
];
