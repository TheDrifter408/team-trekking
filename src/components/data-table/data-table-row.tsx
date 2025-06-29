import { TableRowProps } from '@/types/props/DataTableProps.ts';
import { DataTableCellSection } from './data-table-cell.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export const DataTableRow = ({
  row,
  virtualRow,
  onRowHover,
  activeDialogRowId,
}: TableRowProps) => {
  //   Sortable object definition
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        position: 'absolute',
        top: 0,
        transform: CSS.Transform.toString({
          x: transform?.x ?? 0,
          y: (transform?.y ?? 0) + virtualRow.start,
          scaleX: transform?.scaleX ?? 1,
          scaleY: transform?.scaleY ?? 1,
        }),
        width: '100%',
        height: '40px',
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.5 : 1,
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
        'flex hover:bg-muted/50 items-center transition-colors border-b border-border'
      )}
    >
      {/* Left pinned cells */}
      <DataTableCellSection cells={row.getLeftVisibleCells()} position="left" />

      {/* Center (scrollable) cells */}
      <DataTableCellSection
        cells={row.getCenterVisibleCells()}
        position="center"
      />
      <DataTableCellSection
        cells={row.getRightVisibleCells()}
        position="right"
      />
    </div>
  );
};
