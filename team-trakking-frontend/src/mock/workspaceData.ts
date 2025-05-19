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

export const taskTemplates = {
  categories: [
    {
      id: 'Not Started',
      status: [1, 2],
      description: "Tasks that haven't been worked on yet",
    },
    {
      id: 'Active',
      status: [4, 5, 6, 7, 8],
      description: 'Tasks that are in progress',
    },
    {
      id: 'Done',
      status: [9, 10, 11],
      description:
        'Completed tasks that still remain visible by default. ' +
        'Tasks entering these statuses will no longer be considered overdue and will unblock dependencies.',
    },
    {
      id: 'Closed',
      status: [12],
      description:
        'Completed tasks that are hidden by default in views. ' +
        'Tasks in this status will no longer be considered overdue and will unblock dependencies.',
    },
  ],
  colorOptions: [
    '#5b43d7',
    '#3451b1',
    '#0780e9',
    '#067a6f',
    '#00b499',
    '#289764',
    '#ffc53d',
    '#ee5f01',
    '#ee5f01',
    '#cb1d64',
    '#9c2bae',
    '#9c2bae',
    '#9c2bae',
    '#8d8d8d',
  ],
  templates: [
    {
      id: 1,
      name: 'Scrum',
      statuses: [
        {
          id: 1,
          name: 'Backlog',
          color: '#8d8d8d',
          category: 'Not Started',
        },
        {
          id: 2,
          name: 'Sprint Backlog',
          color: '#ffc53d',
          category: 'Not Started',
        },
        {
          id: 4,
          name: 'In Progress',
          color: '#299764',
          category: 'Active',
        },
        {
          id: 5,
          name: 'Completed',
          color: '#00b499',
          category: 'Active',
        },
        {
          id: 6,
          name: 'In Review',
          color: '#722ed1',
          category: 'Active',
        },
        {
          id: 7,
          name: 'Rejected',
          color: '#c6292f',
          category: 'Active',
        },
        {
          id: 8,
          name: 'Blocked',
          color: '#ee6003',
          category: 'Active',
        },
        {
          id: 9,
          name: 'Accepted',
          color: '#00b499',
          category: 'Done',
        },
        {
          id: 10,
          name: 'Released',
          color: '#00b499',
          category: 'Done',
        },
        {
          id: 11,
          name: 'Cancelled',
          color: '#c5c5c5',
          category: 'Done',
        },
        {
          id: 12,
          name: 'Closed',
          color: '#289764',
          category: 'Closed',
        },
      ],
    },
    {
      id: 2,
      name: 'Marketing',
      statuses: [
        { id: 1, name: 'Ideas', color: '#5b43d7', category: 'Not Started' },
        { id: 2, name: 'Planning', color: '#ffc53d', category: 'Not Started' },
        { id: 4, name: 'Design', color: '#3451b1', category: 'Active' },
        { id: 5, name: 'Execution', color: '#067a6f', category: 'Active' },
        { id: 6, name: 'Review', color: '#cb1d64', category: 'Active' },
        {
          id: 7,
          name: 'Changes Requested',
          color: '#ee5f01',
          category: 'Active',
        },
        { id: 8, name: 'Delayed', color: '#ee5f01', category: 'Active' },
        { id: 9, name: 'Approved', color: '#00b499', category: 'Done' },
        { id: 10, name: 'Launched', color: '#289764', category: 'Done' },
        { id: 11, name: 'Abandoned', color: '#c5c5c5', category: 'Done' },
        { id: 12, name: 'Archived', color: '#9c2bae', category: 'Closed' },
      ],
    },
    {
      id: 3,
      name: 'Content',
      statuses: [
        {
          id: 1,
          name: 'Topic Pool',
          color: '#9c2bae',
          category: 'Not Started',
        },
        { id: 2, name: 'To Write', color: '#ffc53d', category: 'Not Started' },
        { id: 4, name: 'Writing', color: '#3451b1', category: 'Active' },
        { id: 5, name: 'Editing', color: '#0780e9', category: 'Active' },
        { id: 6, name: 'SEO Review', color: '#5b43d7', category: 'Active' },
        { id: 7, name: 'Needs Rework', color: '#cb1d64', category: 'Active' },
        { id: 8, name: 'Blocked', color: '#ee5f01', category: 'Active' },
        { id: 9, name: 'Approved', color: '#00b499', category: 'Done' },
        { id: 10, name: 'Published', color: '#289764', category: 'Done' },
        { id: 11, name: 'Removed', color: '#c5c5c5', category: 'Done' },
        { id: 12, name: 'Closed', color: '#9c2bae', category: 'Closed' },
      ],
    },
  ],
};

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
