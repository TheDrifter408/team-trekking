import { createFileRoute } from '@tanstack/react-router';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { handleMutation } from '@/lib/utils/utils.ts';
import { ListCard } from './-components/list-card.tsx';
import { ColumnDrawer } from './-components/column-drawer.tsx';
import { FilterSection } from './-components/filter-section.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/data-table/data-table.tsx';
import {
  createDataTableStore,
  DataTableProvider,
} from '@/stores/zustand/data-table-store.ts';
import { useComponentStore } from '@/stores/zustand/component-state-store.ts';
import { useLazyGetListTasksQuery } from '@/service/rtkQueries/listQuery.ts';
import { TabActionBar } from '@/components/common/table-floating-actoin-bar.tsx';
import { HeaderType } from '@/types/props/Common.ts';
import { ListTasksResponse } from '@/types/request-response/list/ApiResponse.ts';
import { useListStore } from '@/stores/zustand/list-store.ts';

const List = () => {
  const { listId } = Route.useParams();
  const [fetchListTasks] = useLazyGetListTasksQuery();
  const { list, setList } = useListStore();
  const closeDrawer = useComponentStore((s) => s.closeDrawer);
  const isDrawerOpen = useComponentStore((s) => s.isDrawerOpen('list-drawer'));

  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isOpenTaskCreate, setIsOpenTaskCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await handleMutation<Array<ListTasksResponse>>(
        fetchListTasks,
        listId
      );
      if (data) {
        setList(data[0]);
      }
    };
    if (listId) fetchData();
  }, [listId]);

  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  const store = createDataTableStore({});

  // TODO: Extract setting the Breadcrumbs to the page header itself.
  // TODO: Breadcrumb will be set automatically based on the URL
  const currentPage = useMemo(
    () => ({
      type: 'LIST' as HeaderType,
      label: list?.name ?? '',
    }),
    [list]
  );
  const parents = useMemo(
    () => [
      { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
      { meta: 'FOLDER' as HeaderType, label: 'Space Shuttle', link: '/folder' },
    ],
    []
  );
  return (
    <DataTableProvider value={store}>
      <div className="flex flex-col h-screen overflow-hidden relative">
        <PageHeader currentPage={currentPage} parents={parents} />
        <FilterSection
          id={listId}
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

export const Route = createFileRoute('/_auth/list/$listId')({
  component: List,
});
