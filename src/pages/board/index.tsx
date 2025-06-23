import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Main } from '@/components/layout/main.tsx';
import { mockColumns } from '@/mock/boardData.ts';
import { BoardColumn } from './components/column.tsx';
import { TaskCard } from './components/task-card.tsx';
import { HeaderType } from '@/types/props/Common.ts';
import { PageHeader } from '@/components/layout/page-header.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { Card } from '@/components/shadcn-ui/card.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { ChevronUp } from 'lucide-react';
import { cn, columnsEqual } from '@/lib/utils.ts';
import { Column, Task } from '@/types/props/Common.ts';
import { StrictPointerSensor } from '@/lib/classes/StrictPointerSensor.ts';
import { useDragScroll } from '@/lib/hooks/use-dragScroll.tsx';

export const Board = () => {
  const [columns, setColumns] = useState<Column[]>(mockColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  // keep a record of the columns that are collapsed and that aren't
  const [collapsedColumns, setCollapsedColumns] = useState<
    Record<string, boolean>
  >(
    columns.reduce(
      (acc, c) => {
        acc[c.id] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );
  const [showCollapsed, setShowCollapsed] = useState<boolean>(false);
  // function to check whether a specific column is collapsed
  const isCollapsed = (columnId: string) => collapsedColumns[columnId];
  const collapsedCount = Object.values(collapsedColumns).filter(Boolean).length;

  const [isDragging, setIsDragging] = useState(false);
  const {
    ref: dragToScrollRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useDragScroll(isDragging);

  const sensors = useSensors(
    useSensor(StrictPointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const { active } = event;
    const taskId = active.id as string;
    // Find the task in all columns
    const draggedTask = findTaskInColumns(Number(taskId));

    if (draggedTask) {
      setActiveTask(draggedTask);

      // Find which column the task is from
      const sourceColumn = columns.find((column) =>
        column.tasks.some((task) => task.id === Number(taskId))
      );

      if (sourceColumn) {
        setActiveColumnId(sourceColumn.id);
      }
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as number;

    // Find the columns
    const activeColumnIndex = columns.findIndex((column) =>
      column.tasks.some((task) => task.id === activeId)
    );

    // If we couldn't find the task in any column, return
    if (activeColumnIndex === -1) return;

    // Check if we're dragging over a task or a column
    const isOverATask = columns.some((column) =>
      column.tasks.some((task) => task.id === overId)
    );

    if (!isOverATask) {
      // Over a column
      const overColumn = columns.find((col) => col.id === overId.toString());
      if (overColumn && overColumn.id !== activeColumnId) {
        setActiveColumnId(overColumn.id); // Track for visual feedback only
      }
    } else {
      // Over a task
      const overTaskColumn = columns.find((column) =>
        column.tasks.some((task) => task.id === overId)
      );
      if (overTaskColumn && overTaskColumn.id !== activeColumnId) {
        setActiveColumnId(overTaskColumn.id); // Track for highlight etc.
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      setActiveColumnId(null);
      setIsDragging(false);
      return;
    }

    const activeId = active.id as number;
    const overId = over.id as number;

    if (activeId === overId) {
      setActiveTask(null);
      setActiveColumnId(null);
      setIsDragging(false);
      return;
    }

    const newColumns = [...columns];

    // Find the source column and Task
    const sourceColIndex = newColumns.findIndex((col) =>
      col.tasks.some((t) => t.id === activeId)
    );
    if (sourceColIndex === -1) return; // Task not found in any column
    const sourceCol = newColumns[sourceColIndex];

    const taskIndex = sourceCol.tasks.findIndex((task) => task.id === activeId);
    if (taskIndex === -1) return; // Task not found in source column
    // Remove the Task from the source column and assign it to movedTask
    const [movedTask] = sourceCol.tasks.splice(taskIndex, 1);

    // Case 1: Dragging over a Column
    const isOverColumn = newColumns.some((col) => col.id === overId.toString());

    if (isOverColumn) {
      // Find the index of the destination column
      const destColIndex = newColumns.findIndex(
        (col) => col.id === overId.toString()
      );
      newColumns[destColIndex].tasks.push(movedTask);
    } else {
      // Case 2: Dragging it over another Task
      const destColIndex = newColumns.findIndex((col) =>
        col.tasks.some((task) => task.id === overId)
      );
      const destCol = newColumns[destColIndex];
      const overTaskIndex = destCol.tasks.findIndex(
        (task) => task.id === overId
      );

      // Insert dragged Task before the overTaskIndex
      destCol.tasks.splice(overTaskIndex, 0, movedTask);
    }
    if (columnsEqual(newColumns, columns)) {
      setIsDragging(false);
      return;
    }
    setColumns(newColumns);
    setActiveTask(null);
    setActiveColumnId(null);
    setIsDragging(false);
  };

  const onDragCancel = () => {
    setIsDragging(false);
    setActiveTask(null);
    setActiveColumnId(null);
  };

  // Helper function to find a task in all columns
  const findTaskInColumns = (taskId: number): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const updateCollapsed = (column: Column) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [column.id]: !prev[column.id],
    }));
    if (collapsedCount === 0) {
      setShowCollapsed(false);
    }
  };

  const currentPage = {
    type: 'FOLDER' as HeaderType,
    label: 'space Shuttle',
  };
  const parents = [
    { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
  ];

  return (
    <>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="relative h-full text-foreground transition-colors duration-300">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          >
            {/* Container for draggables */}
            <div
              ref={dragToScrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              className="flex gap-4 overflow-x-auto touch-pan-y active:cursor-grabbing"
            >
              <Card
                className={cn(
                  'flex w-10 ml-1 h-[150px] bg-inherit items-center gap-0 py-1',
                  collapsedCount > 0 ? '' : 'hidden'
                )}
                onClick={() => setShowCollapsed((prev) => !prev)}
              >
                <div className="mt-11 w-min h-min flex rotate-90 text-left">
                  <span className="text-nowrap text-sm">
                    {collapsedCount} {LABEL.COLLAPSED}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className={cn(
                    'h-6 w-6 mt-9 z-50 transition-transform',
                    showCollapsed ? ' -rotate-90' : 'rotate-90'
                  )}
                >
                  <ChevronUp />
                </Button>
              </Card>
              <div
                className={cn(
                  'grid grid-flow-col gap-1 transition-all duration-450 -ml-5',
                  showCollapsed ? 'opacity-100 w-min ml-0' : 'opacity-0 h-0 w-0'
                )}
              >
                {columns
                  .filter((c) => isCollapsed(c.id))
                  .map((column) => {
                    return (
                      <BoardColumn
                        setColumns={setColumns}
                        key={column.id}
                        column={column}
                        isCollapsed={isCollapsed(column.id)}
                        updateCollapsed={updateCollapsed}
                      />
                    );
                  })}
              </div>
              {columns
                .filter((c) => !isCollapsed(c.id))
                .map((column) => (
                  <SortableContext
                    key={column.id}
                    items={column.tasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <BoardColumn
                      setColumns={setColumns}
                      column={column}
                      className=""
                      updateCollapsed={updateCollapsed}
                      isActiveColumn={column.id === activeColumnId}
                      isCollapsed={isCollapsed(column.id)}
                    />
                  </SortableContext>
                ))}
            </div>
            {/* Drag Overlay - This ensures the dragged task appears on top */}
            <DragOverlay>
              {activeTask ? (
                <div className="w-[244px]">
                  <TaskCard task={activeTask} isDragOverlay={true} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </Main>
    </>
  );
};
export default Board;
