export interface SpaceGlobal {
  clickApps: ClickApp[];
  defaultViews: DefaultView[];
  workFlows: WorkFlows;
}

export interface ClickApp {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  tooltip: any;
  isActive: boolean;
}

export interface DefaultView {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  isActive: boolean;
}

export interface WorkFlows {
  Starter: Starter;
  'Marketing Teams': MarketingTeams;
  'Project Management': ProjectManagement;
  'Product + Engineering': ProductEngineering;
}

export interface Starter {
  defaultViews: DefaultView[];
  statusItems: StatusItems;
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

export interface MarketingTeams {
  defaultViews: DefaultView[];
  statusItems: StatusItems;
}

export interface ProjectManagement {
  defaultViews: DefaultView[];
  statusItems: StatusItems;
}

export interface ProductEngineering {
  defaultViews: DefaultView[];
  statusItems: StatusItems;
}
