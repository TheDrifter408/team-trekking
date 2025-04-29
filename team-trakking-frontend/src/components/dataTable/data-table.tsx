'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
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
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableViewOptions } from '@/components/dataTable/data-table-view-options.tsx';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange: (newData: TData[]) => void;
  filterValue: TValue;
  onFilterChange: (newFilterValue: TValue) => void;
  onRowMouseEnter?: (id: string) => void;
  onRowMouseLeave?: () => void;
}

// Sortable row component
function SortableTableRow({
  row,
  children,
  id,
  onMouseEnter,
  onMouseLeave,
}: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
  };

  // Handler for mouse enter - calls the parent handler with the row ID
  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter(id);
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && 'selected'}
      className={`hover:bg-muted cursor-pointer ${
        isDragging ? 'bg-muted' : ''
      }`}
      {...attributes}
      {...listeners}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </TableRow>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDataChange,
  filterValue,
  onRowMouseEnter,
  onRowMouseLeave,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [expanded, setExpanded] = useState({});

  // Local copy of data to ensure we're always working with the latest state
  const [localData, setLocalData] = useState<TData[]>(data);

  // Sync local data with prop data
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const table = useReactTable({
    data: localData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row: any) => row.subRows,
    onExpandedChange: setExpanded,
    onColumnPinningChange: setColumnPinning,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      columnPinning,
    },
  });

  // Get top-level rows only for drag and drop
  const rootRows = table.getRowModel().rows.filter((row) => row.depth === 0);
  const rootIds = rootRows.map((row) => (row.original as any).id);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Since you're only allowing root-level rows to be draggable,
      // we need to find and reorder only at the root level

      const activeId = active.id.toString();
      const overId = over.id.toString();

      // Find the indices in the rootIds array (not in the entire data structure)
      const oldIndex = rootIds.indexOf(activeId);
      const newIndex = rootIds.indexOf(overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Create a new array by moving the item in the original data array
        const newData = [...localData];
        const [movedItem] = newData.splice(oldIndex, 1);
        newData.splice(newIndex, 0, movedItem);

        // Update both local state and parent component
        setLocalData(newData);
        onDataChange(newData);

        console.log('Item moved:', {
          item: (movedItem as any).name,
          from: oldIndex,
          to: newIndex,
        });
      }
    }
  };

  useEffect(() => {
    if (table.getColumn('name')) {
      table.getColumn('name')?.setFilterValue(filterValue);
    }
  }, [filterValue, table]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center px-4 py-4">
        <DataTableViewOptions table={table} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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

          <TableBody>
            <SortableContext
              items={rootIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => {
                // Check if this is a top-level row
                const isRootRow = row.depth === 0;

                // Render sortable row for top-level items, regular row for children
                if (isRootRow) {
                  return (
                    <SortableTableRow
                      key={row.id}
                      id={(row.original as any).id}
                      row={row}
                      onMouseEnter={onRowMouseEnter}
                      onMouseLeave={onRowMouseLeave}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          className=" text-sm text-gray-800"
                        >
                          {index === 2 || index === 3 ? (
                            <div style={{ marginLeft: `${row.depth * 20}px` }}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </SortableTableRow>
                  );
                } else {
                  // Regular row for children - also add mouse events
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="hover:bg-muted transition-all duration-150 cursor-pointer"
                      onMouseEnter={() =>
                        onRowMouseEnter &&
                        onRowMouseEnter((row.original as any).id)
                      }
                      onMouseLeave={onRowMouseLeave}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          className="py-2 text-sm text-gray-800"
                        >
                          {index === 2 || index === 3 ? (
                            <div style={{ marginLeft: `${row.depth * 20}px` }}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                }
              })}
            </SortableContext>

            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
}
