export interface CreateFolderResponse {
  name: string;
  avatarKey: string;
  visibility: string;
  color: string;
  startDate: string | null;
  dueDate: string | null;
  isInheritStatus: boolean;
  isPrivate: boolean;
  space: Space;
  createdBy: CreatedBy;
  status: Status;
  iconUrl: string;
  id: number;
  isActive: boolean;
  createdAt: string;
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
  focusColor: FocusColor;
  createdBy: CreatedBy;
  priority: Priority;
  status: Status;
}

export interface FocusColor {
  id: number;
  title: string;
  color: string;
}

export interface CreatedBy {
  id: number;
  fullName: string;
  email: string;
  image: string | null;
  forcePasswordChange: boolean;
  isActive: boolean;
}

export interface Priority {
  id: number;
  title: string;
  color: string;
  isActive: boolean;
}

export interface Status {
  id: number;
  name: string;
  type: string;
  identifier: any;
  identifierId: any;
  isActive: boolean;
  createdAt: string;
}

export interface Role {
  id: number;
  title: string;
}

