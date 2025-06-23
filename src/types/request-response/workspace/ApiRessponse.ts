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
