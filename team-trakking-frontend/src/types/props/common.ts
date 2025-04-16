export type Assignee = {
  id: string;
  name: string;
};

export type TaskStatus = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  name: string;
  status: TaskStatus;
  progress: number;
  priority: string;
  assignees: Assignee[];
  startDate: Date;
  dueDate: Date;
  estimatedTime: string;
  spentTime: string;
  timeTracked: string;
  subRows?: Task[];
};

export interface Space {
  id: number;
  name: string;
  description: string;
}

export interface ColummTask {
  id: string;
  title: string;
  description: string;
  category: ColumnType;
}

export type ColumnType = 'todo' | 'in-progress' | 'done';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
  color: string;
  icon: string;
}