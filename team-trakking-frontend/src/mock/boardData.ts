import {
  CheckCircle2,
  Clock,
  ListTodo,
  FileSearch,
  Check,
  Hourglass,
  AlertOctagon,
  User,
  Users,
  BadgeCheck,
} from 'lucide-react';

// Define types for better type safety
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dates: {
    start: string;
    end: string;
  };
  checklist: ChecklistItem[];
  subtasks: Subtask[];
  assignees: Assignee[];
}

export interface Column {
  id: string;
  title: string;
  color: string;
  icon: any;
  tasks: Task[];
}

const assignees = [
  { id: 'user1', name: 'John Doe', avatar: '/avatars/john.png' },
  { id: 'user2', name: 'Jane Smith', avatar: '/avatars/jane.png' },
  { id: 'user3', name: 'Alex Wong', avatar: '/avatars/alex.png' },
  { id: 'user4', name: 'Sarah Miller', avatar: '/avatars/sarah.png' },
  { id: 'user5', name: 'James Brown', avatar: '/avatars/james.png' },
];

export const mockColumns: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'text-gray-600',
    icon: FileSearch,
    tasks: [
      {
        id: 'task-01',
        title: 'Update user documentation',
        description:
          'Review and update all user-facing documentation for the new release',
        category: 'backlog',
        priority: 'low',
        dates: {
          start: '2025-05-01',
          end: '2025-05-10',
        },
        checklist: [
          { id: 'cl-01-1', text: 'Audit existing docs', completed: false },
          { id: 'cl-01-2', text: 'Update screenshots', completed: false },
          { id: 'cl-01-3', text: 'Proofread content', completed: false },
        ],
        subtasks: [],
        assignees: [assignees[1]],
      },
      {
        id: 'task-02',
        title: 'Design system updates',
        description: 'Implement the new design tokens across all components',
        category: 'backlog',
        priority: 'medium',
        dates: {
          start: '2025-05-05',
          end: '2025-05-15',
        },
        checklist: [
          { id: 'cl-02-1', text: 'Update color palette', completed: false },
          { id: 'cl-02-2', text: 'Revise typography', completed: false },
        ],
        subtasks: [],
        assignees: [assignees[0], assignees[2]],
      },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    color: 'text-blue-600',
    icon: ListTodo,
    tasks: [
      {
        id: 'task-03',
        title: 'Research competitors',
        description: 'Analyze main competitors and their features',
        category: 'todo',
        priority: 'high',
        dates: {
          start: '2025-04-20',
          end: '2025-04-28',
        },
        checklist: [
          {
            id: 'cl-03-1',
            text: 'Identify top 5 competitors',
            completed: true,
          },
          { id: 'cl-03-2', text: 'Compare feature sets', completed: false },
          {
            id: 'cl-03-3',
            text: 'Analyze pricing structures',
            completed: false,
          },
        ],
        subtasks: [
          {
            id: 'sub-03-1',
            title: 'Create comparison spreadsheet',
            completed: false,
          },
          { id: 'sub-03-2', title: 'Gather UI screenshots', completed: false },
        ],
        assignees: [assignees[1], assignees[4]],
      },
      {
        id: 'task-04',
        title: 'Design mockups',
        description: 'Create initial design mockups for the dashboard',
        category: 'todo',
        priority: 'medium',
        dates: {
          start: '2025-04-22',
          end: '2025-05-01',
        },
        checklist: [
          { id: 'cl-04-1', text: 'Sketch wireframes', completed: true },
          {
            id: 'cl-04-2',
            text: 'Create high-fidelity designs',
            completed: false,
          },
        ],
        subtasks: [
          {
            id: 'sub-04-1',
            title: 'Design navigation components',
            completed: false,
          },
          {
            id: 'sub-04-2',
            title: 'Create dashboard widgets',
            completed: false,
          },
        ],
        assignees: [assignees[2]],
      },
      {
        id: 'task-05',
        title: 'API documentation',
        description: 'Update API endpoints documentation with new features',
        category: 'todo',
        priority: 'urgent',
        dates: {
          start: '2025-04-17',
          end: '2025-04-21',
        },
        checklist: [
          { id: 'cl-05-1', text: 'Document new endpoints', completed: false },
          { id: 'cl-05-2', text: 'Update examples', completed: false },
          {
            id: 'cl-05-3',
            text: 'Verify with development team',
            completed: false,
          },
        ],
        subtasks: [],
        assignees: [assignees[0], assignees[3]],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'text-amber-600',
    icon: Clock,
    tasks: [
      {
        id: 'task-06',
        title: 'Implement auth',
        description: 'Set up authentication system with OAuth 2.0',
        category: 'in-progress',
        priority: 'high',
        dates: {
          start: '2025-04-15',
          end: '2025-04-23',
        },
        checklist: [
          { id: 'cl-06-1', text: 'Set up OAuth providers', completed: true },
          { id: 'cl-06-2', text: 'Implement token refresh', completed: true },
          {
            id: 'cl-06-3',
            text: 'Add role-based permissions',
            completed: false,
          },
          { id: 'cl-06-4', text: 'Security testing', completed: false },
        ],
        subtasks: [
          {
            id: 'sub-06-1',
            title: 'Google OAuth integration',
            completed: true,
          },
          {
            id: 'sub-06-2',
            title: 'GitHub OAuth integration',
            completed: false,
          },
        ],
        assignees: [assignees[0]],
      },
      {
        id: 'task-07',
        title: 'Database optimization',
        description: 'Optimize database queries and add indexes',
        category: 'in-progress',
        priority: 'urgent',
        dates: {
          start: '2025-04-16',
          end: '2025-04-20',
        },
        checklist: [
          { id: 'cl-07-1', text: 'Identify slow queries', completed: true },
          { id: 'cl-07-2', text: 'Add necessary indexes', completed: false },
          { id: 'cl-07-3', text: 'Benchmark performance', completed: false },
        ],
        subtasks: [],
        assignees: [assignees[3], assignees[4]],
      },
    ],
  },
  {
    id: 'review',
    title: 'In Review',
    color: 'text-purple-600',
    icon: Hourglass,
    tasks: [
      {
        id: 'task-08',
        title: 'User dashboard features',
        description: 'Implement new dashboard widgets and functionality',
        category: 'review',
        priority: 'medium',
        dates: {
          start: '2025-04-10',
          end: '2025-04-19',
        },
        checklist: [
          { id: 'cl-08-1', text: 'Analytics widget', completed: true },
          { id: 'cl-08-2', text: 'Activity feed', completed: true },
          { id: 'cl-08-3', text: 'User preferences', completed: true },
        ],
        subtasks: [
          {
            id: 'sub-08-1',
            title: 'Fix chart rendering bug',
            completed: false,
          },
          {
            id: 'sub-08-2',
            title: 'Improve mobile responsiveness',
            completed: true,
          },
        ],
        assignees: [assignees[2], assignees[1]],
      },
      {
        id: 'task-09',
        title: 'Payment integration',
        description: 'Integrate with Stripe for subscription payments',
        category: 'review',
        priority: 'high',
        dates: {
          start: '2025-04-12',
          end: '2025-04-22',
        },
        checklist: [
          { id: 'cl-09-1', text: 'Set up Stripe webhook', completed: true },
          { id: 'cl-09-2', text: 'Implement checkout flow', completed: true },
          {
            id: 'cl-09-3',
            text: 'Handle subscription lifecycle',
            completed: true,
          },
        ],
        subtasks: [
          {
            id: 'sub-09-1',
            title: 'Test international payments',
            completed: false,
          },
          {
            id: 'sub-09-2',
            title: 'Documentation for finance team',
            completed: false,
          },
        ],
        assignees: [assignees[0], assignees[4]],
      },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    color: 'text-orange-600',
    icon: AlertOctagon,
    tasks: [
      {
        id: 'task-10',
        title: 'End-to-end testing',
        description: 'Create and run E2E tests for critical user flows',
        category: 'testing',
        priority: 'high',
        dates: {
          start: '2025-04-15',
          end: '2025-04-25',
        },
        checklist: [
          { id: 'cl-10-1', text: 'User registration flow', completed: true },
          { id: 'cl-10-2', text: 'Checkout process', completed: true },
          { id: 'cl-10-3', text: 'Account settings', completed: false },
        ],
        subtasks: [
          { id: 'sub-10-1', title: 'Fix failing tests', completed: false },
          {
            id: 'sub-10-2',
            title: 'Add mobile browser tests',
            completed: false,
          },
        ],
        assignees: [assignees[3]],
      },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    color: 'text-emerald-600',
    icon: CheckCircle2,
    tasks: [
      {
        id: 'task-11',
        title: 'Project setup',
        description: 'Initialize project and install dependencies',
        category: 'completed',
        priority: 'high',
        dates: {
          start: '2025-04-05',
          end: '2025-04-08',
        },
        checklist: [
          { id: 'cl-11-1', text: 'Set up repository', completed: true },
          { id: 'cl-11-2', text: 'Install dependencies', completed: true },
          { id: 'cl-11-3', text: 'Configure CI/CD', completed: true },
        ],
        subtasks: [
          { id: 'sub-11-1', title: 'Create documentation', completed: true },
        ],
        assignees: [assignees[0], assignees[2]],
      },
      {
        id: 'task-12',
        title: 'Landing page redesign',
        description: 'Update the landing page with new branding',
        category: 'completed',
        priority: 'medium',
        dates: {
          start: '2025-04-10',
          end: '2025-04-15',
        },
        checklist: [
          { id: 'cl-12-1', text: 'Update hero section', completed: true },
          { id: 'cl-12-2', text: 'Revise pricing tables', completed: true },
          { id: 'cl-12-3', text: 'New testimonials', completed: true },
          { id: 'cl-12-4', text: 'Mobile optimization', completed: true },
        ],
        subtasks: [
          { id: 'sub-12-1', title: 'SEO optimizations', completed: true },
          {
            id: 'sub-12-2',
            title: 'Performance improvements',
            completed: true,
          },
        ],
        assignees: [assignees[1], assignees[4]],
      },
    ],
  },
  {
    id: 'blocked',
    title: 'Blocked',
    color: 'text-red-600',
    icon: BadgeCheck,
    tasks: [
      {
        id: 'task-13',
        title: 'Third-party API integration',
        description: 'Integrate with external analytics service',
        category: 'blocked',
        priority: 'medium',
        dates: {
          start: '2025-04-18',
          end: '2025-04-28',
        },
        checklist: [
          {
            id: 'cl-13-1',
            text: 'Research API documentation',
            completed: true,
          },
          { id: 'cl-13-2', text: 'Implement data transfer', completed: false },
          { id: 'cl-13-3', text: 'Error handling', completed: false },
        ],
        subtasks: [
          {
            id: 'sub-13-1',
            title: 'Get API access approval',
            completed: false,
          },
        ],
        assignees: [assignees[3]],
      },
      {
        id: 'task-14',
        title: 'Legal compliance review',
        description: 'Update terms of service for GDPR compliance',
        category: 'blocked',
        priority: 'urgent',
        dates: {
          start: '2025-04-15',
          end: '2025-04-25',
        },
        checklist: [
          { id: 'cl-14-1', text: 'Research requirements', completed: true },
          { id: 'cl-14-2', text: 'Draft updated terms', completed: true },
          { id: 'cl-14-3', text: 'Legal review', completed: false },
        ],
        subtasks: [
          {
            id: 'sub-14-1',
            title: 'Schedule meeting with legal team',
            completed: false,
          },
        ],
        assignees: [assignees[4], assignees[1]],
      },
    ],
  },
];
