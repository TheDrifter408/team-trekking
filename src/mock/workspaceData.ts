import {
  RecentActions,
  WorkData,
  AssignedComment,
} from '@/types/props/Common.ts';

export const spaceData = [
  {
    id: 1,
    name: 'ProjectX Moon',
    folders: [
      {
        id: 11,
        name: 'space shuttle',
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
        name: 'Mock list',
        taskNumber: 779,
      },
      {
        id: 14,
        name: 'Mock list',
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
        name: 'space shuttle',
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
        name: 'Mock list',
        taskNumber: 779,
      },
      {
        id: 314,
        name: 'Mock list',
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

export const colorOptions = [
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
  colorOptions: colorOptions,
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

export const recentData: RecentActions[] = [
  { id: '1', name: 'All Hands Meeting', type: 'List', location: 'in Projects' },
  {
    id: '2',
    name: 'Create a list then assign in the task',
    type: 'Task',
    location: 'in Your list of expertise',
  },
  {
    id: '3',
    name: 'Refactor workspace views',
    type: 'Task',
    location: 'in Development board',
  },
  {
    id: '4',
    name: 'Marketing Roadmap',
    type: 'List',
    location: 'in Campaign Planning',
  },
  {
    id: '5',
    name: 'User Feedback Review',
    type: 'Task',
    location: 'in Feedback Repository',
  },
  {
    id: '6',
    name: 'Prepare Q3 Objectives',
    type: 'List',
    location: 'in Strategic Planning',
  },
  {
    id: '7',
    name: 'Bug triage and resolution',
    type: 'Task',
    location: 'in Engineering Tasks',
  },
  {
    id: '8',
    name: 'Client onboarding checklist',
    type: 'List',
    location: 'in Customer Success',
  },
  {
    id: '9',
    name: 'Sprint Planning Meeting',
    type: 'Task',
    location: 'in Agile board',
  },
  {
    id: '10',
    name: 'UI/UX Audit',
    type: 'Task',
    location: 'in Design System',
  },
  {
    id: '11',
    name: 'Security Checklist',
    type: 'List',
    location: 'in IT Compliance',
  },
  {
    id: '12',
    name: 'OKRs 2025',
    type: 'List',
    location: 'in Company Goals',
  },
  {
    id: '13',
    name: 'Content Calendar Draft',
    type: 'Task',
    location: 'in Marketing Workspace',
  },
  {
    id: '14',
    name: 'QA Testing Scenarios',
    type: 'Task',
    location: 'in Release Checklist',
  },
  {
    id: '15',
    name: 'Product Roadmap',
    type: 'List',
    location: 'in Product Planning',
  },
];

const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[randomIndex];
};

export const myWorkData: WorkData[] = [
  {
    workType: 'ToDo',
    scheduleData: [
      {
        id: 'Today',
        tasks: [
          {
            id: '1',
            name: 'Complete project proposal',
            color: getRandomColor(),
            description: 'Finalize the Q3 project proposal document',
            priority: 'high',
            completed: false,
            location: 'in Projects',
          },
          {
            id: '2',
            name: 'Team standup meeting',
            color: getRandomColor(),
            description: 'Daily standup at 10:00 AM',
            priority: 'medium',
            completed: false,
            location:
              'Kanban space / Severity folder / in Your list of expertise',
          },
          {
            id: '3',
            name: 'Review pull requests',
            color: getRandomColor(),
            description: 'Review and merge pending PRs',
            priority: 'medium',
            completed: false,
            location: 'Kanban space / Release folder / in Release Checklist',
          },
        ],
      },
      {
        id: 'Overdue',
        tasks: [
          {
            id: '4',
            name: 'Submit expense report',
            color: getRandomColor(),
            description: 'Expense report for April travel',
            dueDate: '2025-05-15',
            priority: 'high',
            completed: false,
          },
          {
            id: '5',
            name: 'Client follow-up email',
            color: getRandomColor(),
            description: 'Send follow-up email to client about project status',
            dueDate: '2025-05-17',
            priority: 'high',
            completed: false,
          },
        ],
      },
      {
        id: 'Next',
        tasks: [
          {
            id: '6',
            name: 'Prepare for quarterly review',
            color: getRandomColor(),
            description: 'Gather metrics and prepare presentation',
            dueDate: '2025-05-22',
            priority: 'medium',
            completed: false,
          },
          {
            id: '7',
            name: 'Update documentation',
            color: getRandomColor(),
            description: 'Update API documentation with new endpoints',
            dueDate: '2025-05-23',
            priority: 'low',
            completed: false,
          },
          {
            id: '8',
            name: 'Code review session',
            color: getRandomColor(),
            description: 'Schedule code review session with junior developers',
            dueDate: '2025-05-24',
            priority: 'medium',
            completed: false,
          },
        ],
      },
      {
        id: 'Unscheduled',
        tasks: [
          {
            id: '9',
            name: 'Research new technologies',
            color: getRandomColor(),
            description:
              'Research potential new frameworks for upcoming project',
            priority: 'low',
            completed: false,
          },
          {
            id: '10',
            name: 'Refactor authentication module',
            color: getRandomColor(),
            description:
              'Refactor the authentication module for better performance',
            priority: 'medium',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    workType: 'Meetings',
    scheduleData: [
      {
        id: 'Today',
        tasks: [
          {
            id: '11',
            name: 'Weekly status meeting',
            color: getRandomColor(),
            description: 'Weekly team status update at 2:00 PM',
            priority: 'high',
            completed: false,
          },
          {
            id: '12',
            name: 'One-on-one with manager',
            color: getRandomColor(),
            description: 'Monthly check-in with manager at 4:00 PM',
            priority: 'medium',
            completed: false,
          },
        ],
      },
      {
        id: 'Next',
        tasks: [
          {
            id: '13',
            name: 'Product planning session',
            color: getRandomColor(),
            description: 'Q3 product planning meeting',
            dueDate: '2025-05-21',
            priority: 'high',
            completed: false,
          },
          {
            id: '14',
            name: 'Client presentation',
            color: getRandomColor(),
            description: 'Present project status to client',
            dueDate: '2025-05-23',
            priority: 'high',
            completed: false,
          },
        ],
      },
      {
        id: 'Unscheduled',
        tasks: [
          {
            id: '15',
            name: 'Team building activity',
            color: getRandomColor(),
            description: 'Plan team building activity for next month',
            priority: 'low',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    workType: 'Projects',
    scheduleData: [
      {
        id: 'Active',
        tasks: [
          {
            id: '16',
            name: 'Website redesign',
            color: getRandomColor(),
            description: 'Complete responsive design updates',
            dueDate: '2025-06-15',
            priority: 'high',
            completed: false,
          },
          {
            id: '17',
            name: 'Mobile app development',
            color: getRandomColor(),
            description: 'Develop iOS and Android versions',
            dueDate: '2025-07-30',
            priority: 'high',
            completed: false,
          },
        ],
      },
      {
        id: 'Planned',
        tasks: [
          {
            id: '18',
            name: 'API integration',
            color: getRandomColor(),
            description: 'Integrate with third-party payment API',
            dueDate: '2025-08-10',
            priority: 'medium',
            completed: false,
          },
          {
            id: '19',
            name: 'Analytics dashboard',
            color: getRandomColor(),
            description: 'Create customer analytics dashboard',
            dueDate: '2025-09-01',
            priority: 'medium',
            completed: false,
          },
        ],
      },
      {
        id: 'Completed',
        tasks: [
          {
            id: '20',
            name: 'User testing',
            color: getRandomColor(),
            description: 'Conduct user testing for new features',
            dueDate: '2025-05-01',
            priority: 'high',
            completed: true,
          },
          {
            id: '21',
            name: 'Database migration',
            color: getRandomColor(),
            description: 'Migrate to new database structure',
            dueDate: '2025-04-15',
            priority: 'high',
            completed: true,
          },
        ],
      },
    ],
  },
];

export const assignedCommentData: AssignedComment[] = [
  {
    id: '1',
    comment: '@Jawahir Nabhan please do this task today',
    commentTime: '20 mins',
    taskName: 'task monday deadline',
    imageUrl: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: '2',
    comment: '@Leah Roberts kindly review the changes in the design spec',
    commentTime: '35 mins',
    taskName: 'Design Specification Review',
    imageUrl: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: '3',
    comment: '@Ahmed Zaki make sure this goes to QA by EOD',
    commentTime: '1 hr',
    taskName: 'API Integration for Payments',
    imageUrl: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: '4',
    comment: '@Maya Khan double-check the onboarding copy',
    commentTime: '2 hrs',
    taskName: 'Copy Updates Onboarding',
    imageUrl: 'https://i.pravatar.cc/40?img=4',
  },
  {
    id: '5',
    comment: '@Omar El-Rashid please align this with the marketing campaign',
    commentTime: '2 hrs',
    taskName: 'Landing Page SEO Update',
    imageUrl: 'https://i.pravatar.cc/40?img=5',
  },
  {
    id: '6',
    comment: '@Sophia Lin kindly finalize the sprint timeline',
    commentTime: '3 hrs',
    taskName: 'Sprint Planning Draft',
    imageUrl: 'https://i.pravatar.cc/40?img=6',
  },
  {
    id: '7',
    comment: '@Noah Adams revise the report based on client feedback',
    commentTime: '4 hrs',
    taskName: 'Q2 Performance Report',
    imageUrl: 'https://i.pravatar.cc/40?img=7',
  },
  {
    id: '8',
    comment: '@Fatima Yusuf make changes to the pricing table as discussed',
    commentTime: '5 hrs',
    taskName: 'Pricing Table Revision',
    imageUrl: 'https://i.pravatar.cc/40?img=8',
  },
  {
    id: '9',
    comment: '@Daniel Tran please confirm the timezone with the client',
    commentTime: '6 hrs',
    taskName: 'Client Meeting Setup',
    imageUrl: 'https://i.pravatar.cc/40?img=9',
  },
  {
    id: '10',
    comment: '@Emily Chen add this to the agenda for tomorrow',
    commentTime: '7 hrs',
    taskName: 'Team Sync Agenda',
    imageUrl: 'https://i.pravatar.cc/40?img=10',
  },
];
