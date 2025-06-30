export interface CreateFolderRequest {
  name: string;
  iconURL: string;
  avatarKey: string;
  visibility: string;
  color: string;
  spaceId: number;
  focusColorId: number;
  priorityColorId: number;
  startDate?: string;
  dueDate?: string;
  statusViewGroupId: number;
  isInheritStatus: boolean;
}
