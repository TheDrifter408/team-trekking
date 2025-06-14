import { flexRender } from '@tanstack/react-table';
import { TableCellSectionProps } from '@/types/props/DataTableProps.ts';

export const DataTableCellSection = ({
  cells,
  position,
}: TableCellSectionProps) => {
  const getCellClassName = (position: string) => {
    const baseClasses = 'flex items-center px-3 border-border';

    switch (position) {
      case 'left':
        return `${baseClasses} pl-[15px]`;
      case 'right':
        return `${baseClasses} bg-background/80 sticky ${position}-0 z-10`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
      {cells.map((cell) => (
        <div
          key={cell.id}
          className={getCellClassName(position)}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </>
  );
};
