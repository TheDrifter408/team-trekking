export interface SpaceGlobal {
  clickApps: ClickApp[];
  defaultViews: DefaultView[];
  workFlows: WorkFlow[];
}

export interface ClickApp {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  tooltip: string | null;
  isActive: boolean;
}

export interface WorkFlow {
  name: string;
  defaultViews: DefaultView[];
  statusItems: StatusItems;
}

export interface DefaultView {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  isActive: boolean;
}
export interface StatusItems {
  id: number;
  name: string;
  isCopy: boolean;
  groups: Group[];
}

export interface Group {
  id: number;
  name: string;
  order: number;
  tooltip: string | null;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  color: string;
  order: number;

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
  focusColor: string;
  createdBy: number;
  priority: number;
  status: StatusItems;
}

export interface ViewStatusResponse {
  name: string;
  type: string;
  identifier: string;
  isActive: boolean;
  workspace: Workspace;
  identifierId: number | null;
  id: number;
  createdAt: string;
}

export interface Workspace {
  id: number;
  name: string;
  customManageType: string | null;
  customDiscoverySource: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan: string | null;
  createdBy: CreatedBy;
}

export interface CreatedBy {
  id: number;
  fullName: string;
  email: string;
  image: string | null;
  forcePasswordChange: boolean;
  isActive: boolean;
}
