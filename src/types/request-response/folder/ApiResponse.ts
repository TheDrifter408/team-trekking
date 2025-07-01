import { Space, StatusItem } from '@/types/request-response/space/ApiResponse';

export interface Folder {
  name: string;
  iconURL: string;
  avatarKey: string;
  visibility: string;
  color: string;
  spaceId: number;
  focusColorId: number;
  priorityColorId: number;
  startDate: string;
  dueDate: string;
  statusViewGroupId: number;
  isInheritStatus: boolean;
  isPrivate: boolean;
  space: Space;
  status: StatusItem;
  isActive: boolean;
  createdAt: string;
}
