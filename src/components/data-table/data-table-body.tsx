import { useState } from 'react';
import {
  pointerWithin,
  DndContext,
  PointerSensor,
  useSensor,
  DragOverEvent,
  useSensors,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';
import { flattenTasks, removeTaskById, insertTaskAt } from '@/mock/task.ts';
import { cn } from '@/lib/utils/utils.ts';
import { Task } from '@/types/props/Common.ts';

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

interface DragState {
  activeTask: Task | null;
  draggedOverZone: string | null;
  isDragging: boolean;
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  tasks,
  setTasks,
  activeDialogRowId,
  onTaskMove,
  maxDepth = 3,
}: DataTableBodyProps) => {
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  const flat = flattenTasks(tasks);
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before starting drag
      },
    })
  );

  // Enhanced drag state management
  const [dragState, setDragState] = useState<DragState>({
    activeTask: null,
    draggedOverZone: null,
    isDragging: false,
  });

  const [activeDropZoneId, setActiveDropZoneId] = useState<string | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const activeTask = event.active.data.current?.task;
    if (activeTask) {
      setDragState({
        activeTask,
        draggedOverZone: null,
        isDragging: true,
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset drag state
    setDragState({
      activeTask: null,
      draggedOverZone: null,
      isDragging: false,
    });
    setActiveDropZoneId(null);

    if (!active || !over) {
      return;
    }

    const draggedTask = active.data.current?.task;
    if (!draggedTask) {
      return;
    }

    console.log('🎯 Processing drop:', {
      draggedTask: draggedTask.name,
      draggedId: draggedTask.id,
      overId: over.id,
      overData: over.data?.current,
    });

    // Handle drop zone drops (hierarchical changes)
    if (typeof over.id === 'string' && over.id.startsWith('dropzone-')) {
      handleDropZoneDrop(draggedTask, over);
      return;
    }

    // Handle direct row drops (same-level reordering)
    if (typeof over.id === 'string') {
      handleDirectRowDrop(draggedTask, over.id);
      return;
    }
  };

  const handleDropZoneDrop = (draggedTask: Task, over: any) => {
    const dropData = over.data?.current;
    if (!dropData) return;

    const {
      taskId: targetTaskId,
      position,
      depth: targetDepth,
      parentId: dropZoneParentId,
    } = dropData;

    // Edge case: Prevent dropping on self
    if (draggedTask.id === targetTaskId) {
      return;
    }

    // Edge case: Prevent dropping parent on its descendant
    if (isTaskDescendant(draggedTask, targetTaskId)) {
      return;
    }

    // Determine the new parent based on drop zone
    let newParentId: string | null = null;
    let siblingId: string = targetTaskId;

    if (position === 'below') {
      // Check if target task is expanded and we're dropping at increased depth
      const targetTask = findTaskById(tasks, targetTaskId);
      const targetRow = rows.find((r) => r.original.id === targetTaskId);
      const isTargetExpanded = targetRow?.getIsExpanded?.() || false;

      if (isTargetExpanded && targetDepth < maxDepth - 1) {
        // Drop as child of target task
        newParentId = targetTaskId;
        siblingId = ''; // Insert at the beginning of children
      } else {
        // Drop as sibling after target task
        newParentId = dropZoneParentId;
      }
    } else {
      // Drop as sibling before target task
      newParentId = dropZoneParentId;
      console.log(findTaskById(tasks, targetTaskId)?.name);
    }

    // Edge case: Check depth limits
    if (newParentId && getTaskDepth(tasks, newParentId) >= maxDepth - 1) {
      return;
    }

    performTaskMove(draggedTask, newParentId, siblingId, position);
  };

  const handleDirectRowDrop = (draggedTask: Task, targetRowId: string) => {
    const targetTask = findTaskById(tasks, targetRowId);
    if (!targetTask) return;

    // Only allow reordering within the same parent level
    if (draggedTask.parentId === targetTask.parentId) {
      performTaskMove(draggedTask, targetTask.parentId, targetRowId, 'above');
    } else {
    }
  };

  const performTaskMove = (
    draggedTask: Task,
    newParentId: string | null,
    siblingId: string,
    position: 'above' | 'below'
  ) => {
    try {
      // Step 1: Remove the task from its current position
      let updatedTasks = removeTaskById(tasks, draggedTask.id);

      // Step 2: Create the updated task with new parent
      const updatedTask: Task = {
        ...draggedTask,
        parentId: newParentId,
      };

      // Step 3: Insert at the new position
      if (siblingId) {
        updatedTasks = insertTaskAt(
          updatedTasks,
          newParentId,
          updatedTask,
          siblingId,
          position
        );
      } else {
        // Insert as first child if no sibling specified
        updatedTasks = insertTaskAt(updatedTasks, newParentId, updatedTask);
      }

      // Step 4: Update subtask counts
      updatedTasks = updateSubtaskCounts(updatedTasks);

      // Step 5: Validate the new structure
      if (validateTaskStructure(updatedTasks)) {
        setTasks(updatedTasks);

        // Notify parent component of the change
        if (onTaskMove) {
          const newParent = newParentId
            ? findTaskById(updatedTasks, newParentId)
            : null;
          onTaskMove(updatedTask, newParent, position);
        }
      }
    } catch (error) {}
  };

  const onDragOver = (event: DragOverEvent) => {
    const overId = event.over?.id?.toString();

    if (overId && overId.startsWith('dropzone-')) {
      setActiveDropZoneId(overId);
      setDragState((prev) => ({ ...prev, draggedOverZone: overId }));
    } else {
      setActiveDropZoneId(null);
      setDragState((prev) => ({ ...prev, draggedOverZone: null }));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
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
          <SortableContext
            items={virtualRows.map((r) => rows[r.index].id)}
            strategy={verticalListSortingStrategy}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const isBeingDragged =
                dragState.activeTask?.id === row.original.id;

              return (
                <div key={row.id}>
                  <DataTableRow
                    row={row}
                    virtualRow={virtualRow}
                    onRowHover={onRowHover}
                    activeDialogRowId={activeDialogRowId}
                  />

                  {/* Drop zones - only show when dragging and not on the dragged item */}
                  {dragState.isDragging && !isBeingDragged && (
                    <>
                      {/* Above drop zone */}
                      <DropZone
                        rowId={row.id}
                        taskId={row.original.id}
                        position="above"
                        parentId={row.original.parentId ?? null}
                        depth={row.depth}
                        top={virtualRow.start}
                        activeDropZoneId={activeDropZoneId}
                        isExpanded={false}
                        maxDepth={maxDepth}
                        draggedTask={dragState.activeTask}
                      />

                      {/* Below drop zone */}
                      <DropZone
                        rowId={row.id}
                        taskId={row.original.id}
                        position="below"
                        parentId={row.original.parentId ?? null}
                        depth={row.depth}
                        top={virtualRow.start + 40}
                        activeDropZoneId={activeDropZoneId}
                        isExpanded={row.getIsExpanded?.()}
                        maxDepth={maxDepth}
                        draggedTask={dragState.activeTask}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

// Enhanced DropZone component with better validation
interface DropZoneProps {
  rowId: string;
  taskId: string;
  depth: number;
  top: number;
  position: 'above' | 'below';
  activeDropZoneId: string | null;
  isExpanded?: boolean;
  parentId: string | null;
  maxDepth: number;
  draggedTask: Task | null;
}

const DropZone = ({
  rowId,
  taskId,
  depth,
  top,
  position,
  activeDropZoneId,
  isExpanded,
  parentId,
  maxDepth,
  draggedTask,
}: DropZoneProps) => {
  const zoneId = `dropzone-${rowId}-${position}`;

  // Determine if this is a valid drop zone
  const isValidDropZone = () => {
    if (!draggedTask) return false;

    // Can't drop on self
    if (draggedTask.id === taskId) return false;

    // Can't drop parent on descendant
    if (isTaskDescendant(draggedTask, taskId)) return false;

    // Check depth limits for child drops
    if (position === 'below' && isExpanded && depth >= maxDepth - 1) {
      return false;
    }

    return true;
  };

  const { setNodeRef } = useDroppable({
    id: zoneId,
    data: {
      rowId,
      depth,
      position,
      parentId,
      taskId,
      isValid: isValidDropZone(),
    },
    disabled: !isValidDropZone(),
  });

  const isActive = activeDropZoneId === zoneId;
  const effectiveDepth = position === 'below' && isExpanded ? depth + 1 : depth;
  const isValid = isValidDropZone();

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'absolute w-full h-[8px] z-20 pointer-events-auto',
        !isValid && 'pointer-events-none'
      )}
      style={{
        top: top,
        paddingLeft: `${effectiveDepth * 60}px`,
      }}
    >
      <div
        className={cn(
          'h-[2px] w-full transition-all duration-200 rounded',
          isActive && isValid ? 'bg-theme-main shadow-lg' : 'bg-transparent',
          isActive && !isValid ? 'bg-red-400' : ''
        )}
      />

      {/* Visual indicator for child drop */}
      {isActive && isValid && position === 'below' && isExpanded && (
        <div
          className="absolute left-0 top-0 w-4 h-[2px] bg-theme-main rounded"
          style={{ marginLeft: `${(effectiveDepth - 1) * 60 + 50}px` }}
        />
      )}
    </div>
  );
};

// Helper functions
const findTaskById = (tasks: Task[], taskId: string): Task | null => {
  for (const task of tasks) {
    if (task.id === taskId) return task;
    if (task.subTask?.length) {
      const found = findTaskById(task.subTask, taskId);
      if (found) return found;
    }
  }
  return null;
};

const isTaskDescendant = (parentTask: Task, childTaskId: string): boolean => {
  if (!parentTask.subTask) return false;

  for (const subTask of parentTask.subTask) {
    if (subTask.id === childTaskId) return true;
    if (isTaskDescendant(subTask, childTaskId)) return true;
  }
  return false;
};

const getTaskDepth = (tasks: Task[], taskId: string): number => {
  const findDepth = (
    taskList: Task[],
    targetId: string,
    currentDepth: number
  ): number => {
    for (const task of taskList) {
      if (task.id === targetId) return currentDepth;
      if (task.subTask?.length) {
        const depth = findDepth(task.subTask, targetId, currentDepth + 1);
        if (depth !== -1) return depth;
      }
    }
    return -1;
  };

  return findDepth(tasks, taskId, 0);
};

const updateSubtaskCounts = (tasks: Task[]): Task[] => {
  return tasks.map((task) => {
    const updatedTask = { ...task };
    if (updatedTask.subTask?.length) {
      updatedTask.subTask = updateSubtaskCounts(updatedTask.subTask);
      updatedTask.subTaskCount = updatedTask.subTask.length;
    } else {
      updatedTask.subTaskCount = 0;
    }
    return updatedTask;
  });
};

const validateTaskStructure = (tasks: Task[]): boolean => {
  const seenIds = new Set<string>();

  const validate = (taskList: Task[]): boolean => {
    for (const task of taskList) {
      if (seenIds.has(task.id)) {
        console.error('Duplicate task ID found:', task.id);
        return false;
      }
      seenIds.add(task.id);

      if (task.subTask?.length && !validate(task.subTask)) {
        return false;
      }
    }
    return true;
  };

  return validate(tasks);
};
