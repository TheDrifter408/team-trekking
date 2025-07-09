import {
  Folder,
  Space,
  List,
  CreatedBy,
  Priority,
  Status,
  Role,
} from '@/types/request-response/workspace/ApiResponse';
import { StatusItem } from '@/types/request-response/list/ApiResponse';
export interface CheckList {
  id: number;
  title: string;
  isActive: boolean;
  items: Item[];
}
export interface Item {
  id: number;
  content: string;
  isDone: boolean;
  isActive: boolean;
}
export interface Task {
  id: number;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  timeEstimate: number;
  timeTracked: number | null;
  sprintPoints: number;
  isActive: boolean;
  isArchive: boolean;
  taskUid: string | null;
  type: Type;
  tags: Tag[];
  priority: Priority;
  statusItem: StatusItem;
  owner: User;
  parentTask: Task;
  subTasks: Task[];
  assignees: Assignee[];
  list: List;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
  isActive: boolean;
}

export interface Type {
  id: number;
  icon: string;
  singularName: string;
  pluralName: string;
  Description: string;
  isActive: boolean;
}

export interface Assignee {
  id: number;
  assignedAt: string;
  user: User;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  image: string | null;
  forcePasswordChange: boolean;
  isActive: boolean;
}

export interface Assignee {
  id: number;
  fullName: string;
  email: string;
  image: string | null;
  forcePasswordChange: boolean;
  isActive: boolean;
}
export interface Relation {
  [key: string]: any;
}
export interface Link {
  [key: string]: any;
}
export interface Activity {
  [key: string]: any;
}
export interface Tag {
  [key: string]: any;
}
export interface CreateTaskResponse {
  id: number;
  name: string;
  description: string | null;
  startDate: string | null;
  dueDate: string | null;
  timeEstimate: number | null;
  sprintPoints: number | null;
  timeTracked: number | null;
  isActive: boolean;
  isArchive: boolean;
  list: {
    id: number;
    name: string;
    iconUrl: string | null;
    avatarKey: string | null;
    visibility: string;
    color: string | null;
    startDate: string | null;
    dueDate: string | null;
    isActive: boolean;
    createdAt: string;
    isInheritStatus: boolean;
    isPrivate: boolean;
    focusColor: string | null;
    createdBy: CreatedBy;
    priority: Priority | null;
    status: Status;
    space: Space;
    folder: Folder | null;
    type: Type;
  };
  owner: CreatedBy & {
    role: Role;
    userPermissions: any[];
  };
  type: Type;
}
