
export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  email: string;
  position?: string;
  department?: string;
  isAdmin?: boolean;
  lastActive?: Date;
}

// Activity tracking for workspace events
export interface Activity {
  id: string;
  userId: string;
  action: 'created' | 'commented' | 'updated' | 'completed' | 'deleted' | 'moved' | 'assigned' | 'shared';
  targetType: 'task' | 'space' | 'folder' | 'list' | 'checklist' | 'comment' | 'attachment';
  targetId: string;
  targetName: string;
  comment?: string;
  timestamp: Date;
}

// Status types for tasks
export interface Status {
  id: string;
  name: string;
  statusColor: string;
  icon?: string;
  order?: number;
}

// Time tracking interfaces
export interface TimeEntry {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  notes?: string;
}

export interface TimeTracking {
  isTracking: boolean;
  totalTrackedTime: number; // in minutes
  timeEntries: TimeEntry[];
}

// Task dependencies
export interface TaskDependency {
  id: string;
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish';
  name: string;
}

// Checklist items in tasks
export interface ChecklistItem {
  id: string;
  description: string;
  isChecked: boolean;
  assignedTo?: {
    id: string;
    name: string;
  };
  dueDate?: Date;
}

// Comments on tasks
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
}

// // Subtasks within tasks
export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
  assignedTo?: {
    id: string;
    name: string;
  };
  dueDate?: Date;
}

// Task object - the core unit of work
export interface Task {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
  createdBy?: {
    id: string;
    name: string;
    avatar: string;
  };
  assignees: User[];
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  priorityValue?: number; // Numeric representation (1 = high, 4 = low)
  tags: string[];
  checklist: ChecklistItem[];
  comments?: Comment[];
  startDate: Date;
  endDate: Date;
  estimatedHours?: number;
  actualHours?: number;
  dependencies?: TaskDependency[];
  followers?: User[];
  status: Status;
  timeTracking?: TimeTracking;
  subtasks?: Subtask[];
}

// Task list - a collection of tasks
export interface TaskList {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
  viewMode?: 'list' | 'kanban' | 'calendar' | 'timeline';
  tasks: Task[];
}

// Folder - a way to organize lists
export interface Folder {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expanded?: boolean;
  lists: TaskList[];
}

// Space - a project or area of work
// Updated Space interface with optional lists property
export interface Space {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
  coverImage?: string;
  starred?: boolean;
  viewMode?: 'board' | 'table' | 'calendar' | 'timeline' | 'gantt';
  folders: Folder[];
  lists?: TaskList[]; // Made optional with '?'
}

interface TaskType {
  id: number;
  name: string;
  description: string;
}


// Workspace - the top-level container
export interface Workspace {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
  favorite?: boolean;
  members: User[];
  activity?: Activity[];
  spaces: Space[];
  taskTypes: TaskType[];
}