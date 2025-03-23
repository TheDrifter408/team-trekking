export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  email?: string;
  position?: string;
  department?: string;
  isAdmin?: boolean;
  lastActive?: Date;
}

export interface Space {
  id: number;
  name: string;
  folders: Folder[];
}

export interface Folder {
  id: number;
  name: string;
  folderStatus: FolderStatus;
  lists: List[];
}

export interface List {
  id: number;
  status: Status;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  status: Status;
  dueDate: string;
  startDate: string;
  estimatedTime?: string;
  serialId: number;
  progress?: number;
  priorityType?: string;
  tags?: string[];
  assignees?: Assignee[];
  checklists?: Checklist[];
}

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Checklist {
  id: number;
  description: string;
  isCompleted: boolean;
}

export interface FolderStatus {
  id: number;
  name: string;
  color: string;
}

export interface Status {
  id: number;
  name: string;
  color: string;
}

export interface Member {
  id: number;
  name: string;
  avatar: string;
  email: string;
  workspaceId: number;
}
export interface Workspace {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface WorkspaceItem extends Workspace {
  members: Member[];
}

export interface WorkspaceDetails extends Workspace {
  spaces: Space[];
}
