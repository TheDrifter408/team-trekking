import { useState, useMemo, useCallback } from 'react';
import { Main } from '@/components/layout/main.tsx';
import { getColumns } from '@/components/dataTable/columns.tsx';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from '@/pages/list/components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/dataTable/data-table2.tsx';
import { generateTasks } from '@/mock';

const generatedTasks = generateTasks(100);

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

  const [isTableExpanded, setIsTableExpanded] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  const columns = useMemo(() => {
    return getColumns(selectedIds, onToggleSelect);
  }, [selectedIds, onToggleSelect]);

  return (
    <div>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="px-3">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
          {isTableExpanded && (
            <DataTable columns={columns} data={generatedTasks} />
          )}
        </div>
      </Main>
    </div>
  );
};
export default List;
