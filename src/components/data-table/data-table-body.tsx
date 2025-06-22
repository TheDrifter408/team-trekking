import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  DragOverEvent,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';
import { cn } from '@/lib/utils';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = () => {
    // Handle the move logic here using drop target context
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="flex-1" ref={parentRef}>
        <div
          style={{
            height: `${totalHeight}px`,
            width: table.getTotalSize(),
            contain: 'strict',
            position: 'relative',
          }}
        >
          <SortableContext items={virtualRows.map((r) => rows[r.index].id)}>
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <div key={row.id}>
                  <DataTableRow
                    row={row}
                    virtualRow={virtualRow}
                    onRowHover={onRowHover}
                    activeDialogRowId={activeDialogRowId}
                  />
                </div>
              );
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};
