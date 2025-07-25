import { CreatedBy } from '@/types/request-response/space/ApiResponse';
import { Tag } from '@/types/request-response/task/ApiResponse';

export interface ListResponse {
  id: number;
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  startDate: string;
  dueDate: string;
  isInheritStatus: boolean;
  isActive: boolean;
  isPrivate: boolean;
  createdBy: CreatedBy;
  priority: Priority;
  status: Status;
  folder: Folder;
  type: Type;
  createdAt: string;
}

export interface Status {
  id: number;
  name: string;
  type: string;
  identifier: string | null;
  identifierId: string | null;
  isActive: boolean;
  createdAt: string;
  groups: StatusGroup[];
}

export interface StatusGroup {
  id: number;
  name: string;
  order: number;
  items: StatusItem[];
}

export interface StatusItem {
  id: number;
  name: string;
  color: string;
  order: number;
}

export interface Priority {
  id: number;
  title: string;
  color: string;
  isActive: boolean;
}

export interface FocusColor {
  id: number;
  title: string;
  color: string;
}

export interface Folder {
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
  focusColor: FocusColor;
  createdBy: CreatedBy;
  priority: Priority;
  status: Status;
}

export interface Type {
  id: number;
}

export interface ListTasksResponse {
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
  tasks: Task[];
  status: Status;
  focusColor: string;
  createdBy: CreatedBy;
  priority: Priority;
  type: Type;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  timeEstimate?: number;
  timeTracked: string;
  sprintPoints: string;
  isActive: boolean;
  isArchive: boolean;
  parentTask: Task;
  owner: Owner;
  statusItem: StatusItem | null;
  priority?: Priority;
  tags: Tag[];
  type: Type;
}

export interface Owner {
  id: number;
  fullName: string;
  email: string;
  image: string;
  forcePasswordChange: boolean;
  isActive: boolean;
}

export interface Priority {
  id: number;
  title: string;
  color: string;
  isActive: boolean;
}

export interface Type {
  id: number;
  icon: string;
  singularName: string;
  pluralName: string;
  description: string;
  isActive: boolean;
}

export interface Item {
  id: number;
  name: string;
  color: string;
  order: number;
}
