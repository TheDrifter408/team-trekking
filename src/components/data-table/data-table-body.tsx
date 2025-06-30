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
  tasks,
  setTasks,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [draggedRow, setDraggedRow] = useState<any>(null);

  const [overId, setOverId] = useState<string | null>(null);

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

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    const draggedRowData = rows.find((row: any) => row.id === active.id);
    setDraggedRow(draggedRowData);
  };

  const onDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  };

  const [projected, setProjected] = useState();

  const onDragOver = ({ over }: DragOverEvent) => {
    const overId = over?.id?.toString() ?? null;
    setOverId(overId);

    if (activeId && overId && activeId !== overId) {
      const projection = getProjection({
        rows,
        activeId,
        overId,
        offsetLeft,
        indentationWidth: 30,
        maxDepth: 5,
      });

      setProjected(projection); // ✅ Use this for visual & final drop
    } else {
      setProjected(null);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (!projected) return;

    const updated = moveTaskInTree(
      tasks,
      active.id as string,
      over.id as string,
      projected.type,
      projected.parentId,
      projected.depth
    );

    setTasks(updated);

    setActiveId(null);
    setDraggedRow(null);
    setOverId(null);
  };

  const onDragCancel = () => {
    setActiveId(null);
    setDraggedRow(null);
    setOverId(null);
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
                  dropPosition={isDropTarget ? projected : null} // 👈 Pass projection
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

function moveTaskInTree(
  tasks: Task[],
  taskId: string,
  targetId: string,
  position: 'before' | 'after' | 'child',
  newParentId: string | null,
  newDepth: number
): Task[] {
  const flat: Task[] = [];

  const flatten = (list: Task[]) => {
    for (const task of list) {
      flat.push(task);
      if (task.subTask?.length) flatten(task.subTask);
    }
  };

  flatten(tasks);

  const originalTask = flat.find((t) => t.id === taskId);
  if (!originalTask) return tasks;

  const clonedTask = {
    ...originalTask,
    parentId: newParentId,
    depth: newDepth,
    subTask: originalTask.subTask ? [...originalTask.subTask] : [],
  };

  // Recalculate all child depths
  recalculateDepths(clonedTask.subTask, newDepth + 1);

  // Step 1: Remove the task
  const removeTask = (list: Task[]): Task[] =>
    list
      .map((t) => ({ ...t, subTask: removeTask(t.subTask || []) }))
      .filter((t) => t.id !== taskId);

  const withoutMoved = removeTask([...tasks]);

  // Step 2: Insert it
  const insertTask = (list: Task[]): Task[] => {
    const index = list.findIndex((t) => t.id === targetId);

    if (index === -1) {
      return [...list, clonedTask]; // fallback
    }

    if (position === 'before') {
      return [...list.slice(0, index), clonedTask, ...list.slice(index)];
    }

    if (position === 'after') {
      return [
        ...list.slice(0, index + 1),
        clonedTask,
        ...list.slice(index + 1),
      ];
    }

    if (position === 'child') {
      return list.map((t) => {
        if (t.id === targetId) {
          return {
            ...t,
            subTask: [...(t.subTask || []), clonedTask],
          };
        }
        return {
          ...t,
          subTask: insertTask(t.subTask || []),
        };
      });
    }

    return list;
  };

  return insertTask(withoutMoved);
}

function recalculateDepths(tasks: Task[], baseDepth: number) {
  tasks.forEach((task) => {
    task.depth = baseDepth;
    if (task.subTask && task.subTask.length) {
      recalculateDepths(task.subTask, baseDepth + 1);
    }
  });
}
