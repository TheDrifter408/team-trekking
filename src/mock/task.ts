import {
  Task,
  TaskStatus,
  Assignee,
  TaskPriority,
  Checklist,
} from '@/types/props/Common.ts';
import { faker } from '@faker-js/faker';
import { LABEL } from '@/lib/constants/appStrings.ts';

const priorities: TaskPriority[] = [
  LABEL.LOW,
  LABEL.NORMAL,
  LABEL.HIGH,
  LABEL.URGENT,
];
const statusCategory = {
  OPEN: 'Open',
  ACTIVE: 'Active',
  DONE: 'Done',
  CLOSED: 'Closed',
} as const;
const statuses: TaskStatus[] = [
  {
    id: 1,
    name: 'Backlog',
    color: '#8d8d8d',
    category: statusCategory.OPEN,
  },
  {
    id: 1,
    name: 'Sprint Backlog',
    color: '#ffc53d',
    category: statusCategory.OPEN,
  },
  {
    id: 3,
    name: 'In Progress',
    color: '#289764',
    category: statusCategory.ACTIVE,
  },
  {
    id: 4,
    name: 'Completed',
    color: '#00b499',
    category: statusCategory.ACTIVE,
  },
  {
    id: 5,
    name: 'Rejected',
    color: '#c12c30',
    category: statusCategory.ACTIVE,
  },
  {
    id: 6,
    name: 'Accepted',
    color: '#00b499',
    category: statusCategory.DONE,
  },
  {
    id: 7,
    name: 'Closed',
    color: '#000000',
    category: statusCategory.CLOSED,
  },
];

const generateChecklist = (): Checklist[] =>
  Array.from({ length: faker.number.int({ min: 0, max: 20 }) }).map((_, i) => ({
    id: i + 1,
    name: faker.lorem.words(2),
    isCompleted: faker.datatype.boolean(),
  }));

const generateAssignees = (): Assignee[] =>
  Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map((_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  }));

const getRandomStatus = (): TaskStatus => faker.helpers.arrayElement(statuses);

const getRandomPriority = (): TaskPriority =>
  faker.helpers.arrayElement(priorities);

let taskIdCounter = 1;

const generateTask = (level = 1): Task => {
  const task: Task = {
    id: (taskIdCounter++).toString(),
    name: faker.lorem.sentence(3),
    progress: faker.number.int({ min: 0, max: 100 }),
    status: getRandomStatus(),
    startDate: faker.date.past().toISOString(),
    dueDate: faker.date.future().toISOString(),
    description: faker.lorem.paragraph(),
    checklist: generateChecklist(),
    assignees: generateAssignees(),
    spendTime: `${faker.number.int({ min: 1, max: 40 })}h`,
    estimatedTime: `${faker.number.int({ min: 1, max: 40 })}h`,
    priority: getRandomPriority(),
    subTask: [],
    subTaskCount: 0,
    checkListCount: 0,
  };

  if (level < 5 && faker.datatype.boolean()) {
    const subtaskCount = faker.number.int({ min: 0, max: 5 });
    task.subTaskCount = subtaskCount;
    task.checkListCount = task?.checklist?.length || 0;
    task.subTask = Array.from({ length: subtaskCount }).map(() =>
      generateTask(level + 1)
    );
  }

  return task;
};

export const generateTasks = (count: number): Task[] => {
  taskIdCounter = 1;
  return Array.from({ length: count }).map(() => generateTask());
};

export const mockTasks: Task[] = generateTasks(10);
