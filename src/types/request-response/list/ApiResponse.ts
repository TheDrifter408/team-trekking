import { CreatedBy } from '@/types/request-response/space/ApiResponse';

export interface ListResponse {
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  startDate: string;
  dueDate: string;
  isInheritStatus: boolean;
  isPrivate: boolean;
  createdBy: CreatedBy;
  priority: Priority;
  status: Status;
  folder: Folder;
  type: Type;
  id: number;
  isActive: boolean;
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
