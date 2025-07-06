import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { statusColors, priorityColors } from '@/mock';
import { useNavigate } from '@tanstack/react-router';
import { SortableTaskRowProps } from '@/types/props/Common';

const formatTime = (hours: string): string => {
  return `${Math.floor(Number(hours))}h ${Math.round((Number(hours) % 1) * 60)}m`;
};

export const SortableTaskRow: FC<SortableTaskRowProps> = ({
  id,
  selected,
  onSelect,
  subtask,
}) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'bg-blue-50' : ''}`}
    >
      <td className="sticky left-0 bg-white px-6 py-4 whitespace-nowrap border-r z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="sticky left-[68px] bg-white px-6 py-4 whitespace-nowrap border-r z-10">
        <div className="flex items-center">
          <button
            className="cursor-grab hover:text-blue-500 focus:outline-none mr-2"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <span
            className="text-sm font-medium text-gray-900 hover:underline cursor-pointer"
            onClick={() => navigate({ to: 'subtask/1' })}
          >
            {subtask.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-full text-white ${statusColors[subtask.status.name]}`}
        >
          {subtask.status.name.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${subtask.progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 mt-1">{subtask.progress}%</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {subtask.dueDate ? new Date(subtask.dueDate).toLocaleDateString() : ''}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {subtask.estimatedTime && !isNaN(Number(subtask.estimatedTime))
          ? formatTime(subtask.estimatedTime)
          : ''}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-full text-white ${subtask.priority ? priorityColors[subtask.priority] : 'bg-gray-500'}`}
        >
          {subtask.priority}
        </span>
      </td>
    </tr>
  );
};
