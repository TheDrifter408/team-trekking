import { Group } from '@/types/request-response/space/ApiResponse';

export interface WorkSpaceGlobal {
  WorkType: WorkType[];
  manageType: ManageType[];
  connectedTools: ConnectedTool[];
  discoverySource: DiscoverySource[];
  interestedFeature: InterestedFeature[];
  tutorial: Tutorial[];
}

export interface WorkType {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ViewGroup {
  id: number;
  name: string;
  type: string;
  identifier: string | null;
  identifierId: string | null;
  isActive: boolean;
  createdAt: string;
  groups: Group[];
}

export interface ManageType {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ConnectedTool {
  id: number;
  name: string;
  iconUrl: any;
  isActive: boolean;
}

export interface DiscoverySource {
  id: number;
  name: string;
  isActive: boolean;
}

export interface InterestedFeature {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Tutorial {
  id: number;
  title: string;
  tutorialUrl: string;
  isActive: boolean;
}

export interface WorkSpaceRecent {
  id: number;
  name: string;
  location: Location;
  createdAt: string;
  type: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
}

export interface WorkSpaceCreated {
  name: string;
  createdBy: CreatedBy;
  customManageType: any;
  customDiscoverySource: any;
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkSpaceResponse {
  id: number;
  status: string;
  workspace: Workspace;
  role: Role;
  permission: Permission;
}
export interface Workspace {
  id: number;
  name: string;
  iconUrl?: string;
  color?: string;
  customManageType: any;
  customDiscoverySource: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan: any;
  createdBy: CreatedBy;
  members: number;
}

export interface Permission {
  id: number;
  name: string;
}
export interface CreatedBy {
  id: number;
  fullName: string;
  email: string;
  image: any;
  forcePasswordChange: boolean;
  isActive: boolean;
  role: Role;
  userPermissions: any[];
}

export interface Role {
  id: number;
  title: string;
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

export interface Type {
  id: number;
  name: string;
  label: string;
  icon: any;
  color: any;
  isActive: boolean;
}

export interface FocusColor {
  id: number;
  title: string;
  color: string;
}

export interface WorkspaceSpaceFolderList {
  id: number;
  name: string;
  color: string;
  iconUrl: string;
  customManageType: any;
  customDiscoverySource: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  members: Member[];
  spaces: Space[];
  plan: any;
  createdBy: CreatedBy;
}

export interface Space {
  id: number;
  name: string;
  iconUrl?: string;
  avatarKey?: string;
  visibility: string;
  color?: string;
  description: string;
  isPrivate: boolean;
  startDate?: string;
  dueDate?: string;
  isActive: boolean;
  createdAt: string;
  folders: Folder[];
  lists: List[];
  focusColor?: FocusColor;
  createdBy: CreatedBy;
  priority?: Priority;
  status: Status;
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
  lists: List[];
  focusColor: FocusColor;
  createdBy: CreatedBy;
  priority: Priority;
  status: Status;
}

export interface List {
  id: number;
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  startDate?: string;
  dueDate?: string;
  isActive: boolean;
  createdAt: string;
  isInheritStatus: boolean;
  isPrivate: boolean;
  focusColor: FocusColor;
  createdBy: CreatedBy;
  priority?: Priority;
  status: Status;
  type: Type;
}

export interface Member {
  id: number;
  status: string;
  user: User;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  image: string;
  forcePasswordChange: boolean;
  isActive: boolean;
}