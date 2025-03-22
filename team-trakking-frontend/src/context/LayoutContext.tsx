import { createContext, useContext, useState, ReactNode } from 'react';

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

interface WorkspaceContextType {
  workspaceData: WorkspaceData[];
  setData: (data: WorkspaceData[]) => void;
  isCreateSpace: boolean;
  setIsCreateSpace: (isCreateSpace: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData[]>([]);
  const [isCreateSpace, setIsCreateSpace] = useState(false);

  const setData = (data: WorkspaceData[]) => {
    setWorkspaceData(data);
  };

  return (
    <WorkspaceContext.Provider
      value={{ workspaceData, setData, isCreateSpace, setIsCreateSpace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
