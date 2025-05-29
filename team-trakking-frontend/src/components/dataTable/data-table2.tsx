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
  useReactTable,
  ColumnPinningState,
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
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
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
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    state: {
      rowSelection,
      columnPinning,
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
              <DataTableRow key={row.id} row={row} />
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
                  'bg-background',
                  isPinnedLeft &&
                    'sticky left-0 z-40 !bg-sidebar shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
                )}
                style={{
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
}

const DataTableRow = <TData,>({ row }: DataTableRowProps<TData>) => {
  return (
    <TableRow>
      {row.getVisibleCells().map((cell, index) => {
        const isPinnedLeft = cell.column.getIsPinned() === 'left';

        return (
          <TableCell
            key={cell.id}
            className={cn(
              'text-sm z-0 text-gray-800 ',
              isPinnedLeft &&
                'sticky left-0 z-10 bg-primary-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
            )}
            style={{
              left: isPinnedLeft
                ? `${cell.column.getStart('left')}px`
                : undefined,
            }}
          >
            {index === 2 || index === 3 ? (
              <div style={{ marginLeft: `${row.depth * 20}px` }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
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
