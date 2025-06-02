import { Task } from '@/types/props/Common.ts';
import { ColumnDef } from '@tanstack/table-core';
import { NameColumn } from '@/components/dataTable/name-column.tsx';
import { SelectColumn } from '@/components/dataTable/select-column.tsx';
import { COLUMN_META } from '@/lib/constants';

export const columns = (hoveredRowId: string | null): ColumnDef<Task>[] => [
  {
    id: COLUMN_META.ACCESSOR_KEY.SELECT,
    header: () => null,
    cell: ({ row }) => (
      <SelectColumn
        isSelected={row.getIsSelected()}
        onSelect={() => row.toggleSelected()}
      />
    ),
    minSize: 10,
    maxSize: 10,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.NAME,
    header: () => COLUMN_META.HEADER.NAME,
    cell: ({ row }) => (
      <NameColumn
        task={row.original}
        isHovered={row.original.id.toString() === hoveredRowId}
      />
    ),
  },
];
