import { Dispatch, FormEvent, SetStateAction } from 'react';
import { WorkspaceItem } from './ApiResponse';

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
}

export interface CreateFolder {
  id: string;
  name: string;
  description?: string;
  color: string;
  parentSpaceId: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface CreateList {
  id: string;
  name: string;
  description: string;
  parentId: string;
  parentType: 'space' | 'folder';
  items: CreateListItem[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
