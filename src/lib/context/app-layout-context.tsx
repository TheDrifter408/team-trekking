import { createContext, useContext, ReactNode } from 'react';
import { SpaceGlobal } from '@/types/request-response/space/ApiResponse';

interface AppContextType {
  spaceGlobal: SpaceGlobal | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
  spaceGlobal,
}: {
  children: ReactNode;
  spaceGlobal: SpaceGlobal | null;
}) => {
  return (
    <AppContext.Provider value={{ spaceGlobal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
