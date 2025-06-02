'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowHover: (id: string) => void;
  onRowLeave: () => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function DataTable<TData>({
  columns,
  data,
  onRowHover,
  onRowLeave,
  onSelectionChange,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
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
    enableRowSelection: true,
    getRowId: (row: any) => row.id.toString(), // Ensure row IDs are strings
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const ROW_HEIGHT = 36; // Increased for better spacing

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
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
      <Table className={'table-fixed'}>
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
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <TableRow
                key={row.id}
                onMouseEnter={() =>
                  onRowHover((row.original as any).id.toString())
                }
                onMouseLeave={onRowLeave}
                data-state={row.getIsSelected() && 'selected'}
                className="absolute left-0 top-0 w-full table-fixed border-b border-border group"
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
                    className="px-2 py-2 overflow-hidden"
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      maxWidth: cell.column.columnDef.maxSize,
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
