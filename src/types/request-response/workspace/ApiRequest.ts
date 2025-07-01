export interface CreateWorkSpace {
  name: string;
  workTypeId?: number;
  manageTypeId?: number;
  customManageType?: string;
  discoverySourceId?: number;
  customDiscoverySource?: string;
  connectedToolIds?: number[];
  interestedFeatureIds?: number[];
  planId?: number;
  members?: Member[];
  color?: string;
}

export interface Member {
  email: string;
}
