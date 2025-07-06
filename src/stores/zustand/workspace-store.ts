import {
  Workspace,
  WorkspaceSpaceFolderList,
  Space,
  Member,
  WorkSpaceGlobal,
} from '@/types/request-response/workspace/ApiResponse';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  workspaceGlobal: WorkSpaceGlobal | null;
  currentWorkspace: Workspace | null;
  spaces?: Space[] | null;
  members?: Member[] | null;
  spaceFolderList?: WorkspaceSpaceFolderList | null;
  setCurrentWorkspace: (workspace: Workspace) => void;
  setSpaces: (spaces: Space[]) => void;
  setMembers: (members: Member[]) => void;
  setSpaceFolderList: (spaceFolderList: WorkspaceSpaceFolderList) => void;
  setWorkspaceGlobal: (workspaceGlobal: WorkSpaceGlobal) => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaceGlobal: null,
      currentWorkspace: null,
      spaces: null,
      members: null,
      spaceFolderList: null,
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      setSpaces: (spaces) => set({ spaces }),
      setMembers: (members) => set({ members }),
      setSpaceFolderList: (spaceFolderList) => set({ spaceFolderList }),
      setWorkspaceGlobal: (workspaceGlobal: WorkSpaceGlobal) =>
        set({ workspaceGlobal }),
      clearWorkspace: () =>
        set({
          currentWorkspace: null,
          spaces: null,
          spaceFolderList: null,
          members: null,
        }),
    }),
    {
      name: 'workspace-storage',
    }
  )
);
