import { useState } from 'react';
import {
  pointerWithin,
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
import {
  flattenTasks,
  insertTaskAt,
  removeTaskById,
  mockTasks,
} from '@/mock/task.ts';
import { cn } from '@/lib/utils';
import { Task } from '@/types/props/Common.ts';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  tasks,
  setTasks,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  const [taskTree, setTaskTree] = useState<Task[]>(mockTasks);

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(useSensor(PointerSensor));

  const getParentId = (id: string): string | null => {
    const parts = id.split('.');
    return parts.length > 1 ? parts.slice(0, -1).join('.') : null;
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveDropZoneId(null);

    if (!active || !over) return;

    const activeId = active.id;
    const overId = over.id;

    if (typeof overId !== 'string' || !overId.startsWith('dropzone-')) return;

    const { rowId: targetRowId, position, depth } = over.data?.current || {};
    const parentId = getParentId(targetRowId);

    const flat = flattenTasks(taskTree);
    const draggedTask = flat.find((t) => t.id === activeId);
    if (!draggedTask) return;

    console.log('%c DROP RESULT:', 'color: limegreen; font-weight: bold');
    console.log({
      draggedId: activeId,
      dropZoneId: overId,
      targetRowId,
      parentId,
      position, // 'above' or 'below'
      dropDepth: depth,
    });

    // Step 1: Remove dragged item
    const treeWithoutDragged = removeTaskById(taskTree, activeId);

    // Step 2: Insert dragged task into new location
    const updatedTree = insertTaskAt(
      treeWithoutDragged,
      parentId,
      draggedTask,
      targetRowId,
      position
    );

    setTasks(updatedTree);
  };

  const [activeDropZoneId, setActiveDropZoneId] = useState<string | null>(null);

  const onDragOver = (event: DragOverEvent) => {
    const id = event.over?.id?.toString();
    if (id && id.startsWith('dropzone-')) {
      setActiveDropZoneId(id);
    } else {
      setActiveDropZoneId(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={pointerWithin}
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
                  <div>
                    <DropZone
                      rowId={row.id}
                      position="below"
                      parentId={row.parentId ?? null}
                      depth={row.depth}
                      top={virtualRow.start + 40}
                      activeDropZoneId={activeDropZoneId}
                      isExpanded={row.getIsExpanded?.()}
                    />
                  </div>
                </div>
              );
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

interface DropZoneProps {
  rowId: string;
  depth: number;
  top: number;
  position?: 'above' | 'below';
  activeDropZoneId: string | null;
  isExpanded?: boolean;
  parentId: string | null;
}

const DropZone = ({
  rowId,
  depth,
  top,
  position,
  activeDropZoneId,
  isExpanded,
  parentId,
}: DropZoneProps) => {
  const zoneId = `dropzone-${rowId}-${position || 'below'}`;

  const { setNodeRef } = useDroppable({
    id: zoneId,
    data: { rowId, depth, position, parentId },
  });
  const isActive = activeDropZoneId === zoneId;
  const effectiveDepth = position === 'below' && isExpanded ? depth + 1 : depth;
  return (
    <div
      ref={setNodeRef}
      className="absolute w-full h-[10px] z-10 pointer-events-auto"
      style={{
        top: top, // sits between current and next row
        paddingLeft: `${effectiveDepth * 60}px`,
      }}
    >
      <div
        className={cn(
          'h-[2px] w-full transition-all duration-150 rounded',
          isActive ? 'bg-theme-main shadow-md' : 'bg-transparent'
        )}
      />
    </div>
  );
};
