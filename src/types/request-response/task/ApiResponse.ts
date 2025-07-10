import {
  Folder,
  Space,
  List,
  CreatedBy,
  Priority,
  Status,
  Role,
  Member,
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
  subTasks?: Task[];
  type: Type;
  tags?: Tag[];
  priority: Priority | null;
  statusItem: StatusItem | null;
  owner?: User;
  parentTask?: Task;
  taskCheckLists?: CheckList[];
  assignees?: Assignee[];
  outgoingRelations?: TaskRelations[];
  incomingRelations?: TaskRelations[];
  list?: List;
  folder?: Folder;
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

export interface TaskRelations {
  id: number;
  task: Task;
  relatedTask: Task;
  relationType: RelationType;
}

export interface RelationType {
  id: number;
  name: string;
  description: string;
}

export interface List {
  id: number;
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  startDate: string;
  dueDate: string;
  isActive: boolean;
  createdAt: string;
  isInheritStatus: boolean;
  isPrivate: boolean;
  space: Space;
  folder: Folder | null;
}

export interface Space {
  id: number;
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  description: string;
  isPrivate: boolean;
  startDate: string;
  dueDate: string;
  isActive: boolean;
  createdAt: string;
  workspace: Workspace;
}

export interface Workspace {
  id: number;
  name: string;
  color: string;
  iconUrl: string | null;
  customManageType: string | null;
  customDiscoverySource: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
