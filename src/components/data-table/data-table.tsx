import { useState, useRef } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  ColumnSizingState,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { Columns } from '@/components/data-table/columns';
import { mockTasks } from '@/mock';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body.tsx';
import { DataTableProps } from '@/types/props/DataTableProps.ts';

export const DataTable = ({ className = '' }: DataTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});

  const table = useReactTable({
    data: mockTasks,
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
        left: [Columns[0]?.id || ''],
        right: [Columns[Columns.length - 1]?.id || ''],
      },
    },
  });

  // TODO: Hover states using zustand + context, hence not necessary to be in the parent. Manage from child
  const setHoveredRowId = useDataTableStore((s) => s.setHoveredRowId);
  const activeDialogRowId = useDataTableStore((s) => s.activeDialogRowId);

  return (
    <div
      className={`rounded-md overflow-hidden flex flex-col ${className}`}
      style={{ height: '100%' }}
    >
      <DataTableHeader table={table} />
      <DataTableBody
        table={table}
        parentRef={parentRef}
        onRowHover={setHoveredRowId}
        activeDialogRowId={activeDialogRowId}
      />
    </div>
  );
};
