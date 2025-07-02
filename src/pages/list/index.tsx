import { useState, useMemo, useCallback } from 'react';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from '@/pages/list/components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { ColumnDrawer } from '@/pages/list/components/column-drawer.tsx';
import {
  createDataTableStore,
  DataTableProvider,
} from '@/stores/zustand/data-table-store.ts';
import { FilterSection } from './components/filter-section.tsx';
import { useComponentStore } from '@/stores/zustand/component-state-store.ts';
import { TabActionBar } from '@/components/common/table-floating-actoin-bar.tsx';
export const List = () => {
  const currentPage = useMemo(
    () => ({
      type: 'LIST' as HeaderType,
      label: 'Steps',
    }),
    []
  );

  const parents = useMemo(
    () => [
      { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
      { meta: 'FOLDER' as HeaderType, label: 'Space Shuttle', link: '/folder' },
    ],
    []
  );

  const closeDrawer = useComponentStore((s) => s.closeDrawer);
  const isDrawerOpen = useComponentStore((s) => s.isDrawerOpen('list-drawer'));

  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isOpenTaskCreate, setIsOpenTaskCreate] = useState(false);

  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  const store = createDataTableStore({});

  return (
    <DataTableProvider value={store}>
      <div className="flex flex-col h-screen overflow-hidden relative">
        <PageHeader currentPage={currentPage} parents={parents} />
        <FilterSection
          isOpen={isOpenTaskCreate}
          setIsOpen={setIsOpenTaskCreate}
        />
        <div className="flex-1 min-h-0 flex flex-col px-[20px] mt-[40px] pb-[40px] flex-shrink-0 w-full overflow-hidden">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
          {!isTableExpanded && <DataTable />}
        </div>
      </div>
      <TabActionBar />
      <ColumnDrawer
        open={isDrawerOpen}
        onClose={() => closeDrawer('list-drawer')}
      />
    </DataTableProvider>
  );
};

export default List;
