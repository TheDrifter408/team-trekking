'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/Common';
import { NameColumn } from '@/components/dataTable/name-column.tsx';
import { SelectColumn } from '@/components/dataTable/select-column.tsx';
import { AssigneeColumn } from '@/components/dataTable/assignee-column.tsx';
import { ProgressColumn } from '@/components/dataTable/progress-column.tsx';
import { PriorityColumn } from '@/components/dataTable/priority-column.tsx';

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
      const isSelected = selectedIds.includes(task.id.toString());
      return (
        <SelectColumn
          isSelected={isSelected}
          onSelect={() => toggleSelect(task.id.toString())}
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
      const isHovered = row.original.id.toString() === hoveredRowId;
      return <NameColumn task={row.original} isHovered={isHovered} />;
    },
    maxSize: 70,
    size: 47,
  },
  {
    accessorKey: 'assignees',
    id: 'assignees',
    header: 'Assignee',
    cell: ({ row }) => <AssigneeColumn task={row.original} />,
    size: 10,
  },
  {
    id: 'progress',
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => <ProgressColumn task={row.original} />,
    size: 10,
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <PriorityColumn task={row.original} />,
    size: 5,
  },
];
