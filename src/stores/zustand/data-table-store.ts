import { createContext, useContext } from 'react';
import { combine } from 'zustand/middleware';
import {
  createStore as createZustandStore,
  useStore as useZustandStore,
} from 'zustand';

interface IDataTableStore {
  hoveredRowId: string | null;
  activeDialogRowId: string | null;
  selectedRowIds: Set<string>;
  isAllRowSelected: boolean; // Changed to boolean flag
  toggleSelectedRow: (id: string) => void;
  isRowSelected: (id: string) => boolean;
  toggleAllRows: () => void;
}

const getDefaultState = (): IDataTableStore => ({
  hoveredRowId: null,
  activeDialogRowId: null,
  selectedRowIds: new Set(),
  isAllRowSelected: false,
  toggleSelectedRow: (id: string) => {},
  isRowSelected: (id: string) => false,
  toggleAllRows: () => {},
});

export const createDataTableStore = (
  preloadedState: Partial<IDataTableStore>
) => {
  return createZustandStore(
    combine({ ...getDefaultState(), ...preloadedState }, (set, get) => ({
      toggleSelectedRow: (id: string) => {
        set((state) => {
          const selected = new Set(state.selectedRowIds);
          if (selected.has(id)) {
            selected.delete(id);
          } else {
            selected.add(id);
          }
          return { selectedRowIds: selected };
        });
      },
      isRowSelected: (id: string) => {
        return get().selectedRowIds.has(id);
      },
      setHoveredRowId: (id: string | null) => set({ hoveredRowId: id }),
      setActiveDialogRowId: (id: string | null) =>
        set({ activeDialogRowId: id }),
      toggleAllRows: () => {
        set((state) => {
          return {
            isAllRowSelected: !state.isAllRowSelected,
            selectedRowIds: new Set(),
          };
        });
      },
    }))
  );
};

export type DataTableStoreType = ReturnType<typeof createDataTableStore>;
type DataTableStoreInterface = ReturnType<DataTableStoreType['getState']>;

const zustandContext = createContext<DataTableStoreType | null>(null);
export const DataTableProvider = zustandContext.Provider;

export const useDataTableStore = <T>(
  selector: (state: DataTableStoreInterface) => T
) => {
  const store = useContext(zustandContext);
  if (!store) throw new Error('Data Table Store is missing the provider');
  return useZustandStore(store, selector);
};
