'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
  getExpandedRowModel,
  ExpandedState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';

import { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowHover: (id: string) => void;
  onRowLeave: () => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  expandedRows?: ExpandedState;
  onExpandedChange?: (expanded: ExpandedState) => void;
}

export function DataTable<TData>({
  columns,
  data,
  onRowHover,
  onRowLeave,
  onSelectionChange,
  expandedRows = {},
  onExpandedChange,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>(expandedRows);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      rowSelection,
      expanded,
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newSelection);

      // Call the callback with selected IDs
      if (onSelectionChange) {
        const selectedIds = Object.keys(newSelection).filter(
          (key) => newSelection[key]
        );
        onSelectionChange(selectedIds);
      }
    },
    onExpandedChange: (updater) => {
      const newExpanded =
        typeof updater === 'function' ? updater(expanded) : updater;
      setExpanded(newExpanded);
      onExpandedChange?.(newExpanded);
    },
    enableRowSelection: true,
    enableExpanding: true,
    getRowId: (row: any) => row.id.toString(),
    getSubRows: (row: any) => row.subTask || [], // Define how to get subrows
    getRowCanExpand: (row) => {
      const original = row.original as any;
      return (original.subTask && original.subTask.length > 0) || false;
    },
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const ROW_HEIGHT = 40;

  const expandedRowsModel = table.getExpandedRowModel();

  const expandedRowsModel = table.getExpandedRowModel();

  const rowVirtualizer = useVirtualizer({
    count: expandedRowsModel.rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div
      ref={parentRef}
      className="h-screen pb-[40px] px-3 overflow-auto rounded-md"
    >
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`h-[${ROW_HEIGHT}]`}
                  style={{
                    width: header.getSize(),
                    minWidth: header.column.columnDef.minSize,
                    maxWidth: header.column.columnDef.maxSize,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody style={{ position: 'relative', height: `${totalSize}px` }}>
          {virtualRows.map((virtualRow) => {
            const row = expandedRowsModel.rows[virtualRow.index];
            const isSubRow = row.depth > 0;

            return (
              <TableRow
                key={row.id}
                onMouseEnter={() => onRowHover(row.original.id.toString())}
                onMouseLeave={onRowLeave}
                data-state={row.getIsSelected() && 'selected'}
                className={`
                  absolute left-0 top-0 w-full table-fixed border-b border-border group
                  ${isSubRow ? 'bg-gray-50/50 dark:bg-gray-900/50' : ''}
                `}
                style={{
                  height: `${ROW_HEIGHT}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'table',
                  tableLayout: 'fixed',
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-2 overflow-hidden"
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      maxWidth: cell.column.columnDef.maxSize,
                      paddingLeft:
                        cell.column.id === 'name' && isSubRow
                          ? `${row.depth * 20 + 8}px`
                          : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
