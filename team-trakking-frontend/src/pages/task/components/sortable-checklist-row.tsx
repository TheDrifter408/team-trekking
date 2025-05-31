import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableChecklistRowProps {
  id: string;
  selected: boolean;
  onSelect: () => void;
  item: any;
  onToggle: () => void;
}

export const SortableChecklistRow: FC<SortableChecklistRowProps> = ({
  id,
  selected,
  onSelect,
  item,
  onToggle,
}) => {
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
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <button
            className="cursor-grab hover:text-blue-500 focus:outline-none mr-2"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <span
            className={`text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
          >
            {item.content}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
    </tr>
  );
};
