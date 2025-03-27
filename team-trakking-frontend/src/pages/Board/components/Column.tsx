import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LucideIcon, Plus } from 'lucide-react';
import { Column } from '@/types/ApiResponse';
import { TaskCard } from '@pages/Board/components/TaskCard.tsx';

export type ColumnType = 'todo' | 'in-progress' | 'completeds';

interface BoardColumnProps {
  column: Column;
  onAddTask: (columnId: Column['id']) => void;
}

export const BoardColumn = ({ column, onAddTask }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const Icon = column.icon as LucideIcon;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm w-80 flex flex-col transition-colors duration-200 ${
        isOver ? 'bg-gray-50' : ''
      }`}
    >
      <div
        className={`p-4 border-b flex items-center justify-between ${
          column.id === 'todo'
            ? 'bg-blue-50'
            : column.id === 'in-progress'
              ? 'bg-amber-50'
              : 'bg-emerald-50'
        } rounded-t-xl`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${column.color}`} />
          <h2 className="font-semibold text-gray-700">{column.title}</h2>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className={`p-1 rounded-md hover:bg-white transition-colors ${column.color}`}
        >
          <Plus size={20} className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className="p-4 space-y-3 flex-1 min-h-[200px] max-h-[500px] overflow-y-auto"
      >
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
