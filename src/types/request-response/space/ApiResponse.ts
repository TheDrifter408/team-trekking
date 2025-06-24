export interface SpaceGlobal {
  clickApps: ClickApp[];
  defaultView: View[];
  workflow: Workflow[];
}

export interface ClickApp {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  tooltip: string | null;
  isActive: boolean;
}

export interface View {
  id: number;
  title: string;
  iconUrl: string;
  type: string;
  isActive: boolean;
}

export interface Workflow {
  id: number;
  title: string;
  subTitle: string;
  isActive: boolean;
  statusItems: Record<string, StatusItem[]>;
  defaultView: View[];
}

export interface StatusItem {
  id: number;
  name: string;
  color: string;
  order: number;
}
