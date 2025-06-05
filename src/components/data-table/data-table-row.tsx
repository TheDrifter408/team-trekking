import { TableRowProps } from '@/types/props/DataTableProps.ts';
import { DataTableCellSection } from './data-table-cell.tsx';

export const DataTableRow = ({
  row,
  virtualRow,
  onRowHover,
  activeDialogRowId,
}: TableRowProps) => {
  return (
    <div
      key={row.id}
      data-index={virtualRow.index}
      onMouseEnter={() => onRowHover(row.original.id)}
      onMouseLeave={() => {
        if (activeDialogRowId !== row.original.id) {
          onRowHover(null);
        }
      }}
      className="flex hover:bg-muted/50 transition-colors border-b border-border"
      style={{
        position: 'absolute',
        top: 0,
        transform: `translateY(${virtualRow.start}px)`,
        width: '100%',
        height: `${virtualRow.size}px`,
      }}
    >
      {/* Left pinned cells */}
      <DataTableCellSection cells={row.getLeftVisibleCells()} position="left" />
      {/* Center (scrollable) cells */}
      <DataTableCellSection
        cells={row.getCenterVisibleCells()}
        position="center"
      />
      {/* Right pinned cells */}
      <DataTableCellSection
        cells={row.getRightVisibleCells()}
        position="right"
      />
    </div>
  );
};
