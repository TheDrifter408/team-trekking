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
  tooltip: any;
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
  tooltip: any;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  order: number;
}
export interface StatusItem {
  id: number;
  name: string;
  type: string;
  identifier: any;
  identifierId: any;
  isActive: boolean;
  color: string;
  order: number;
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
  focusColor: string;
  createdBy: number;
  priority: number;
  status: StatusItem;
}
