export interface CreateCheckListRequest {
  title: string;
  taskId: number;
}

export interface CreateCheckListItemRequest {
  content: string;
  isDone: boolean;
  checklistId: number;
}
