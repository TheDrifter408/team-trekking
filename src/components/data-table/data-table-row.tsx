import { DataTableCellSection } from './data-table-cell.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Row } from '@tanstack/react-table';
import { Task } from '@/types/props/Common.ts';

interface TableRowProps {
  row: Row<Task>;
  virtualRow: {
    index: number;
    start: number;
    size: number;
  };
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
  overId?: string;
  indent?: number;
}

export const DataTableRow = ({
  row,
  virtualRow,
  onRowHover,
  activeDialogRowId,
}: TableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const getTransform = () => {
    if (isDragging && transform) {
      return CSS.Transform.toString({
        x: transform.x,
        y: transform.y,
        scaleX: transform.scaleX ?? 1,
        scaleY: transform.scaleY ?? 1,
      });
    }
    return undefined;
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transition,
          position: 'absolute',
          top: virtualRow.start,
          transform: getTransform(),
          width: '100%',
          height: '40px',
          zIndex: isDragging ? 10 : 1,
          opacity: isDragging ? 0 : 1,
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
        {...attributes}
        {...listeners}
        key={row.id}
        data-index={virtualRow.index}
        onMouseEnter={() => onRowHover(row.original.id)}
        onMouseLeave={() => {
          if (activeDialogRowId !== row.original.id) {
            onRowHover(null);
          }
        }}
        className={cn(
          'flex hover:bg-muted/50 items-center transition-colors border-b border-border cursor-grab relative',
          { 'cursor-grabbing': isDragging }
        )}
      >
        {/* Table cells */}
        <DataTableCellSection
          cells={row.getLeftVisibleCells()}
          position="left"
        />
        <DataTableCellSection
          cells={row.getCenterVisibleCells()}
          position="center"
        />
        <DataTableCellSection
          cells={row.getRightVisibleCells()}
          position="right"
        />
      </div>
    </>
  );
};
