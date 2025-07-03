export interface CreateCheckListRequest {
  title: string;
  taskId: number;
}

export interface updateChecklistRequest {
  title: string;
  id: number;
}
export interface CreateCheckListItemRequest {
  content: string;
  isDone: boolean;
  checklistId: number;
}

export interface UpdateCheckListItemRequest {
  id: number;
  content: string;
  isDone: boolean;
}
export interface CreateTaskRequest {
  name: string;
  listId: number;
  typeId: number;
}
