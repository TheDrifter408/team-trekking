'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/Common';
import { NameColumn } from '@/components/dataTable/name-column.tsx';
import { SelectColumn } from '@/components/dataTable/select-column.tsx';

export const getColumns = (
  selectedIds: string[],
  toggleSelect: (id: string) => void,
  hoveredRowId: string | null
): ColumnDef<Task>[] => [
  {
    id: 'select',
    accessorKey: 'select',
    header: () => null,
    cell: ({ row }) => {
      const task = row.original;
      const isSelected = selectedIds.includes(task.id);
      return (
        <SelectColumn
          isSelected={isSelected}
          onSelect={() => toggleSelect(task.id)}
        />
      );
    },
    size: 8,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const isHovered =
        (Number(row.original.id) - 1).toString() === hoveredRowId;
      return <NameColumn task={row.original} isHovered={isHovered} />;
    },
  },
];
