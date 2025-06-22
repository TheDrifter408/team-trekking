import { useVirtualizer } from '@tanstack/react-virtual';
import { DataTableRow } from './data-table-row';

interface DataTableBodyProps {
  table: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
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

  return (
    <div className="flex-1 " ref={parentRef}>
      <div
        style={{
          height: `${totalHeight}px`,
          width: table.getTotalSize(),
          contain: 'strict',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <DataTableRow
              key={row.id}
              row={row}
              virtualRow={virtualRow}
              onRowHover={onRowHover}
              activeDialogRowId={activeDialogRowId}
            />
          );
        })}
      </div>
    </div>
  );
};
