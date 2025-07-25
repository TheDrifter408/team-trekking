import { faker } from '@faker-js/faker';
import {
  Inbox as BacklogIcon,
  CheckCircle as TodoIcon,
  ArrowRightCircle as ProgressIcon,
  Search as ReviewIcon,
  FlaskRoundIcon as TestingIcon,
  CheckSquare as CompletedIcon,
} from 'lucide-react';
import { Column, Task } from '@/types/props/Common';
import { Priority } from '@/lib/constants';
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

export type TaskStatusType = keyof typeof TaskStatus | TaskStatus;

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
      id: faker.number.int().toString(),
      name: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      progress: faker.number.int(),
      status: {
        id: faker.number.int(),
        name: status,
        color: status,
        category: status,
      },
      checklist: [],
      dueDate: faker.date.future().toISOString(),
      startDate: faker.date.past().toISOString(),
      assignees: createRandomAssignees(faker.number.int({ min: 1, max: 3 })),
      priority: faker.helpers.enumValue(Priority),
      subTask: Array.from({ length: subtaskCount }, () => ({
        id: faker.number.int().toString(),
        name: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        progress: faker.number.int(),
        checklist: [],
        status: {
          id: faker.number.int(),
          name: status,
          color: status,
          category: status,
        },
        dueDate: faker.date.future().toISOString(),
        startDate: faker.date.past().toISOString(),
        assignees: createRandomAssignees(faker.number.int({ min: 0, max: 2 })),
        priority: faker.helpers.enumValue(Priority),
        subTask: [],
        checklistCount: faker.number.int({ min: 0, max: 5 }),
        parentId: faker.string.uuid(),
      })),
      checkListCount: faker.number.int({ min: 0, max: 10 }),
    };
  });
};

export const PRIORITY_COLORS = {
  high: 'rgb(198, 42, 47)',
  mid: 'rgb(255, 197, 61)',
  low: 'rgb(62, 99, 221)',
  default: 'rgb(187, 187, 187)',
};

// Create mock columns with tasks
export const mockColumns: Column[] = [
  {
    id: 'col-1',
    title: 'Backlog',
    color: '#ffc53d', 
    icon: icons.backlog,
    tasks: createRandomTasks(TaskStatus.BACKLOG, 5),
  },
  {
    id: 'col-2',
    title: 'To Do',
    color: '#238b7f', 
    icon: icons.todo,
    tasks: createRandomTasks(TaskStatus.TODO, 4),
  },
  {
    id: 'col-3',
    title: 'In Progress',
    color: '#238b7f', 
    icon: icons.inProgress,
    tasks: createRandomTasks(TaskStatus.IN_PROGRESS, 3),
  },
  {
    id: 'col-4',
    title: 'Review',
    color: '#c36522', 
    icon: icons.review,
    tasks: createRandomTasks(TaskStatus.REVIEW, 2),
  },
  {
    id: 'col-5',
    title: 'Testing',
    color: '#c36522', 
    icon: icons.testing,
    tasks: createRandomTasks(TaskStatus.TESTING, 2),
  },
  {
    id: 'col-6',
    title: 'Completed',
    color: '#227f6b', 
    icon: icons.completed,
    tasks: [
      ...createRandomTasks(TaskStatus.APPROVED, 3),
      ...createRandomTasks(TaskStatus.CANCELLED, 1),
      ...createRandomTasks(TaskStatus.REJECTED, 1),
    ],
  },
  {
    id: 'col-7',
    title: 'Testing',
    color: '#a7f3d0', 
    icon: icons.testing,
    tasks: createRandomTasks(TaskStatus.TESTING, 2),
  },
  {
    id: 'col-8',
    title: 'Completed',
    color: '#86efac', 
    icon: icons.completed,
    tasks: [
      ...createRandomTasks(TaskStatus.APPROVED, 3),
      ...createRandomTasks(TaskStatus.CANCELLED, 1),
      ...createRandomTasks(TaskStatus.REJECTED, 1),
    ],
  },
  {
    id: 'col-9',
    title: 'Testing',
    color: '#a7f3d0', 
    icon: icons.testing,
    tasks: createRandomTasks(TaskStatus.TESTING, 2),
  },
  {
    id: 'col-10',
    title: 'Completed',
    color: '#86efac', 
    icon: icons.completed,
    tasks: [
      ...createRandomTasks(TaskStatus.APPROVED, 3),
      ...createRandomTasks(TaskStatus.CANCELLED, 1),
      ...createRandomTasks(TaskStatus.REJECTED, 1),
    ],
  },
];
