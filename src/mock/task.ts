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
    id: 2,
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

const flattenedTasks: Task[] = [];

const generateTask = (
  level = 1,
  maxDepth = 3,
  parentId: string | null = null
): Task => {
  const id = (taskIdCounter++).toString();

  const task: Task = {
    id,
    name: faker.lorem.sentence(3),
    progress: faker.number.int({ min: 0, max: 100 }),
    status: getRandomStatus(),
    startDate: faker.date.past().toISOString(),
    dueDate: faker.date.future().toISOString(),
    description: faker.lorem.paragraph(),
    checklist: generateChecklist(),
    assignees: generateAssignees(),
    spendTime: `${faker.number.int({ min: 1, max: 40 })}h`,
    estimatedTime: `${faker.number.int({ min: 1, max: 360000000 })}`,
    priority: getRandomPriority(),
    parentId, // ✅ <-- added this
    subTask: [],
    subTaskCount: 0,
    checkListCount: 0,
    depth: level,
  };

  if (level < maxDepth && faker.datatype.boolean({ probability: 0.5 })) {
    const probability = level === 1 ? 0.6 : level === 2 ? 0.7 : 0.4;

    if (faker.datatype.boolean({ probability })) {
      const subtaskCount = faker.number.int({
        min: 1,
        max: level === 1 ? 5 : 3,
      });

      task.subTaskCount = subtaskCount;
      task.checkListCount = task?.checklist?.length || 0;

      task.subTask = Array.from({ length: subtaskCount }).map(
        () => generateTask(level + 1, maxDepth, id) // ✅ Pass the current task's ID as parentId
      );
    }
  }

  flattenedTasks.push(task);

  return task;
};
export const generateTasks = (count: number, maxDepth = 3): Task[] => {
  taskIdCounter = 1;
  flattenedTasks.length = 0;

  return Array.from({ length: count }).map(() => generateTask(1, maxDepth));
};

export const mockTasks: Task[] = generateTasks(5, 3);
export const mockTasksFlattened: Task[] = [...flattenedTasks];

export const removeTaskById = (tasks: Task[], taskId: string): Task[] => {
  return tasks
    .map((task) => {
      if (task.id === taskId) return null;
      if (task.subTask?.length) {
        task.subTask = removeTaskById(task.subTask, taskId);
      }
      return task;
    })
    .filter(Boolean) as Task[];
};
