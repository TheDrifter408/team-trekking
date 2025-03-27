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
  color?: string;
  workspaceId: number;
  folders?: Folder[];
  lists?: List[];
}

export interface SpaceDetails extends Space {
  workspace: {
    id: number;
    name: string;
  };
  folders: Folder[];
  lists: List[];
}

export interface Folder {
  id: number;
  name: string;
  spaceId: number;
  folderStatusId?: number;
  color?: string;
  status?: FolderStatus;
  lists?: List[];
}

export interface List {
  id: number;
  name: string;
  parentId: number;
  parentType: 'space' | 'folder';
  statusId?: number;
  status?: Status;
  tasks?: Task[];
}

export interface Task {
  id: number;
  name: string;
  listId: number;
  status: Status;
  dueDate: string;
  startDate: string;
  estimatedTime?: string;
  serialId: number;
  progress?: number;
  priorityType?: string;
  tags?: string[];
  assignees?: Assignee[];
  checklist?: Checklist[];
}

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Checklist {
  id: number;
  parentId: number;
  parentType: 'task';
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
  serialId: number;
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

export interface WorkspaceDetails extends WorkspaceItem {
  spaces: Space[];
}

export interface FolderDetails extends Folder {
  lists: List[];
  tasks: Task[];
}

export interface UserType {
  id: string;
  name: string;
  avatar: string;
}

export interface SubTask {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  estimatedTime: number;
  priority: string;
  status: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface ColummTask {
  id: string;
  title: string;
  description: string;
  category: ColumnType;
}

export type ColumnType = 'todo' | 'in-progress' | 'done';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
  color: string;
  icon: string;
}
