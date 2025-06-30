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
  isDragOver?: boolean;
  dropPosition?: {
    type: 'before' | 'after' | 'child';
    depth: number;
    parentId: string | null;
  } | null;
}

const DropIndicator = ({
  position,
  depth,
  type,
}: {
  position: 'top' | 'bottom' | 'child';
  depth: number;
  type: 'before' | 'after' | 'child';
}) => {
  const indent = (depth + 2) * 35;

  if (type === 'child') {
    return (
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-20">
        <div
          className="absolute top-0 transform -translate-y-1/2 h-0.5 bg-pink-500"
          style={{
            left: `${indent}px`,
            right: '8px',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'absolute left-0 w-full h-0.5 bg-pink-500 pointer-events-none z-20',
        position === 'top' ? 'top-0' : 'bottom-0'
      )}
      style={{
        marginLeft: `${indent}px`,
        marginRight: '8px',
      }}
    />
  );
};

export const DataTableRow = ({
  row,
  virtualRow,
  onRowHover,
  activeDialogRowId,
  isDragOver,
  dropPosition,
}: TableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });
  const currentRowDepth = row.depth ?? row.original.depth ?? 0;

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
        {
          'cursor-grabbing': isDragging,
          'bg-blue-50': isDragOver && dropPosition?.type === 'child',
        }
      )}
    >
      {isDragOver && dropPosition && (
        <>
          {dropPosition.type === 'before' && (
            <DropIndicator
              position="top"
              depth={currentRowDepth}
              type="before"
            />
          )}
          {dropPosition.type === 'after' && (
            <DropIndicator
              position="bottom"
              depth={currentRowDepth}
              type="after"
            />
          )}
          {dropPosition.type === 'child' && (
            <DropIndicator
              position="child"
              depth={currentRowDepth}
              type="child"
            />
          )}
        </>
      )}

      {/* Table cells */}
      <DataTableCellSection cells={row.getLeftVisibleCells()} position="left" />
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
