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
export type HeaderType = 'HOME' | 'SPACE' | 'FOLDER' | 'LIST' | 'TASK';
export type InboxTabType = 'IMPORTANT' | 'OTHER' | 'CLEARED';

export interface Breadcrumb {
  meta: HeaderType;
  label: string;
  link: string;
}

// Define the base message item structure
export interface InboxItem {
  id: string;
  color: string;
  code: string;
  name: string;
  type: 'Date' | 'Status' | 'Assign' | 'Comment' | 'Greet';
  message: string;
  post_message: string;
  post_type: 'Failed' | 'Attention' | 'Success';
  date: string;
}

// Group structure for important messages
export interface Messages {
  today: InboxItem[];
  yesterday: InboxItem[];
  week: InboxItem[];
  month: InboxItem[];
}
