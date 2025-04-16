import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

export const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'text-blue-600',
    icon: ListTodo,
    tasks: [
      {
        id: '1',
        title: 'Research competitors',
        description: 'Analyze main competitors and their features',
        category: 'todo',
      },
      {
        id: '2',
        title: 'Design mockups',
        description: 'Create initial design mockups for the dashboard',
        category: 'todo',
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
        id: '3',
        title: 'Implement auth',
        description: 'Set up authentication system',
        category: 'in-progress',
      },
    ],
  },
  {
    id: 'completed',
    title: 'completed',
    color: 'text-emerald-600',
    icon: CheckCircle2,
    tasks: [
      {
        id: '4',
        title: 'Project setup',
        description: 'Initialize project and install dependencies',
        category: 'completed',
      },
    ],
  },
];
