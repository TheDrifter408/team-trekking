import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  DragCancelEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Main } from '@/components/layout/main.tsx';
import { mockColumns, Column, Task } from '@/mock';
import { BoardColumn } from './components/column.tsx';
import { TaskCard } from './components/task-card.tsx';
import { HeaderType } from '@/types/props/common.ts';
import { PageHeader } from '@/components/layout/page-header.tsx';

export const Board = () => {
  const [columns, setColumns] = useState<Column[]>(mockColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;

    // Find the task in all columns
    const draggedTask = findTaskInColumns(taskId);

    if (draggedTask) {
      setActiveTask(draggedTask);

      // Find which column the task is from
      const sourceColumn = columns.find((column) =>
        column.tasks.some((task) => task.id === taskId)
      );

      if (sourceColumn) {
        setActiveColumnId(sourceColumn.id);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

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
      // We're dragging over a column, not a task
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overId
      );

      if (overColumnIndex !== -1 && activeColumnIndex !== overColumnIndex) {
        // Create a new columns array
        const newColumns = [...columns];

        // Find and remove the active task
        const activeColumn = newColumns[activeColumnIndex];
        const taskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeId
        );

        if (taskIndex !== -1) {
          const [removedTask] = activeColumn.tasks.splice(taskIndex, 1);

          // Add the task to the new column (at the beginning)
          newColumns[overColumnIndex].tasks.unshift(removedTask);

          setColumns(newColumns);
          setActiveColumnId(newColumns[overColumnIndex].id);
        }
      }
      return;
    }

    // Find which column contains the over task
    const overTaskColumn = columns.find((column) =>
      column.tasks.some((task) => task.id === overId)
    );

    if (!overTaskColumn) return;

    const overColumnIndex = columns.findIndex(
      (column) => column.id === overTaskColumn.id
    );

    // If the over task is in the same column as the active task
    if (activeColumnIndex === overColumnIndex) {
      const activeTaskIndex = columns[activeColumnIndex].tasks.findIndex(
        (task) => task.id === activeId
      );

      const overTaskIndex = columns[overColumnIndex].tasks.findIndex(
        (task) => task.id === overId
      );

      if (activeTaskIndex !== overTaskIndex) {
        // Same column reordering
        const newColumns = [...columns];
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex
        );

        setColumns(newColumns);
      }
    } else {
      // Different column
      const newColumns = [...columns];

      // Remove from the source column
      const activeColumn = newColumns[activeColumnIndex];
      const taskIndex = activeColumn.tasks.findIndex(
        (task) => task.id === activeId
      );

      if (taskIndex !== -1) {
        const [removedTask] = activeColumn.tasks.splice(taskIndex, 1);

        // Add to the target column at the specific position
        const overTaskIndex = newColumns[overColumnIndex].tasks.findIndex(
          (task) => task.id === overId
        );

        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removedTask);

        setColumns(newColumns);
        setActiveColumnId(newColumns[overColumnIndex].id);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      setActiveColumnId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if over ID is a column ID
    const isOverColumn = columns.some((column) => column.id === overId);

    if (isOverColumn) {
      // Find the task in the columns
      const sourceColumnIndex = columns.findIndex((column) =>
        column.tasks.some((task) => task.id === activeId)
      );

      if (sourceColumnIndex !== -1) {
        const destinationColumnIndex = columns.findIndex(
          (column) => column.id === overId
        );

        if (
          destinationColumnIndex !== -1 &&
          sourceColumnIndex !== destinationColumnIndex
        ) {
          // Create a new columns array
          const newColumns = [...columns];

          // Find and remove the task from the source column
          const sourceColumn = newColumns[sourceColumnIndex];
          const taskIndex = sourceColumn.tasks.findIndex(
            (task) => task.id === activeId
          );

          if (taskIndex !== -1) {
            const [removedTask] = sourceColumn.tasks.splice(taskIndex, 1);

            // Add the task to the destination column at the end
            newColumns[destinationColumnIndex].tasks.push(removedTask);

            setColumns(newColumns);
          }
        }
      }
    }

    // Reset active states
    setActiveTask(null);
    setActiveColumnId(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
    setActiveColumnId(null);
  };

  // Helper function to find a task in all columns
  const findTaskInColumns = (taskId: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const currentPage = {
    type: 'FOLDER' as HeaderType,
    label: 'Space Shuttle',
  };
  const parents = [
    { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
  ];

  return (
    <>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="relative min-h-screen">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="flex gap-4 px-4 pb-4 w-max">
              {columns.map((column) => (
                <SortableContext
                  key={column.id}
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <BoardColumn
                    column={column}
                    className="flex-shrink-0 self-start w-[244px]"
                    isActiveColumn={column.id === activeColumnId}
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
