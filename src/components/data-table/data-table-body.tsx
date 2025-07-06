import React, { useState, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  MeasuringStrategy,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/types/props/Common.ts';
import { generateTask } from '@/mock/task';
import { createPortal } from 'react-dom';
import { DataTableCellSection } from './data-table-cell.tsx';
import {
  getProjection,
  Projection,
  buildTaskTree,
} from '@/lib/utils/data-table-utils.ts';
import { toast } from 'sonner';
import { Row } from '@tanstack/react-table';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  activeDialogRowId,
  tasks,
  setTasks,
}: DataTableBodyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [projected, setProjected] = useState<Projection | null>(null);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [draggedRow, setDraggedRow] = useState<any>(null);

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Reduce distance for more responsive dragging
      },
    })
  );

  const sensorContext = useRef<{ items: Row<Task>[]; offset: number }>({
    items: rows,
    offset: horizontalOffset,
  });

  useEffect(() => {
    sensorContext.current = {
      items: rows,
      offset: horizontalOffset,
    };
  }, [rows, horizontalOffset]);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setOverId(active.id as string);
    const draggedRowData = rows.find((row: any) => row.id === active.id);
    setDraggedRow(draggedRowData);
  };

  const onDragMove = ({ delta }: DragMoveEvent) => {
    setHorizontalOffset(delta.x);
  };

  const onDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id.toString() ?? null);
  };

  const onDragEnd = () => {
    if (!activeId || !overId || activeId === overId) {
      resetState();
      return;
    }

    const activeRow = rows.find((row: Row<Task>) => row.id === activeId);
    const overRow = rows.find((row: Row<Task>) => row.id === overId);

    const activeTask = activeRow?.original;
    const overTask = overRow?.original;

    if (!activeTask || !overTask || !activeRow || !overRow) {
      resetState();
      return;
    }

    // Determine drop type
    const overOffset = (overTask.depth ?? 1) * 20;
    const dropType = horizontalOffset >= overOffset ? 'child' : 'sibling';

    // Update task hierarchy
    const updatedTask: Task = {
      ...activeTask,
      parentId: dropType === 'child' ? overTask.id : overTask.parentId,
      depth: dropType === 'child' ? (overTask.depth ?? 0) + 1 : overTask.depth,
    };

    let newDepth = overTask.depth ?? 1;
    if (activeTask.subTask.length > 0) {
      newDepth += 1;
      if (activeTask.subTask.subTask.length > 0) newDepth += 1;
    }

    if (newDepth > 2) {
      toast.error(
        'Only 3 levels of nested subtasks are possible. Select fewer levels to drop the task.'
      );
      resetState();
      return;
    }

    // Expand if dropped as child
    if (dropType === 'child' && !overRow.getIsExpanded()) {
      overRow.toggleExpanded();
    }

    const updatedTasks = [...tasks];

    const oldIndex = updatedTasks.findIndex((t) => t.id === activeTask.id);
    if (oldIndex !== -1) updatedTasks.splice(oldIndex, 1);

    const overIndex = updatedTasks.findIndex((t) => t.id === overTask.id);
    updatedTasks.splice(overIndex + 1, 0, updatedTask);

    setTasks(updatedTasks);
    resetState();
  };

  const onDragCancel = () => {
    resetState();
  };

  const resetState = () => {
    setActiveId(null);
    setOverId(null);
    setHorizontalOffset(0);
    setProjected(null);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      onDragMove={onDragMove}
      onDragOver={onDragOver}
      sensors={sensors}
      measuring={measuring}
    >
      <div className="flex-1" ref={parentRef}>
        <div
          style={{
            height: `${totalHeight}px`,
            width: table.getTotalSize() + 20,
            contain: 'strict',
            position: 'relative',
          }}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={table.getRowModel().rows.map((row: Task) => row.id)}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const isDropTarget = row.id === overId && row.id !== activeId;
              const overOffset = row.depth * 20;
              let dropType = '';
              if (horizontalOffset >= overOffset) dropType = 'child';
              else dropType = 'sibling';
              const indentation =
                dropType === 'child' ? overOffset + 30 : overOffset - 10;
              return (
                <React.Fragment key={row.id}>
                  <DataTableRow
                    key={row.id}
                    row={row}
                    virtualRow={virtualRow}
                    onRowHover={onRowHover}
                    activeDialogRowId={activeDialogRowId}
                    overId={overId ?? ''}
                    indent={
                      isDropTarget
                        ? (projected?.depth ?? row.depth) * 30
                        : row.depth * 30
                    }
                  />
                  {isDropTarget && (
                    <DropIndicator
                      top={virtualRow.start + virtualRow.size}
                      indent={indentation}
                    />
                  )}
                </React.Fragment>
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
                ...DRAG_OVERLAY_STYLE,
                width: table.getTotalSize(),
              }}
              className="flex items-center opacity-90"
            >
              <DataTableCellSection
                cells={draggedRow.getCenterVisibleCells()}
                position="center"
              />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

// DropIndicator.tsx
interface DropIndicatorProps {
  top: number;
  indent: number;
}

export const DropIndicator = ({ top, indent }: DropIndicatorProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: top - 1,
        left: 0,
        right: 0,
        height: '2px',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div
        style={{
          marginLeft: `${indent + 110}px`,
          height: '100%',
          borderRadius: '1px',
          transition: 'margin-left 120ms ease',
        }}
        className={'bg-theme-main'}
      />
    </div>
  );
};
const DRAG_OVERLAY_STYLE = {
  height: '40px',
  backgroundColor: 'white',
  opacity: '0.8',
  borderRadius: '4px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  border: '1px solid #e5e7eb',
};
