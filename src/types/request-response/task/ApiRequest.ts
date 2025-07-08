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
  priorityId?: number;
  assigneeIds?: number[];
}

export interface UpdateTask {
  id: number;
  name: string;
  description: string;
  typeId: number;
  priorityId: number;
  statusItemId: number;
  startDate: string;
  dueDate: string;
  timeEstimate: number;
  sprintPoints: number;
}
