import React, { useState } from 'react';
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
import { Column as ColumnType, Task, ColumnType as ColumnId } from './types';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import { mockColumns } from '@/data/mockData';

export const Board = () => {
  const [columns, setColumns] = useState<ColumnType[]>(mockColumns);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnId>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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

  const handleAddTaskSubmit = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      category: selectedColumn,
    };

    setColumns((columns) =>
      columns.map((col) => {
        if (col.id === selectedColumn) {
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          };
        }
        return col;
      })
    );

    setIsAddingTask(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Board</h1>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6">
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
  );
};
