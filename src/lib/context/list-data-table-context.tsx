import { createContext, useContext, useState, ReactNode } from 'react';

interface ListDataTableContextType {
  hoveredRow: number;
  setHoveredRow: (hoveredRow: number) => void;
}
const ListDataTableContext = createContext<
  ListDataTableContextType | undefined
>(undefined);
export const ListDataTableProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [hoveredRow, setHoveredRow] = useState<number>(0);
  return (
    <ListDataTableContext.Provider value={{ hoveredRow, setHoveredRow }}>
      {children}
    </ListDataTableContext.Provider>
  );
};

export const useListTableContext = () => {
  const context = useContext(ListDataTableContext);
  if (!context)
    throw new Error(
      'useListTableContext must be used within ListTableProvider'
    );
  return context;
};
