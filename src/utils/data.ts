import { Workspace } from '@/types/Workspace';

export const data: Workspace[] = [
  {
    id: '1',
    name: 'Design Team',
    description: 'Creative design and branding workspace',
    image: '',
    members: [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    ],
    spaces: [
      {
        id: '1',
        name: 'Logo Design',
        description: 'Creating and refining logo concepts',
        statuses: [
          {
            id: '1',
            serialId: 1,
            name: 'Backlog',
            statusColor: 'bg-gray-500',
          },
          {
            id: '2',
            serialId: 2,
            name: 'Sprint Backlog',
            statusColor: 'bg-amber-500',
          },
          {
            id: '3',
            serialId: 3,
            name: 'In Progress',
            statusColor: 'bg-emerald-500',
          },
          {
            id: '4',
            serialId: 4,
            name: 'Completed',
            statusColor: 'bg-green-500',
          },
          {
            id: '5',
            serialId: 5,
            name: 'In Review',
            statusColor: 'bg-yellow-500',
          },
          {
            id: '6',
            serialId: 6,
            name: 'Rejected',
            statusColor: 'bg-red-500',
          },
          {
            id: '7',
            serialId: 7,
            name: 'Accepted',
            statusColor: 'bg-blue-500',
          },
        ],
        folders: [
          {
            id: '1',
            name: 'Branding',
            lists: [
              {
                id: '1',
                name: 'Initial Designs',
                tasks: [
                  {
                    id: '1',
                    name: 'Sketch Drafts',
                    description: 'Create initial logo concepts',
                    progress: 0,
                    assignees: [
                      {
                        id: '1',
                        name: 'John Doe',
                        avatar: 'https://randomuser.me/api',
                      },
                      {
                        id: '2',
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api',
                      },
                    ],
                    priority: 'High',
                    tags: ['Logo', 'Design'],
                    checklist: [
                      {
                        id: '1',
                        description: 'Research competitors',
                        isChecked: false,
                      },
                      {
                        id: '2',
                        description: 'Choose color palette',
                        isChecked: false,
                      },
                      { id: '3', description: 'Select font', isChecked: false },
                    ],
                    startDate: new Date('2025-03-10'),
                    endDate: new Date('2025-03-15'),
                    status: {
                      id: '1',
                      serialId: 1,
                      name: 'Backlog',
                      statusColor: 'bg-gray-500',
                    },
                  },
                  {
                    id: '2',
                    name: 'Disuss Color Palette',
                    description: 'Review and finalize color options',
                    progress: 0,
                    assignees: [
                      {
                        id: '1',
                        name: 'John Doe',
                        avatar: 'https://randomuser.me/api',
                      },
                      {
                        id: '2',
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api',
                      },
                    ],
                    priority: 'High',
                    tags: ['Logo', 'Design'],
                    checklist: [
                      {
                        id: '1',
                        description: 'Research competitors',
                        isChecked: false,
                      },
                      {
                        id: '2',
                        description: 'Choose color palette',
                        isChecked: false,
                      },
                      { id: '3', description: 'Select font', isChecked: false },
                    ],
                    startDate: new Date('2025-03-10'),
                    endDate: new Date('2025-03-15'),
                    status: {
                      id: '2',
                      serialId: 2,
                      name: 'Sprint Backlog',
                      statusColor: 'bg-amber-500',
                    },
                  },
                  {
                    id: '3',
                    name: 'Export to SVG, PNG, WEBP',
                    description: 'Export logo in multiple formats',
                    progress: 0,
                    assignees: [
                      {
                        id: '1',
                        name: 'John Doe',
                        avatar: 'https://randomuser.me/api',
                      },
                      {
                        id: '2',
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api',
                      },
                    ],
                    priority: 'High',
                    tags: ['Logo', 'Design'],
                    checklist: [
                      {
                        id: '1',
                        description: 'Research competitors',
                        isChecked: false,
                      },
                      {
                        id: '2',
                        description: 'Choose color palette',
                        isChecked: false,
                      },
                      { id: '3', description: 'Select font', isChecked: false },
                    ],
                    startDate: new Date('2025-03-10'),
                    endDate: new Date('2025-03-15'),
                    status: {
                      id: '3',
                      serialId: 3,
                      name: 'Completed',
                      statusColor: 'bg-green-500',
                    },
                  },
                ],
              },
            ],
          },
        ],
        lists: [
          {
            id: '1',
            name: 'Branding',
            tasks: [
              {
                id: '1',
                name: 'Sketch Drafts',
                description: 'Create initial logo concepts',
                progress: 0,
                assignees: [
                  {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://randomuser.me/api',
                  },
                  {
                    id: '2',
                    name: 'Jane Smith',
                    avatar: 'https://randomuser.me/api',
                  },
                ],
                priority: 'High',
                tags: ['Logo', 'Design'],
                checklist: [
                  {
                    id: '1',
                    description: 'Research competitors',
                    isChecked: false,
                  },
                  {
                    id: '2',
                    description: 'Choose color palette',
                    isChecked: false,
                  },
                  { id: '3', description: 'Select font', isChecked: false },
                ],
                startDate: new Date('2025-03-10'),
                endDate: new Date('2025-03-15'),
                status: {
                  id: '3',
                  serialId: 3,
                  name: 'Completed',
                  statusColor: 'bg-green-500',
                },
              },
              {
                id: '2',
                name: 'Disuss Color Palette',
                description: 'Review and finalize color options',
                progress: 0,
                assignees: [
                  {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://randomuser.me/api',
                  },
                  {
                    id: '2',
                    name: 'Jane Smith',
                    avatar: 'https://randomuser.me/api',
                  },
                ],
                priority: 'High',
                tags: ['Logo', 'Design'],
                checklist: [
                  {
                    id: '1',
                    description: 'Research competitors',
                    isChecked: false,
                  },
                  {
                    id: '2',
                    description: 'Choose color palette',
                    isChecked: false,
                  },
                  { id: '3', description: 'Select font', isChecked: false },
                ],
                startDate: new Date('2025-03-10'),
                endDate: new Date('2025-03-15'),
                status: {
                  id: '2',
                  serialId: 2,
                  name: 'Sprint Backlog',
                  statusColor: 'bg-amber-500',
                },
              },
              {
                id: '3',
                name: 'Export to SVG, PNG, WEBP',
                description: 'Export logo in multiple formats',
                progress: 0,
                assignees: [
                  {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://randomuser.me/api',
                  },
                  {
                    id: '2',
                    name: 'Jane Smith',
                    avatar: 'https://randomuser.me/api',
                  },
                ],
                priority: 'High',
                tags: ['Logo', 'Design'],
                checklist: [
                  {
                    id: '1',
                    description: 'Research competitors',
                    isChecked: false,
                  },
                  {
                    id: '2',
                    description: 'Choose color palette',
                    isChecked: false,
                  },
                  { id: '3', description: 'Select font', isChecked: false },
                ],
                startDate: new Date('2025-03-10'),
                endDate: new Date('2025-03-15'),
                status: {
                  id: '1',
                  serialId: 1,
                  name: 'In Progress',
                  statusColor: 'bg-emerald-500',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Development Team',
    description: 'Software engineering and web development',
    image: '',
    members: [
      {
        id: '3',
        name: 'Emily Carter',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
      {
        id: '4',
        name: 'Liam Scott',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    ],
    spaces: [
      {
        id: '2',
        name: 'Frontend Development',
        description: 'Building user interfaces',
        statuses: [
          {
            id: '1',
            serialId: 1,
            name: 'Backlog',
            statusColor: 'bg-gray-500',
          },
          {
            id: '2',
            serialId: 2,
            name: 'Sprint Backlog',
            statusColor: 'bg-amber-500',
          },
          {
            id: '3',
            serialId: 3,
            name: 'In Progress',
            statusColor: 'bg-emerald-500',
          },
          {
            id: '4',
            serialId: 4,
            name: 'Completed',
            statusColor: 'bg-green-500',
          },
          {
            id: '5',
            serialId: 5,
            name: 'In Review',
            statusColor: 'bg-yellow-500',
          },
          {
            id: '6',
            serialId: 6,
            name: 'Rejected',
            statusColor: 'bg-red-500',
          },
          {
            id: '7',
            serialId: 7,
            name: 'Accepted',
            statusColor: 'bg-bg-emerald-500-500',
          },
        ],
        folders: [
          {
            id: '2',
            name: 'React Components',
            lists: [
              {
                id: '2',
                name: 'UI Components',
                tasks: [
                  {
                    id: '2',
                    name: 'Build Button Component',
                    startDate: new Date('2025-03-12'),
                    endDate: new Date('2025-03-16'),
                    description: 'Create a reusable button component',
                    progress: 0,
                    assignees: [
                      {
                        id: '3',
                        name: 'Emily Carter',
                        avatar: 'https://randomuser.me/api',
                      },
                      {
                        id: '4',
                        name: 'Liam Scott',
                        avatar: 'https://randomuser.me/api',
                      },
                    ],
                    priority: 'Medium',
                    tags: ['React', 'Component'],
                    checklist: [
                      {
                        id: '4',
                        description: 'Create button styles',
                        isChecked: false,
                      },
                      {
                        id: '5',
                        description: 'Add onClick event',
                        isChecked: false,
                      },
                      {
                        id: '6',
                        description: 'Test component',
                        isChecked: false,
                      },
                    ],
                    status: {
                      id: '3',
                      serialId: 3,
                      name: 'Completed',
                      statusColor: 'bg-green-500',
                    },
                  },
                ],
              },
            ],
          },
        ],
        lists: [
          {
            id: '2',
            name: 'UI Components',
            tasks: [
              {
                id: '2',
                name: 'Build Button Component',
                startDate: new Date('2025-03-12'),
                endDate: new Date('2025-03-16'),
                description: 'Create a reusable button component',
                progress: 0,
                assignees: [
                  {
                    id: '3',
                    name: 'Emily Carter',
                    avatar: 'https://randomuser.me/api',
                  },
                  {
                    id: '4',
                    name: 'Liam Scott',
                    avatar: 'https://randomuser.me/api',
                  },
                ],
                priority: 'Medium',
                tags: ['React', 'Component'],
                checklist: [
                  {
                    id: '4',
                    description: 'Create button styles',
                    isChecked: false,
                  },
                  {
                    id: '5',
                    description: 'Add onClick event',
                    isChecked: false,
                  },
                  { id: '6', description: 'Test component', isChecked: false },
                ],
                status: {
                  id: '3',
                  serialId: 3,
                  name: 'In Progress',
                  statusColor: 'bg-emerald-500',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Marketing Team',
    description: 'Marketing campaigns and strategy',
    image: '',
    members: [
      {
        id: '5',
        name: 'Sarah Lee',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      },
      {
        id: '6',
        name: 'Alex Chen',
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      },
    ],
    spaces: [
      {
        id: '3',
        name: 'Social Media Strategy',
        description: 'Planning and executing social media campaigns',
        statuses: [
          {
            id: '1',
            serialId: 1,
            name: 'Backlog',
            statusColor: 'bg-gray-500',
          },
          {
            id: '2',
            serialId: 2,
            name: 'Sprint Backlog',
            statusColor: 'bg-amber-500',
          },
          {
            id: '3',
            serialId: 3,
            name: 'In Progress',
            statusColor: 'bg-emerald-500',
          },
          {
            id: '4',
            serialId: 4,
            name: 'Completed',
            statusColor: 'bg-green-500',
          },
          {
            id: '5',
            serialId: 5,
            name: 'In Review',
            statusColor: 'bg-yellow-500',
          },
          {
            id: '6',
            serialId: 6,
            name: 'Rejected',
            statusColor: 'bg-red-500',
          },
          {
            id: '7',
            serialId: 7,
            name: 'Accepted',
            statusColor: 'bg-blue-500',
          },
        ],
        folders: [
          {
            id: '3',
            name: 'Content Creation',
            lists: [
              {
                id: '3',
                name: 'Video Marketing',
                tasks: [
                  {
                    id: '3',
                    name: 'Create Instagram Reels',
                    startDate: new Date('2025-03-14'),
                    endDate: new Date('2025-03-18'),
                    description: 'Plan and shoot short video clips',
                    progress: 0,
                    assignees: [
                      {
                        id: '5',
                        name: 'Sarah Lee',
                        avatar: 'https://randomuser.me/api',
                      },
                      {
                        id: '6',
                        name: 'Alex Chen',
                        avatar: 'https://randomuser.me/api',
                      },
                    ],
                    priority: 'Low',
                    tags: ['Instagram', 'Video'],
                    checklist: [
                      {
                        id: '7',
                        description: 'Storyboard ideas',
                        isChecked: false,
                      },
                      {
                        id: '8',
                        description: 'Film and edit clips',
                        isChecked: false,
                      },
                      {
                        id: '9',
                        description: 'Post on Instagram',
                        isChecked: false,
                      },
                    ],
                    status: {
                      id: '3',
                      serialId: 3,
                      name: 'Backlog',
                      statusColor: 'purple',
                    },
                  },
                ],
              },
            ],
          },
        ],
        lists: [
          {
            id: '3',
            name: 'Video Marketing',
            tasks: [
              {
                id: '3',
                name: 'Create Instagram Reels',
                startDate: new Date('2025-03-14'),
                endDate: new Date('2025-03-18'),
                description: 'Plan and shoot short video clips',
                progress: 0,
                assignees: [
                  {
                    id: '5',
                    name: 'Sarah Lee',
                    avatar: 'https://randomuser.me/api',
                  },
                  {
                    id: '6',
                    name: 'Alex Chen',
                    avatar: 'https://randomuser.me/api',
                  },
                ],
                priority: 'Low',
                tags: ['Instagram', 'Video'],
                checklist: [
                  {
                    id: '7',
                    description: 'Storyboard ideas',
                    isChecked: false,
                  },
                  {
                    id: '8',
                    description: 'Film and edit clips',
                    isChecked: false,
                  },
                  {
                    id: '9',
                    description: 'Post on Instagram',
                    isChecked: false,
                  },
                ],
                status: {
                  id: '3',
                  serialId: 3,
                  name: 'Backlog',
                  statusColor: 'purple',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
