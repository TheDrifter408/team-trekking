import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Task } from '@/types/props/Common.ts';
import { mockTasksFlattened } from '@/mock/task.ts';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { DataTableCellSection } from './data-table-cell.tsx';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onTaskMove?: (
    movedTask: Task,
    newParent: Task | null,
    position: string
  ) => void;
  maxDepth?: number;
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedRow, setDraggedRow] = useState<any>(null);

  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6, // Small distance to prevent accidental drags
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // Find the row being dragged
    const draggedRowData = rows.find((row: any) => row.id === active.id);
    setDraggedRow(draggedRowData);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('Drag ended:', { active: active.id, over: over?.id });
    console.log(mockTasksFlattened, 'onDragEnd');

    // Reset drag state
    setActiveId(null);
    setDraggedRow(null);

    // on your drag logic here
    if (over && active.id !== over.id) {
      // Implement your reordering logic
    }
  };

  const onDragCancel = () => {
    setActiveId(null);
    setDraggedRow(null);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      sensors={sensors}
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
          <SortableContext
            items={table.getRowModel().rows.map((row: Task) => row.id)}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <DataTableRow
                  key={row.id}
                  row={row}
                  virtualRow={virtualRow}
                  onRowHover={onRowHover}
                  activeDialogRowId={activeDialogRowId}
                />
              );
            })}
          </SortableContext>
        </div>
      </div>

      {/* DragOverlay for better visual feedback */}
      {createPortal(
        <DragOverlay>
          {activeId && draggedRow ? (
            <div
              style={{
                width: table.getTotalSize(),
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              }}
              className="flex items-center"
            >
              {/* Left pinned cells */}
              <DataTableCellSection
                cells={draggedRow.getLeftVisibleCells()}
                position="left"
              />
              {/* Center (scrollable) cells */}
              <DataTableCellSection
                cells={draggedRow.getCenterVisibleCells()}
                position="center"
              />
              {/* Right pinned cells */}
              <DataTableCellSection
                cells={draggedRow.getRightVisibleCells()}
                position="right"
              />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
