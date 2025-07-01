import { useState, useRef, useEffect } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  ColumnSizingState,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { Columns } from '@/components/data-table/columns';
import { mockTasks } from '@/mock/task.ts';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body.tsx';
import { DataTableProps } from '@/types/props/DataTableProps.ts';
import { Task } from '@/types/props/Common.ts';

export const DataTable = ({ className = '' }: DataTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const setTable = useDataTableStore((state) => state.setTable);

  const table = useReactTable({
    data: tasks,
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subTask,
    enableExpanding: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    enableColumnPinning: true,
    onColumnSizingChange: setColSizing,
    state: {
      columnSizing: colSizing,
      columnPinning: {
        left: [],
        right: [],
      },
    },
  });

  useEffect(() => {
    setTable(table);
  }, [table, setTable, tasks]);

  // Synchronize scroll between header and body
  useEffect(() => {
    const headerEl = headerRef.current;
    const bodyEl = parentRef.current;

    if (!headerEl || !bodyEl) return;

    const syncHeaderScroll = () => {
      if (bodyEl) bodyEl.scrollLeft = headerEl.scrollLeft;
    };

    const syncBodyScroll = () => {
      if (headerEl) headerEl.scrollLeft = bodyEl.scrollLeft;
    };

    headerEl.addEventListener('scroll', syncHeaderScroll);
    bodyEl.addEventListener('scroll', syncBodyScroll);

    return () => {
      headerEl.removeEventListener('scroll', syncHeaderScroll);
      bodyEl.removeEventListener('scroll', syncBodyScroll);
    };
  }, []);

  // TODO: Hover states using zustand + context, hence not necessary to be in the parent. Manage from child
  const setHoveredRowId = useDataTableStore((s) => s.setHoveredRowId);
  const activeDialogRowId = useDataTableStore((s) => s.activeDialogRowId);

  return (
    <>
      <div
        className={`rounded-md no-scrollbar w-full overflow-auto  flex flex-col ${className}`}
        style={{ height: '100%' }}
      >
        <DataTableHeader table={table} ref={headerRef} />
        <DataTableBody
          tasks={tasks}
          setTasks={setTasks}
          table={table}
          parentRef={parentRef}
          onRowHover={setHoveredRowId}
          activeDialogRowId={activeDialogRowId}
        />
      </div>
    </>
  );
};
