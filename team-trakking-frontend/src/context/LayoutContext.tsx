import { createContext, useContext, useState, ReactNode } from 'react';

interface List {
  id: number;
  name: string;
}

interface Folder {
  id: number;
  name: string;
  color: string;
  lists?: List[];
}

interface Space {
  id: number;
  name: string;
  color: string;
  lists?: List[];
  folders?: Folder[];
}

interface WorkspaceData {
  space?: Space;
}

interface WorkspaceContextType {
  workspaceData: WorkspaceData[];
  setData: (data: WorkspaceData[]) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData[]>([]);

  const setData = (data: WorkspaceData[]) => {
    setWorkspaceData(data);
  };

  return (
    <WorkspaceContext.Provider value={{ workspaceData, setData }}>
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
