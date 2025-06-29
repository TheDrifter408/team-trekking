import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Task } from '@/types/props/Common.ts';
import { mockTasksFlattened } from '@/mock/task.ts';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onTaskMove?: (
    movedTask: Task,
    newParent: Task | null,
    position: string
  ) => void;
  maxDepth?: number;
}

export const DataTableBody = ({
  table,
  parentRef,
  onRowHover,
  activeDialogRowId,
}: DataTableBodyProps) => {
  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const sensors = useSensors(useSensor(PointerSensor));
  const onDragEnd = () => {
    console.log(mockTasksFlattened, 'onDragEnd');
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className="flex-1" ref={parentRef}>
        <div
          style={{
            height: `${totalHeight}px`,
            width: table.getTotalSize(),
            contain: 'strict',
            position: 'relative',
          }}
        >
          <SortableContext
            items={table.getRowModel().rows.map((row: Task) => row.id)}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div key={row.id}>
                  <DataTableRow
                    row={row}
                    virtualRow={virtualRow}
                    onRowHover={onRowHover}
                    activeDialogRowId={activeDialogRowId}
                  />
                </div>
              );
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};
