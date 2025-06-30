export type CreateSpace = {
  name: string;
  workspaceId: number;

  iconUrl?: string | null;
  avatarKey?: string | null;
  visibility?: 'public' | 'private' | null;
  color?: string | null;
  description?: string | null;
  focusColorId?: number | null;
  priorityId?: number | null;
  startDate?: string | null; // Format: YYYY-MM-DD
  dueDate?: string | null; // Format: YYYY-MM-DD
  statusViewGroupId?: number | null;
  defaultViewIds?: number[] | null;
  clickAppIds?: number[] | null;
};
