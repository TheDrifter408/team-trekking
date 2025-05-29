'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/Common';
import { SelectColumn } from '@/components/dataTable/select-column.tsx';

export const getColumns = (
  selectedIds: string[],
  toggleSelect: (id: string) => void
): ColumnDef<Task>[] => [
  {
    id: 'select',
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
  },
];
