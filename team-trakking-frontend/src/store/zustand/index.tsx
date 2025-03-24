import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

interface ListItem {
  id: number;
  name: string;
}

interface FolderItem {
  id: number;
  name: string;
  color: string;
  lists?: ListItem[];
}

interface SpaceItem {
  id: number;
  name: string;
  color: string;
  lists?: ListItem[];
  folders?: FolderItem[];
}

interface WorkspaceData {
  space?: SpaceItem;
}

interface TeamTrackingState {
  currentTheme: ThemeType;
  currentWorkspace: string;
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
  resetModal: () => void;
  setWorkspaceData: (data: WorkspaceData[]) => void;
}

export const useStore = create<TeamTrackingState>()(
  persist(
    (set) => ({
      currentTheme: 'light',
      currentWorkspace: '',
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
      resetModal: () =>
        set({ isCreateSpace: false, createItem: '', spaceName: '' }),
      setWorkspaceData: (data: WorkspaceData[]) => set({ workspaceData: data }),
    }),
    {
      name: 'team-tracking-storage',
    }
  )
);
