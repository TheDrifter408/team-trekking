import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Workspace } from './ApiResponse';

export interface CreateWorkspaceFormProps {
  isOpen: boolean;
  onClose: () => void;
  state: Workspace;
  formSteps: number;
  setFormSteps: Dispatch<SetStateAction<number>>;
  setState: (
    property: keyof Workspace,
    value: string | Workspace['members'] | Workspace['spaces']
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
