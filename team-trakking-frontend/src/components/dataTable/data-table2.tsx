'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  Table as TableType,
  Row as RowType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
  ColumnPinningState,
  ExpandedState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils.ts';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { getColumns } from '@/pages/dashboard/components/columns.tsx';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange: (newData: TData[]) => void;
  filterValue: TValue;
  onFilterChange: (newFilterValue: TValue) => void;
  onRowMouseEnter?: (id: string) => void;
  onRowMouseLeave?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  onRowMouseEnter,
  onRowMouseLeave,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(() => {
    // Ensure columns have IDs before setting up pinning
    const firstColumnId =
      columns[0]?.id || (columns[0] as any)?.accessorKey || '0';
    return {
      left: columns.length > 0 ? [firstColumnId] : [],
    };
  });

  const [localData, setLocalData] = useState<TData[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const table = useReactTable({
    data: localData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onExpandedChange: setExpanded,
    getSubRows: (row: any) => row.subRows,
    state: {
      rowSelection,
      columnPinning,
      expanded,
    },
  });

  useEffect(() => {
    if (table.getColumn('name')) {
      table.getColumn('name')?.setFilterValue(filterValue);
    }
  }, [filterValue, table]);

  return (
    <div className="rounded-md">
      <div className="relative overflow-auto">
        <Table className="relative">
          <DataTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <DataTableRow
                key={row.id}
                row={row}
                onRowMouseEnter={onRowMouseEnter}
                onRowMouseLeave={onRowMouseLeave}
              />
            ))}
            {table.getRowModel().rows.length === 0 && (
              <DataTableEmptyRow columnsLength={columns.length} />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface DataTableHeaderProps<TData> {
  table: TableType<TData>;
}

const DataTableHeader = <TData,>({ table }: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isPinnedLeft = header.column.getIsPinned() === 'left';

            return (
              <TableHead
                key={header.id}
                className={cn(
                  'bg-background ',
                  isPinnedLeft &&
                    'sticky !p-0 left-0 z-10 bg-gradient-to-r from-background via-background/70 to-transparent shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
                )}
                style={{
                  width: header.column.columnDef.size,
                  minWidth: header.column.columnDef.size,
                  maxWidth: header.column.columnDef.size,
                  left: isPinnedLeft
                    ? `${header.column.getStart('left')}px`
                    : undefined,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

interface DataTableRowProps<TData> {
  row: RowType<TData>;
  onRowMouseEnter?: (id: string) => void;
  onRowMouseLeave?: () => void;
}

const DataTableRow = <TData,>({
  row,
  onRowMouseEnter,
  onRowMouseLeave,
}: DataTableRowProps<TData>) => {
  const onMouseEnter = () => {
    if (onRowMouseEnter) {
      onRowMouseEnter(row.id);
    }
  };

  const onMouseLeave = () => {
    if (onRowMouseLeave) {
      onRowMouseLeave();
    }
  };
  return (
    <TableRow
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn('transition-colors group')}
    >
      {row.getVisibleCells().map((cell) => {
        const isPinnedLeft = cell.column.getIsPinned() === 'left';

        return (
          <TableCell
            key={cell.id}
            className={cn(
              'text-sm z-0 !p-0 text-gray-800 !m-0',
              isPinnedLeft &&
                'sticky left-0 z-10 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
            )}
            style={{
              width: cell.column.columnDef.size,
              minWidth: cell.column.columnDef.size,
              maxWidth: cell.column.columnDef.size,
              left: isPinnedLeft
                ? `${cell.column.getStart('left')}px`
                : undefined,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

interface DataTableEmptyRowProps {
  columnsLength: number;
}

const DataTableEmptyRow = ({ columnsLength }: DataTableEmptyRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={columnsLength} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};
