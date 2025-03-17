import { Task } from './Task';

export type List = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
};
