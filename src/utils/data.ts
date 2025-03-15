import { Workspace } from "@/types/ApiResponse";

export const data: Workspace[] = [
  {
    id: '4',
    name: 'Software team',
    description: 'Creative design and branding workspace',
    image: '',
    coverImage: '',
    color: '#4287f5',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2025-03-01'),
    favorite: true,
    members: [
      { id: '1', name: 'John Doe', role: 'Lead Designer', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', email: 'john.doe@example.com', position: 'Senior Designer', department: 'Creative', isAdmin: true, lastActive: new Date('2025-03-15T09:30:00') },
      { id: '2', name: 'Jane Smith', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', email: 'jane.smith@example.com', position: 'UI/UX Designer', department: 'Creative', isAdmin: false, lastActive: new Date('2025-03-14T16:45:00') },
      { id: '7', name: 'Michael Brown', role: 'Graphic Designer', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', email: 'michael.brown@example.com', position: 'Graphic Designer', department: 'Creative', isAdmin: false, lastActive: new Date('2025-03-13T14:20:00') },
      { id: '8', name: 'Emma Wilson', role: 'Illustrator', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', email: 'emma.wilson@example.com', position: 'Illustrator', department: 'Creative', isAdmin: false, lastActive: new Date('2025-03-12T11:15:00') }
    ],
    activity: [
      { id: '1', userId: '1', action: 'created', targetType: 'task', targetId: '1', targetName: 'Sketch Drafts', timestamp: new Date('2025-03-10T10:00:00') },
      { id: '2', userId: '2', action: 'commented', targetType: 'task', targetId: '1', targetName: 'Sketch Drafts', comment: 'I think we should focus on minimalist design', timestamp: new Date('2025-03-11T11:30:00') },
      { id: '3', userId: '1', action: 'updated', targetType: 'task', targetId: '2', targetName: 'Discuss Color Palette', timestamp: new Date('2025-03-12T14:15:00') },
      { id: '4', userId: '7', action: 'completed', targetType: 'checklist', targetId: '1', targetName: 'Research competitors', timestamp: new Date('2025-03-13T09:45:00') }
    ],
    spaces: [
      {
        id: '1',
        name: 'Logo Design',
        description: 'Creating and refining logo concepts',
        icon: 'paintbrush',
        color: '#3498db',
        createdAt: new Date('2024-10-18'),
        updatedAt: new Date('2025-03-08'),
        coverImage: '/images/logo-design-cover.jpg',
        starred: true,
        viewMode: 'board',
        folders: [
          {
            id: '1',
            name: 'Branding',
            description: 'Core branding elements and guidelines',
            icon: 'palette',
            color: '#e74c3c',
            createdAt: new Date('2024-10-20'),
            updatedAt: new Date('2025-03-05'),
            expanded: true,
            lists: [
              {
                id: '1',
                name: 'Initial Designs',
                description: 'First round of design concepts',
                color: '#1abc9c',
                icon: 'star',
                createdAt: new Date('2024-10-22'),
                updatedAt: new Date('2025-03-10'),
                viewMode: 'kanban',
                tasks: [
                  {
                    id: '1',
                    name: 'Sketch Drafts',
                    description: "Create initial logo concepts based on client brief",
                    longDescription: "Develop a series of hand-drawn sketches exploring different logo directions. Focus on creating at least 10 distinct concepts that align with the brand values of innovation, trust, and simplicity. Consider both wordmark and icon-based approaches.",
                    progress: 35,
                    createdAt: new Date('2025-03-10T08:00:00'),
                    updatedAt: new Date('2025-03-14T16:30:00'),
                    createdBy: { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
                    assignees: [
                      { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Lead Designer' },
                      { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', role: 'UI/UX Designer' },
                    ],
                    priority: 'High',
                    priorityValue: 1,
                    tags: ['Logo', 'Design', 'Concepts', 'Sketch'],
                    attachments: [
                      { id: '1', name: 'Concept_01.png', type: 'image/png', size: '2.4MB', url: '/attachments/concept_01.png', uploadedAt: new Date('2025-03-11T09:15:00'), uploadedBy: { id: '1', name: 'John Doe' } },
                      { id: '2', name: 'Moodboard.pdf', type: 'application/pdf', size: '4.8MB', url: '/attachments/moodboard.pdf', uploadedAt: new Date('2025-03-12T10:30:00'), uploadedBy: { id: '2', name: 'Jane Smith' } }
                    ],
                    checklist: [
                      { id: '1', description: 'Research competitors', isChecked: true, assignedTo: { id: '1', name: 'John Doe' }, dueDate: new Date('2025-03-11') },
                      { id: '2', description: 'Choose color palette', isChecked: true, assignedTo: { id: '2', name: 'Jane Smith' }, dueDate: new Date('2025-03-12') },
                      { id: '3', description: 'Select font', isChecked: false, assignedTo: { id: '1', name: 'John Doe' }, dueDate: new Date('2025-03-13') },
                      { id: '4', description: 'Prepare for presentation', isChecked: false, assignedTo: { id: '2', name: 'Jane Smith' }, dueDate: new Date('2025-03-14') }
                    ],
                    comments: [
                      { id: '1', userId: '2', userName: 'Jane Smith', userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg', content: 'I think we should focus on a more minimalist approach', timestamp: new Date('2025-03-11T11:30:00'), likes: 2, attachments: [] },
                      { id: '2', userId: '1', userName: 'John Doe', userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', content: 'Agreed. Let\'s try to reduce the complexity', timestamp: new Date('2025-03-12T09:45:00'), likes: 1, attachments: [{ id: '3', name: 'Example.jpg', type: 'image/jpeg', size: '1.2MB', url: '/attachments/example.jpg' }] }
                    ],
                    startDate: new Date('2025-03-10'),
                    endDate: new Date('2025-03-15'),
                    estimatedHours: 12,
                    actualHours: 8,
                    dependencies: [],
                    followers: [
                      { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
                      { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
                      { id: '7', name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' }
                    ],
                    status: {
                      id: '1',
                      name: 'In Progress',
                      statusColor: 'blue',
                      icon: 'clock',
                      order: 2
                    },
                    timeTracking: {
                      isTracking: false,
                      totalTrackedTime: 460, // minutes
                      timeEntries: [
                        { id: '1', userId: '1', startTime: new Date('2025-03-11T08:30:00'), endTime: new Date('2025-03-11T10:00:00'), duration: 90, notes: 'Initial sketches' },
                        { id: '2', userId: '2', startTime: new Date('2025-03-12T13:00:00'), endTime: new Date('2025-03-12T16:10:00'), duration: 190, notes: 'Refining concepts' },
                        { id: '3', userId: '1', startTime: new Date('2025-03-13T09:00:00'), endTime: new Date('2025-03-13T12:00:00'), duration: 180, notes: 'Digital mockups' }
                      ]
                    },
                    subtasks: [
                      { id: '1-1', name: 'Research existing logos', completed: true, assignedTo: { id: '1', name: 'John Doe' }, dueDate: new Date('2025-03-11') },
                      { id: '1-2', name: 'Create rough sketches', completed: true, assignedTo: { id: '2', name: 'Jane Smith' }, dueDate: new Date('2025-03-12') },
                      { id: '1-3', name: 'Refine top 3 concepts', completed: false, assignedTo: { id: '1', name: 'John Doe' }, dueDate: new Date('2025-03-14') }
                    ],
                    customFields: {
                      clientFeedback: 'Positive on initial concepts',
                      approvalStatus: 'Pending',
                      billingCategory: 'Client Work',
                      revisionNumber: 2
                    }
                  },
                  {
                    id: '2',
                    name: 'Discuss Color Palette',
                    description: "Review and finalize color options for the brand",
                    longDescription: "Meet with the client to review the proposed color palette options. Prepare a presentation showing each color in context with sample applications. Aim to finalize the primary and secondary colors as well as accent colors for the brand system.",
                    progress: 60,
                    createdAt: new Date('2025-03-10T09:15:00'),
                    updatedAt: new Date('2025-03-13T14:20:00'),
                    createdBy: {
                      id: '2',
                      name: 'Jane Smith',
                      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                    },
                    assignees: [
                      {
                        id: '1',
                        name: 'John Doe',
                        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                        role: 'Lead Designer'
                      },
                      {
                        id: '2',
                        name: 'Jane Smith',
                        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                        role: 'UI/UX Designer'
                      },
                      {
                        id: '7',
                        name: 'Michael Brown',
                        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
                        role: 'Graphic Designer'
                      }
                    ],
                    priority: 'Medium',
                    priorityValue: 2,
                    tags: ['Colors', 'Branding', 'Client Meeting'],
                    attachments: [
                      {
                        id: '3',
                        name: 'ColorOptions.pdf',
                        type: 'application/pdf',
                        size: '3.2MB',
                        url: '/attachments/color_options.pdf',
                        uploadedAt: new Date('2025-03-11T16:45:00'),
                        uploadedBy: { id: '2', name: 'Jane Smith' }
                      }
                    ],
                    checklist: [
                      {
                        id: '5',
                        description: 'Prepare color mood board',
                        isChecked: true,
                        assignedTo: { id: '2', name: 'Jane Smith' },
                        dueDate: new Date('2025-03-11')
                      },
                      {
                        id: '6',
                        description: 'Research color psychology',
                        isChecked: true,
                        assignedTo: { id: '7', name: 'Michael Brown' },
                        dueDate: new Date('2025-03-12')
                      },
                      {
                        id: '7',
                        description: 'Prepare presentation',
                        isChecked: false,
                        assignedTo: { id: '1', name: 'John Doe' },
                        dueDate: new Date('2025-03-14')
                      }
                    ],
                    comments: [
                      {
                        id: '3',
                        userId: '7',
                        userName: 'Michael Brown',
                        userAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
                        content: 'I think we should include more vibrant options',
                        timestamp: new Date('2025-03-12T13:20:00'),
                        likes: 0,
                        attachments: []
                      },
                      {
                        id: '4',
                        userId: '2',
                        userName: 'Jane Smith',
                        userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                        content: 'The client expressed preference for blue tones in our initial meeting',
                        timestamp: new Date('2025-03-12T14:05:00'),
                        likes: 2,
                        attachments: []
                      }
                    ],
                    startDate: new Date('2025-03-11'),
                    endDate: new Date('2025-03-16'),
                    estimatedHours: 8,
                    actualHours: 5,
                    dependencies: [{ id: '1', type: 'finish-to-start', name: 'Sketch Drafts' }],
                    followers: [
                      { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
                      { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
                    ],
                    status: {
                      id: '2',
                      name: 'Review',
                      statusColor: 'yellow',
                      icon: 'eye',
                      order: 3
                    },
                    timeTracking: {
                      isTracking: false,
                      totalTrackedTime: 460, // minutes
                      timeEntries: [
                        {
                          id: '1',
                          userId: '1',
                          startTime: new Date('2025-03-11T08:30:00'),
                          endTime: new Date('2025-03-11T10:00:00'),
                          duration: 90,
                          notes: 'Initial sketches'
                        },
                        {
                          id: '2',
                          userId: '2',
                          startTime: new Date('2025-03-12T13:00:00'),
                          endTime: new Date('2025-03-12T16:10:00'),
                          duration: 190,
                          notes: 'Refining concepts'
                        },
                        {
                          id: '3',
                          userId: '1',
                          startTime: new Date('2025-03-13T09:00:00'),
                          endTime: new Date('2025-03-13T12:00:00'),
                          duration: 180,
                          notes: 'Digital mockups'
                        }
                      ]
                    },
                    subtasks: [
                      {
                        id: '1-1',
                        name: 'Research existing logos',
                        completed: true,
                        assignedTo: { id: '1', name: 'John Doe' },
                        dueDate: new Date('2025-03-11')
                      },
                      {
                        id: '1-2',
                        name: 'Create rough sketches',
                        completed: true,
                        assignedTo: { id: '2', name: 'Jane Smith' },
                        dueDate: new Date('2025-03-12')
                      },
                      {
                        id: '1-3',
                        name: 'Refine top 3 concepts',
                        completed: false,
                        assignedTo: { id: '1', name: 'John Doe' },
                        dueDate: new Date('2025-03-14')
                      }
                    ],
                    customFields: {
                      clientFeedback: 'Positive on initial concepts',
                      approvalStatus: 'Pending',
                      billingCategory: 'Client Work',
                      revisionNumber: 2
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
