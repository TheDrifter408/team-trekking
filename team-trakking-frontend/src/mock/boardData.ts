import { faker } from '@faker-js/faker';
import {
  Inbox as BacklogIcon,
  CheckCircle as TodoIcon,
  ArrowRightCircle as ProgressIcon,
  Search as ReviewIcon,
  FlaskRoundIcon as TestingIcon,
  CheckSquare as CompletedIcon,
} from 'lucide-react';

// Then in the icons object:
const icons = {
  backlog: BacklogIcon,
  todo: TodoIcon,
  inProgress: ProgressIcon,
  review: ReviewIcon,
  testing: TestingIcon,
  completed: CompletedIcon,
};

export interface Assignee {
  id: number;
  name: string;
  avatar: string;
}
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  BACKLOG = 'backlog',
  REVIEW = 'review',
  TESTING = 'testing',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}
export enum Priority {
  NONE = 'none',
  LOW = 'low',
  MIDDLE = 'mid',
  HIGH = 'high',
}
export type PriorityType = keyof typeof Priority;
export type TaskStatusType = keyof typeof TaskStatus | TaskStatus;
export interface Subtask extends Task {
  parentId?: string;
}
export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  startDate: string;
  assignees: Assignee[];
  priority: Priority;
  subtask: Subtask[];
  checklistCount: number;
}
export interface Column {
  id: string;
  title: string;
  color: string;
  icon: any;
  tasks: Task[];
}

// Function to create random assignees
const createRandomAssignees = (count: number): Assignee[] => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  }));
};

// Function to create random tasks
const createRandomTasks = (status: TaskStatus, count: number): Task[] => {
  return Array.from({ length: count }, () => {
    const subtaskCount = faker.number.int({ min: 0, max: 3 });
    return {
      id: faker.string.uuid(),
      name: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      status,
      dueDate: faker.date.future().toISOString(),
      startDate: faker.date.past().toISOString(),
      assignees: createRandomAssignees(faker.number.int({ min: 1, max: 3 })),
      priority: faker.helpers.enumValue(Priority),
      subtask: Array.from({ length: subtaskCount }, () => ({
        id: faker.string.uuid(),
        name: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: faker.helpers.enumValue(TaskStatus),
        dueDate: faker.date.future().toISOString(),
        startDate: faker.date.past().toISOString(),
        assignees: createRandomAssignees(faker.number.int({ min: 0, max: 2 })),
        priority: faker.helpers.enumValue(Priority),
        subtask: [],
        checklistCount: faker.number.int({ min: 0, max: 5 }),
        parentId: faker.string.uuid(),
      })),
      checklistCount: faker.number.int({ min: 0, max: 10 }),
    };
  });
};
// Create mock columns with tasks
export const mockColumns: Column[] = [
  {
    id: 'col-1',
    title: 'Backlog',
    color: '#e2e8f0', // slate-200
    icon: icons.backlog,
    tasks: createRandomTasks(TaskStatus.BACKLOG, 5),
  },
  {
    id: 'col-2',
    title: 'To Do',
    color: '#bfdbfe', // blue-200
    icon: icons.todo,
    tasks: createRandomTasks(TaskStatus.TODO, 4),
  },
  {
    id: 'col-3',
    title: 'In Progress',
    color: '#fde68a', // amber-200
    icon: icons.inProgress,
    tasks: createRandomTasks(TaskStatus.IN_PROGRESS, 3),
  },
  {
    id: 'col-4',
    title: 'Review',
    color: '#c4b5fd', // violet-300
    icon: icons.review,
    tasks: createRandomTasks(TaskStatus.REVIEW, 2),
  },
  {
    id: 'col-5',
    title: 'Testing',
    color: '#a7f3d0', // emerald-200
    icon: icons.testing,
    tasks: createRandomTasks(TaskStatus.TESTING, 2),
  },
  {
    id: 'col-6',
    title: 'Completed',
    color: '#86efac', // green-300
    icon: icons.completed,
    tasks: [
      ...createRandomTasks(TaskStatus.APPROVED, 3),
      ...createRandomTasks(TaskStatus.CANCELLED, 1),
      ...createRandomTasks(TaskStatus.REJECTED, 1),
    ],
  },
];
