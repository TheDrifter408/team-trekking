import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Space } from '@/types/ApiResponse.ts';

type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

export interface WorkspaceData {
  space?: Space;
}

interface TeamTrackingState {
  currentTheme: ThemeType;
  currentWorkspace: string;
  currentWorkspaceId: number;
  sidebarOpen: boolean;
  isCreateSpace: boolean;
  createItem: string;
  spaceName: string;
  workspaceData: WorkspaceData[];

  setTheme: (theme: ThemeType) => void;
  setWorkspaceName: (name: string) => void;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  setIsCreateSpace: (value: boolean) => void;
  setCreateItem: (item: string) => void;
  setSpaceName: (name: string) => void;
  onResetModal: () => void;
  setWorkspaceData: (data: WorkspaceData[]) => void;
  setWorkspaceId: (workspaceId: number) => void;
}

export const useStore = create<TeamTrackingState>()(
  persist(
    (set) => ({
      currentTheme: 'light',
      currentWorkspace: '',
      currentWorkspaceId: 0,
      sidebarOpen: true,
      isCreateSpace: false,
      createItem: '',
      spaceName: '',
      workspaceData: [],

      setTheme: (theme) => set({ currentTheme: theme }),
      setWorkspaceName: (name) => set({ currentWorkspace: name }),
      setSidebarOpen: (value) => set({ sidebarOpen: value }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setIsCreateSpace: (value) => set({ isCreateSpace: value }),
      setCreateItem: (item) => set({ createItem: item }),
      setSpaceName: (name) => set({ spaceName: name }),
      onResetModal: () =>
        set({ isCreateSpace: false, createItem: '', spaceName: '' }),
      setWorkspaceData: (data: WorkspaceData[]) => set({ workspaceData: data }),
      setWorkspaceId: (id: number) => set({ currentWorkspaceId: id }),
    }),
    {
      name: 'team-tracking-storage',
    }
  )
);
