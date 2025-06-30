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
}

export interface Member {
  email: string;
}
