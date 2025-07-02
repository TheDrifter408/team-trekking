import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Workspace {
  id: number;
  name: string;
  // Add other properties if needed, like `type`, `members`, etc.
}

interface WorkspaceState {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace) => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      currentWorkspace: null,
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      clearWorkspace: () => set({ currentWorkspace: null }),
    }),
    {
      name: 'workspace-storage', // localStorage key
    }
  )
);