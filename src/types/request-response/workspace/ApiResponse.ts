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
