import {
  Folder,
  Space,
  CreatedBy,
  Priority,
  Status,
  Type,
  Role,
  Member,
} from '@/types/request-response/workspace/ApiResponse';
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
  description: string | null;
  startDate: string | null;
  dueDate: string | null;
  timeEstimate: number | null;
  timeTracked: number | null;
  sprintPoints: number | null;
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
    type: Type;
  };
  parentTask: Task | null;
  subTasks: Task[];
  taskCheckLists: CheckList[];
  assignees: Member[];
  outgoingRelations: Relation[];
  incomingRelations: Relation[];
  links: Link[];
  activities: Activity[];
  owner: Omit<CreatedBy, 'role' | 'userPermissions'>;
  statusItem: StatusItem | null;
  priority: Priority | null;
  tags: Tag[];
  type: Type;
}

export interface StatusItem {
  id: number;
  name: string;
  color: string;
  order: number;
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
