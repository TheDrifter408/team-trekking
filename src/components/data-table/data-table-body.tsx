// Enhanced DataTableBody component
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
  DragMoveEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Task } from '@/types/props/Common.ts';
import { mockTasksFlattened } from '@/mock/task.ts';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { DataTableCellSection } from './data-table-cell.tsx';
import { getProjection } from '@/lib/utils/utils.ts';

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
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [draggedRow, setDraggedRow] = useState<any>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<{
    type: 'before' | 'after' | 'child';
    depth: number;
    parentId: string | null;
  } | null>(null);

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
        distance: 6,
      },
    })
  );

  const projected =
    activeId && overId
      ? getProjection({
          rows,
          activeId,
          overId,
          offsetLeft,
          indentationWidth: 36,
          maxDepth: 5,
        })
      : null;

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const draggedRowData = rows.find((row: any) => row.id === active.id);
    setDraggedRow(draggedRowData);
  };

  const onDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  };

  const onDragOver = ({ over }: DragOverEvent) => {
    const newOverId = over?.id.toString() ?? null;
    setOverId(newOverId);

    if (activeId && newOverId && newOverId !== activeId) {
      const projection = getProjection({
        rows,
        activeId,
        overId: newOverId,
        offsetLeft,
        indentationWidth: 30,
        maxDepth: 5,
      });

      if (projection) {
        console.log(projection, 'projection');
        setDropPosition(projection); // { type, depth, parentId }
      } else {
        setDropPosition(null);
      }
    } else {
      setDropPosition(null);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setDraggedRow(null);
    setOverId(null);
    setDropPosition(null);
  };

  const onDragCancel = () => {
    setActiveId(null);
    setDraggedRow(null);
    setOverId(null);
    setDropPosition(null);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}
      onDragOver={onDragOver}
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
              const isDropTarget = row.id === overId && row.id !== activeId;

              return (
                <DataTableRow
                  key={row.id}
                  row={row}
                  virtualRow={virtualRow}
                  onRowHover={onRowHover}
                  activeDialogRowId={activeDialogRowId}
                  isDragOver={isDropTarget}
                  dropPosition={isDropTarget ? dropPosition : null}
                />
              );
            })}
          </SortableContext>
        </div>
      </div>

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
                border: '1px solid #e5e7eb',
              }}
              className="flex items-center opacity-90"
            >
              <DataTableCellSection
                cells={draggedRow.getLeftVisibleCells()}
                position="left"
              />
              <DataTableCellSection
                cells={draggedRow.getCenterVisibleCells()}
                position="center"
              />
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
