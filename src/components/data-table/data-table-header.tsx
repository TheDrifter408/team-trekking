import { flexRender, Header, Table } from '@tanstack/react-table';
import { ColumnResizer } from './column-resizer';

type Position = 'left' | 'center' | 'right';

interface TableHeaderSectionProps<TData> {
  headers: Header<TData, unknown>[];
  position: Position;
  centerTotalSize?: number;
}

export const DataTableHeaderSection = <TData,>({
  headers,
  position,
  centerTotalSize,
}: TableHeaderSectionProps<TData>) => {
  const getHeaderClassName = (position: Position) => {
    const baseClasses = 'relative text-left px-4 py-1.5 text-sm';
    switch (position) {
      case 'left':
        return `${baseClasses} bg-muted/80 sticky left-0 z-20`;
      case 'right':
        return `${baseClasses} bg-muted/80 sticky right-0 z-20`;
      default:
        return `${baseClasses} bg-muted/50`;
    }
  };

  const wrapperProps =
    position === 'center' ? { style: { width: centerTotalSize } } : {};

  return (
    <div className={position === 'center' ? 'flex' : ''} {...wrapperProps}>
      {headers.map((header) => (
        <div
          key={header.id}
          className={getHeaderClassName(position)}
          style={{ width: header.getSize() }}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          <ColumnResizer header={header} />
        </div>
      ))}
    </div>
  );
};

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export const DataTableHeader = <TData,>({
  table,
}: DataTableHeaderProps<TData>) => {
  const columnOrder = table.getState().columnOrder;
  const setColumnOrder = table.options.onColumnOrderChange;

  const centerHeaders = table.getCenterHeaderGroups()[0]?.headers || [];

  const centerColumnIds = centerHeaders.map((h) => h.column.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && setColumnOrder) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="border-b bg-background sticky top-0 z-10">
      <div className="flex">
        {table.getLeftHeaderGroups().map((headerGroup) => (
          <DataTableHeaderSection<TData>
            key={`left-${headerGroup.id}`}
            headers={headerGroup.headers}
            position="left"
          />
        ))}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={centerColumnIds}
            strategy={horizontalListSortingStrategy}
          >
            {table.getCenterHeaderGroups().map((headerGroup) => (
              <DataTableHeaderSection<TData>
                key={`center-${headerGroup.id}`}
                headers={headerGroup.headers}
                position="center"
                centerTotalSize={table.getCenterTotalSize()}
              />
            ))}
          </SortableContext>
        </DndContext>

        {table.getRightHeaderGroups().map((headerGroup) => (
          <DataTableHeaderSection<TData>
            key={`right-${headerGroup.id}`}
            headers={headerGroup.headers}
            position="right"
          />
        ))}
      </div>
    </div>
  );
};
