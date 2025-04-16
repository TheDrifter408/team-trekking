import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColummTask } from '@/types/props/common.ts';

interface TaskCardProps {
  task: ColummTask;
}
const categoryIcons = {
  todo: ListTodo,
  'in-progress': Clock,
  completed: CheckCircle2,
};

const categoryColors = {
  todo: 'text-blue-600',
  'in-progress': 'text-amber-600',
  completed: 'text-emerald-600',
};
export const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = categoryIcons[task.category];
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
        isDragging ? 'opacity-50 shadow-xl' : ''
      } cursor-move hover:shadow-md transition-all duration-200 ${
        task.category === 'todo'
          ? 'border-l-blue-500'
          : task.category === 'in-progress'
            ? 'border-l-amber-500'
            : 'border-l-emerald-500'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <Icon className={`w-4 h-4 ${categoryColors[task.category]}`} />
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};
