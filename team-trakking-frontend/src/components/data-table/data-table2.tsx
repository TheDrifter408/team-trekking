'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  Table as TableType,
  Row as RowType,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  getExpandedRowModel,
  ColumnPinningState,
  ColumnSizingState,
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
  minColumnWidth?: number; // Default min width for all columns
  maxColumnWidth?: number; // Default max width for all columns
  columnSizeConfig?: Record<string, { min?: number; max?: number }>; // Per-column size config
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  minColumnWidth = 100,
  maxColumnWidth = 400,
  columnSizeConfig = {},
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
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
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange',
    state: {
      rowSelection,
      columnPinning,
      columnSizing,
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
        <Table
          className="relative"
          style={{
            width: table.getCenterTotalSize(),
          }}
        >
          <DataTableHeader
            table={table}
            minColumnWidth={minColumnWidth}
            maxColumnWidth={maxColumnWidth}
            columnSizeConfig={columnSizeConfig}
          />
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
  minColumnWidth: number;
  maxColumnWidth: number;
  columnSizeConfig: Record<string, { min?: number; max?: number }>;
}

const DataTableHeader = <TData,>({
  table,
  minColumnWidth,
  maxColumnWidth,
  columnSizeConfig,
}: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isPinnedLeft = header.column.getIsPinned() === 'left';
            const isPinnedRight = header.column.getIsPinned() === 'right';
            const columnId = header.column.id;
            const columnConfig = columnSizeConfig[columnId] || {};
            const minWidth = columnConfig.min || minColumnWidth;
            const maxWidth = columnConfig.max || maxColumnWidth;

            return (
              <TableHead
                key={header.id}
                className={cn(
                  'bg-background relative',
                  isPinnedLeft &&
                    'sticky left-0 z-10 border-r bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]',
                  isPinnedRight &&
                    'sticky right-0 border-l bg-background shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]'
                )}
                style={{
                  left: isPinnedLeft
                    ? `${header.column.getStart('left')}px`
                    : undefined,
                  right: isPinnedRight
                    ? `${header.column.getAfter('right')}px`
                    : undefined,
                  width: header.getSize(),
                  minWidth: minWidth,
                  maxWidth: maxWidth,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={cn(
                      'absolute top-0 right-0 h-full w-1 cursor-col-resize select-none touch-none',
                      'hover:theme-main hover:opacity-100',
                      'bg-theme-main opacity-0 transition-opacity',
                      header.column.getIsResizing() &&
                        'hover:bg-theme-main-dark  opacity-100'
                    )}
                    style={{
                      transform: 'translateX(50%)',
                    }}
                    onMouseMove={(e) => {
                      // Enforce min/max width constraints during resize
                      const currentWidth = header.column.getSize();
                      if (currentWidth < minWidth) {
                        header.column.resetSize();
                      } else if (currentWidth > maxWidth) {
                        header.column.resetSize();
                      }
                    }}
                  />
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
              'text-sm text-gray-800 bg-background',
              isPinnedLeft &&
                'sticky left-0 z-10 border-r  shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
            )}
            style={{
              left: isPinnedLeft
                ? `${cell.column.getStart('left')}px`
                : undefined,
              width: cell.column.getSize(),
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
