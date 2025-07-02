export interface CreateListRequest {
  name: string;
  iconUrl: string;
  avatarKey: string;
  visibility: string;
  color: string;
  folderId?: number;
  spaceId?: number;
  focusColorId?: number;
  statusViewGroupId?: number;
  priorityId: number;
  startDate: string;
  dueDate: string;
  isInheritStatus: boolean;
  taskType: number;
}
