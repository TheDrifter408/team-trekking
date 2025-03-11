import { Assignee } from './Assignee';
import { Checklist } from './Checklist';
import { Status } from './Status';

export interface Task {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  assignees: Assignee[];
  priority: string;
  tags: string[];
  checklist: Checklist[];
  status: Status;
}
