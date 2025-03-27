import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardColumn } from './components/Column';
import { TaskCard } from './components/TaskCard';
import {
  Column as ColumnType,
  ColummTask as Task,
  ColumnType as ColumnId,
} from '@/types/ApiResponse';
import { mockColumns } from '@/data/mockData';

export const Board = () => {
  const [columns, setColumns] = useState<ColumnType[]>(mockColumns);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnId>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeColumn = columns.find((col) =>
      col.tasks.find((task) => task.id === active.id)
    );
    const activeTask = activeColumn?.tasks.find(
      (task) => task.id === active.id
    );
    if (activeTask) {
      setActiveTask(activeTask);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = columns.find((col) =>
      col.tasks.find((task) => task.id === active.id)
    )?.id;
    const overColumnId = over.id as ColumnId;

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) {
      return;
    }

    setColumns((columns) => {
      const activeColumn = columns.find((col) => col.id === activeColumnId);
      const overColumn = columns.find((col) => col.id === overColumnId);

      if (!activeColumn || !overColumn) return columns;

      const activeTask = activeColumn.tasks.find(
        (task) => task.id === active.id
      );
      if (!activeTask) return columns;

      // Update task category when moving between columns
      const updatedTask = { ...activeTask, category: overColumnId };

      return columns.map((col) => {
        if (col.id === activeColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== active.id),
          };
        }
        if (col.id === overColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, updatedTask],
          };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = columns.find((col) =>
      col.tasks.find((task) => task.id === active.id)
    )?.id;
    const overColumnId = columns.find((col) =>
      col.tasks.find((task) => task.id === over.id)
    )?.id;

    if (!activeColumnId || !overColumnId || activeColumnId !== overColumnId) {
      return;
    }

    const activeColumn = columns.find((col) => col.id === activeColumnId);
    if (!activeColumn) return;

    const oldIndex = activeColumn.tasks.findIndex(
      (task) => task.id === active.id
    );
    const newIndex = activeColumn.tasks.findIndex(
      (task) => task.id === over.id
    );

    setColumns((columns) =>
      columns.map((col) => {
        if (col.id === activeColumnId) {
          const tasks = arrayMove(col.tasks, oldIndex, newIndex);
          return {
            ...col,
            tasks,
          };
        }
        return col;
      })
    );
  };

  const handleAddTask = (columnId: ColumnId) => {
    setSelectedColumn(columnId);
    setIsAddingTask(true);
  };

  return (
    <div className=" relative w-full mt-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Board View</h1>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="relative overflow-hidden">
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex px-8">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-6 min-w-max">
                {columns.map((column) => (
                  <BoardColumn
                    key={column.id}
                    column={column}
                    onAddTask={handleAddTask}
                  />
                ))}
              </div>
              <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};
