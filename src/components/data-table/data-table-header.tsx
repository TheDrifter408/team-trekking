import { flexRender, Header, Table } from '@tanstack/react-table';
import { ColumnResizer } from './column-resizer';
import { forwardRef } from 'react';

type Position = 'left' | 'center' | 'right';

interface TableHeaderSectionProps<TData> {
  headers: Header<TData, unknown>[];
  position: Position;
  centerTotalSize?: number;
}

const DataTableHeaderSection = <TData,>({
  headers,
  position,
  centerTotalSize,
}: TableHeaderSectionProps<TData>) => {
  const baseClass = 'relative text-left px-4 flex items-center text-sm';
  //  TODO: positionClass style not getting invoked.
  const positionClass =
    position === 'left'
      ? 'sticky left-0 z-20'
      : position === 'right'
        ? 'sticky right-0 z-20'
        : '';
  const wrapperProps =
    position === 'center' ? { style: { width: centerTotalSize } } : {};

  return (
    <div className={position === 'center' ? 'flex' : ''} {...wrapperProps}>
      {headers.map((header) => (
        <div
          key={header.id}
          className={`${baseClass} ${positionClass}`}
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

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export const DataTableHeader = forwardRef<
  HTMLDivElement,
  DataTableHeaderProps<any>
>(({ table }, ref) => {
  return (
    <div
      className="border-b mt-4 bg-background sticky top-0 z-10"
      style={{ width: table.getTotalSize() }}
    >
      <div
        className="flex items-center ml-[28px]" // Add overflow-hidden to prevent scrollbar
        ref={ref}
      >
        {table.getLeftHeaderGroups().map((group) => (
          <DataTableHeaderSection
            key={`left-${group.id}`}
            headers={group.headers}
            position="left"
          />
        ))}

        {table.getCenterHeaderGroups().map((group) => (
          <DataTableHeaderSection
            key={`center-${group.id}`}
            headers={group.headers}
            position="center"
            centerTotalSize={table.getCenterTotalSize()}
          />
        ))}

        {table.getRightHeaderGroups().map((group) => (
          <DataTableHeaderSection
            key={`right-${group.id}`}
            headers={group.headers}
            position="right"
          />
        ))}
      </div>
    </div>
  );
});

DataTableHeader.displayName = 'DataTableHeader';
