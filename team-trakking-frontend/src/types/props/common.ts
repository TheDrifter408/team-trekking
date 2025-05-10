import { LucideIcon } from 'lucide-react';

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

export interface ColorOption {
  name: string;
  bgClass: string;
  textClass: string;
  color: string;
}

// Define the icon option type
export interface IconOption {
  name: string;
  icon: LucideIcon;
}

export interface DropDownProps {
  selectedColor: ColorOption;
  selectedIcon: IconOption | null;
  initials: string;
  onSelectColor: (color: ColorOption) => void;
  onSelectIcon: (icon: IconOption) => void;
  clearIcon: () => void;
  searchAvatar: string;
  setSearchAvatar: (searchAvatar: string) => void;
  iconOptions: IconOption[];
  colorOptions: ColorOption[];
}
