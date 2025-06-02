import { useState, useMemo, useCallback } from 'react';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from '@/pages/list/components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/dataTable/data-table.tsx';
import { columns } from '@/components/dataTable/columns.tsx';
import { mockTasks } from '@/mock';

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
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const onMouseEnter = useCallback((id: string) => {
    setHoveredRowId(id);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHoveredRowId(null);
  }, []);
  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  return (
    <div className="h-screen flex-1 overflow-hidden flex-col">
      <PageHeader currentPage={currentPage} parents={parents} />
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="px-3 mt-2 flex-shrink-0">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
        </div>
        <DataTable
          onRowHover={onMouseEnter}
          onRowLeave={onMouseLeave}
          columns={columns(hoveredRowId)}
          data={mockTasks}
        />
      </div>
    </div>
  );
};
export default List;
