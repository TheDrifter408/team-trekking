import { Dispatch, FormEvent, SetStateAction } from 'react';
import { SpaceItem, Task, WorkspaceItem } from './ApiResponse';

export interface CreateWorkspaceFormProps {
  isOpen: boolean;
  onClose: () => void;
  state: WorkspaceItem;
  formSteps: number;
  setFormSteps: Dispatch<SetStateAction<number>>;
  setState: (
    property: keyof WorkspaceItem,
    value: string | WorkspaceItem['members']
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  memberEmail: string;
  setMemberEmail: Dispatch<SetStateAction<string>>;
}

export interface ThemeToggleProps {
  toggleDarkMode: () => void;
}
export interface SidebarProps {
  sidebarOpen: boolean;
  name: string;
  spaces?: SpaceItem[];
}

export interface SidebarSpaceItemProps {
  spaces: SpaceItem[];
  sidebarOpen: boolean;
}

export interface PriorityTasksProps {
  tasks: Task[];
}

export interface UpcomingDeadlineProps {
  tasks: Task[];
}

export interface TaskListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}
