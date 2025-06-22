import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  DragOverEvent,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';

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

  const [activeDropZoneId, setActiveDropZoneId] = useState<string | null>(null);

  const onDragOver = (event: DragOverEvent) => {
    if (event.over?.id?.toString().startsWith('dropzone-')) {
      setActiveDropZoneId(event.over.id.toString());
    } else {
      setActiveDropZoneId(null);
    }
  };

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

              const top = virtualRow.start;
              const depth = row.depth ?? 0;

              return (
                <div key={row.id}>
                  <DataTableRow
                    row={row}
                    virtualRow={virtualRow}
                    onRowHover={onRowHover}
                    activeDialogRowId={activeDialogRowId}
                  />
                  <DropZone
                    rowId={row.id}
                    dropType="sibling"
                    top={top + 40}
                    depth={depth}
                    activeDropZoneId={activeDropZoneId}
                  />
                  <DropZone
                    rowId={row.id}
                    dropType="child"
                    top={top + 40 + 6}
                    depth={depth + 1}
                    activeDropZoneId={activeDropZoneId}
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

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export const DropZone = ({
  rowId,
  dropType,
  top,
  depth = 0,
  activeDropZoneId,
}: {
  rowId: string;
  dropType: 'sibling' | 'child';
  top: number;
  depth?: number;
  activeDropZoneId: string | null;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-${rowId}-${dropType}`,
    data: {
      rowId,
      dropType,
      depth,
    },
  });

  const isActive = activeDropZoneId === `dropzone-${rowId}-${dropType}`;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'absolute h-[6px] w-full z-10 transition-all',
        isActive ? 'bg-blue-500' : 'bg-transparent'
      )}
      style={{
        top,
        paddingLeft: `${depth * 20}px`,
      }}
    />
  );
};
