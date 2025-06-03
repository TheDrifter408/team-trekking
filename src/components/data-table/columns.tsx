import { Task } from '@/types/props/Common.ts';
import { ColumnDef } from '@tanstack/table-core';
import { NameColumn } from '@/components/data-table/name-column.tsx';
import { SelectColumn } from '@/components/data-table/select-column.tsx';
import { PriorityColumn } from '@/components/data-table/priority-column.tsx';
import { ProgressColumn } from '@/components/data-table/progress-column.tsx';
import { COLUMN_META } from '@/lib/constants/appConstant';

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
    minSize: 20,
    maxSize: 30,
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.PRIORITY,
    header: () => COLUMN_META.HEADER.PRIORITY,
    cell: ({ row }) => <PriorityColumn task={row.original} />,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.PROGRESS,
    header: () => COLUMN_META.HEADER.PROGRESS,
    cell: ({ row }) => <ProgressColumn task={row.original} />,
    minSize: 10,
    maxSize: 10,
  },
];
