export interface CreateSpaceResponse {
  workspaceId: number;
  spaceName: string;
}
export interface CreateFolderResponse {
  spaceId: number;
  folderName: string;
  color?: string;
}
export interface CreateListResponse {
  parentId: number;
  parentType: string;
  listName: string;
}
