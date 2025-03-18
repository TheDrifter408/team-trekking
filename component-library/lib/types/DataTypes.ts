export interface Assignee {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ChecklistItem {
  id: string;
  description: string;
  isChecked: boolean;
}

export interface Status {
  id: string;
  name: string;
  statusColor: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress?: number; // Optional since not all tasks have it
  assignees: Assignee[];
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  checklist: ChecklistItem[];
  status: Status;
}

export interface SubTask extends Omit<Task, 'progress'> {
  parentId: string;
}
