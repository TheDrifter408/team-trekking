import { taskStatuses } from './workspaceData';

// Sample notification data
export const taskNotificationUsers = [
  {
    id: 1,
    userName: 'Jawahiir Nabhan ( You )',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=jawahiir',
    isWatching: true,
  },
  {
    id: 2,
    userName: 'Piash Mehedi',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=mehedi',
    isWatching: true,
  },
  {
    id: 3,
    userName: 'Mike Tyson',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=tyson',
    isWatching: false,
  },
];

// Sample filter options
export const filterOptions = [
  { id: 'all', label: 'All Activity', checked: true },
  { id: 'comments', label: 'Comments', checked: true },
  { id: 'assignments', label: 'Assignments', checked: true },
  { id: 'status', label: 'Status Changes', checked: false },
  { id: 'mentions', label: 'Mentions', checked: true },
];

export const sampleTask = {
  id: 1,
  name: 'Budget plan for summer vacation',
  description:
    'Each Summer, Dcastalia celebrates their year mid success and takes the opportunity to recess and take a breather.',
  startDate: '',
  endDate: '',
  estimatedTime: '8',
  tags: ['budget', 'planning'],
  assignees: ['Tawakkul', 'Saidur Rahman', 'Polok'],
  priority: 'low',
  trackTime: '2hours 4minutes',
  timeSpent: '3hours 44 minutes',
  status: taskStatuses[2],
  subtask: [
    {
      id: 11,
      name: 'Date fix',
      description: 'Fix a date for the event',
      startDate: '',
      endDate: '',
      estimatedTime: '2',
      priority: 'mid',
      assignees: ['Tawakkul'],
      trackTime: '5hours',
      timeSpent: '4hours 44minutes',
      status: taskStatuses[1],
    },
    {
      id: 12,
      name: 'Location fix',
      description: 'Fix a location for the event',
      startDate: '',
      endDate: '',
      estimatedTime: '2',
      priority: 'mid',
      assignees: ['Saidur Rahman'],
      trackTime: '5hours',
      timeSpent: '4hours 44minutes',
      status: taskStatuses[3],
    },
    {
      id: 13,
      name: 'Budget estimation',
      description: 'Estimate a near accurate cost ',
      startDate: '',
      endDate: '',
      estimatedTime: '2',
      priority: 'mid',
      assignees: ['Polok'],
      trackTime: '5hours',
      timeSpent: '4hours 44minutes',
      status: taskStatuses[4],
    },
  ],
  checklist: [
    {
      id: 11,
      name: 'Contact resort for price details',
      isCompleted: false,
    },
    {
      id: 12,
      name: 'Negotiation',
      isCompleted: false,
    },
    {
      id: 13,
      name: 'Event planning',
      isCompleted: true,
    },
  ],
};
