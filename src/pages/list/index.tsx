import { useState, useMemo, useCallback } from 'react';
import { ExpandedState } from '@tanstack/react-table';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from '@/pages/list/components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { columns } from '@/components/data-table/columns.tsx';
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
  const [expandedRows, setExpandedRows] = useState<ExpandedState>({});

  const onMouseEnter = useCallback((id: string) => {
    setHoveredRowId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoveredRowId(null);
  }, []);

  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  const onExpandedChange = useCallback((expanded: ExpandedState) => {
    setExpandedRows(expanded);
  }, []);

  const onSelectionChange = useCallback(() => {}, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PageHeader currentPage={currentPage} parents={parents} />
      <div className="flex-1  min-h-0 flex flex-col">
        <div className="px-0 mt-2 flex-shrink-0">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
        </div>
        <DataTable
          onRowHover={onMouseEnter}
          onRowLeave={onMouseLeave}
          onSelectionChange={onSelectionChange}
          columns={columns(hoveredRowId)}
          data={mockTasks}
          expandedRows={expandedRows}
          onExpandedChange={onExpandedChange}
        />
      </div>
    </div>
  );
};

export default List;
