import { faker } from '@faker-js/faker';
import { Assignee, Task, TaskStatus } from '@/types/props/Common.ts';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const createAssignee = (): Assignee => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
});

export const statuses: TaskStatus[] = [
  { id: 1, name: 'Open', color: '#4573d2', category: 'DONE' },
  { id: 2, name: 'In Progress', color: '#d99e2b', category: 'DONE' },
  { id: 3, name: 'Review', color: '#8256d0', category: 'DONE' },
  { id: 4, name: 'Done', color: '#5bb85c', category: 'DONE' },
  { id: 5, name: 'Blocked', color: '#e44235', category: 'DONE' },
];

const newTask = (): Task => {
  const startDate = faker.date.past();
  const dueDate = faker.date.future();
  const numberOfAssignees = faker.number.int({ min: 1, max: 3 });

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    status: faker.helpers.arrayElement(statuses),
    progress: faker.number.int({ min: 0, max: 100 }),
    priority: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Urgent']),
    assignees: Array.from({ length: numberOfAssignees }, createAssignee),
    startDate: startDate,
    dueDate: dueDate,
    estimatedTime: `${faker.number.int({ min: 1, max: 40 })}h`,
    spentTime: `${faker.number.int({ min: 1, max: 40 })}h`,
    timeTracked: `${faker.number.int({ min: 1, max: 40 })}h`,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Task[] => {
    const len = lens[depth]!;
    return range(len).map((): Task => {
      return {
        ...newTask(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
