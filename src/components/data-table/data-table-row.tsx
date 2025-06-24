import { TableRowProps } from '@/types/props/DataTableProps.ts';
import { DataTableCellSection } from './data-table-cell.tsx';
import { TableCell } from '@/components/shadcn-ui/table';
import { GripIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils/utils.ts';

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
  } = useSortable({
    id: row.id,
    data: {
      type: 'task',
      task: row.original,
      depth: row.depth || 0,
      parentId: row.parentId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        top: 0,
        transform: `translateY(${virtualRow.start}px) ${transform ? CSS.Transform.toString(transform) : ''}`,
        width: '100%',
        height: '40px',
        zIndex: isDragging ? 1000 : 1,
      }}
      key={row.id}
      data-index={virtualRow.index}
      onMouseEnter={() => onRowHover(row.original.id)}
      onMouseLeave={() => {
        if (activeDialogRowId !== row.original.id) {
          onRowHover(null);
        }
      }}
      className={cn(
        'flex hover:bg-muted/50 items-center transition-colors border-b border-border',
        isDragging && 'opacity-50 shadow-lg bg-white'
      )}
    >
      <TableCell
        {...attributes}
        {...listeners}
        className={cn(
          'flex items-center h-full justify-between -ml-[10px] cursor-grab',
          isDragging && 'cursor-grabbing'
        )}
      >
        <GripIcon className={'size-4'} />
      </TableCell>

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
