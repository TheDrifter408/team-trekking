import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { useState, useMemo, useCallback } from 'react';
import { COLUMN_META } from '@/lib/constants';
import { Icon } from '@/assets/icon-path.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { cn } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// TODO: Set Column Type
export const AvailableColumnsDrawer = () => {
  const table = useDataTableStore((s) => s.table);
  const [searchTerm, setSearchTerm] = useState('');
  const [version, setVersion] = useState(0);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const allColumns: any[] =
    table
      ?.getAllColumns()
      .filter((_, i, arr) => i !== 0 && i !== arr.length - 1) ?? [];

  const filteredColumns = useMemo(() => {
    let columns = allColumns;

    if (searchTerm) {
      columns = columns.filter((column) => {
        const name = column.columnDef.header?.toString().toLowerCase() ?? '';
        return name.includes(searchTerm.toLowerCase());
      });
    }

    // Initialize columnOrder if empty
    if (columnOrder.length === 0 && columns.length > 0) {
      const initialOrder = columns.map((col) => col.id);
      setColumnOrder(initialOrder);
      return columns;
    }

    // Sort columns based on columnOrder
    if (columnOrder.length > 0) {
      return columnOrder
        .map((id) => columns.find((col) => col.id === id))
        .filter(Boolean);
    }

    return columns;
  }, [searchTerm, allColumns, version, columnOrder]);

  const forceUpdate = useCallback(() => setVersion((v) => v + 1), []);

  const onToggleVisibility = useCallback(
    (column: any) => {
      if (column.columnDef.header?.toString() === COLUMN_META.HEADER.NAME)
        return;
      column.toggleVisibility();
      forceUpdate();
    },
    [forceUpdate]
  );

  const onHideAll = useCallback(() => {
    for (const column of allColumns) {
      const name = column.columnDef.header?.toString();
      if (name === COLUMN_META.HEADER.NAME) continue;
      column.toggleVisibility();
    }
    forceUpdate();
  }, [allColumns, forceUpdate]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="px-2 relative">
      <div className="mb-2 sticky top-0 z-10 bg-white py-1">
        <Icon
          name="search"
          className="absolute size-5 text-content-tertiary left-4 top-1/2 -translate-y-1/2"
        />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-[36px] px-4 relative placeholder:text-lg pl-10 !text-lg"
          placeholder="Search for new or existing fields"
        />
      </div>

      <div className="px-1">
        <div className="w-full text-base font-medium text-content-tertiary justify-between flex items-center">
          <span>Shown</span>
          <button onClick={onHideAll} className="hover:bg-accent px-[2px]">
            <span>Hide all</span>
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={filteredColumns.map((col) => col.id)}
            strategy={verticalListSortingStrategy}
          >
            <ColumnItems
              columns={filteredColumns}
              onToggleVisibility={onToggleVisibility}
            />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

const ColumnItems = ({
  columns,
  onToggleVisibility,
}: {
  columns: any[];
  onToggleVisibility: (col: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-2 cursor-pointer">
      {columns.map((column) => (
        <SortableColumnItem
          key={column.id}
          column={column}
          onToggleVisibility={onToggleVisibility}
        />
      ))}
    </div>
  );
};

const SortableColumnItem = ({
  column,
  onToggleVisibility,
}: {
  column: any;
  onToggleVisibility: (col: any) => void;
}) => {
  const name = column.columnDef.header?.toString() ?? '';
  const icon = column.columnDef.meta?.icon ?? 'progress';
  const isDisabled = name === COLUMN_META.HEADER.NAME;
  const isDraggable = !isDisabled;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleVisibility(column);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onToggleClick}
      className={cn(
        'flex flex-col gap-y-4 py-2 px-2 rounded-lg transition-colors',
        'hover:bg-gray-100',
        isDragging && 'opacity-50 z-50 shadow-lg'
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-2 flex-1">
          <div
            {...(isDraggable ? attributes : {})}
            {...(isDraggable ? listeners : {})}
            className={cn(
              'p-1 rounded flex-shrink-0',
              isDraggable
                ? 'cursor-grab active:cursor-grabbing hover:bg-gray-200'
                : 'cursor-not-allowed opacity-30'
            )}
            style={isDraggable ? { touchAction: 'none' } : {}}
          >
            <Icon
              name="drag"
              className={cn(isDraggable ? 'text-gray-600' : 'text-gray-500')}
            />
          </div>
          <span className="text-lg flex gap-x-2 items-center text-content-default">
            <Icon
              name={icon.toLowerCase() as any}
              className="size-[18px] text-content-tertiary"
            />
            {name}
          </span>
        </div>
        <div onClick={onToggleClick}>
          <Switch
            checked={column.getIsVisible()}
            onCheckedChange={() => onToggleVisibility(column)}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};
