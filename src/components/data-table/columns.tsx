'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/Common.ts';
import { NameColumn } from '@/components/data-table/name-column.tsx';
import { SelectColumn } from '@/components/data-table/select-column.tsx';
import { AssigneeColumn } from '@/components/data-table/assignee-column.tsx';
import { ProgressColumn } from '@/components/data-table/progress-column.tsx';
import { PriorityColumn } from '@/components/data-table/priority-column.tsx';
import { COLUMN_META } from '@/lib/constants/appConstant';

export const getColumns = (
  selectedIds: string[],
  toggleSelect: (id: string) => void,
  hoveredRowId: string | null
): ColumnDef<Task>[] => [
  {
    id: COLUMN_META.ACCESSOR_KEY.SELECT,
    accessorKey: COLUMN_META.ACCESSOR_KEY.SELECT,
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
    accessorKey: COLUMN_META.ACCESSOR_KEY.NAME,
    id: COLUMN_META.ACCESSOR_KEY.NAME,
    header: COLUMN_META.HEADER.NAME,
    cell: ({ row }) => {
      const isHovered = row.original.id.toString() === hoveredRowId;
      return <NameColumn task={row.original} isHovered={isHovered} />;
    },
    maxSize: 70,
    size: 47,
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.ASSIGNEES,
    id: COLUMN_META.ACCESSOR_KEY.ASSIGNEES,
    header: COLUMN_META.HEADER.NAME,
    cell: ({ row }) => <AssigneeColumn task={row.original} />,
    size: 10,
  },
  {
    id: COLUMN_META.ACCESSOR_KEY.PROGRESS,
    accessorKey: COLUMN_META.ACCESSOR_KEY.PROGRESS,
    header: COLUMN_META.HEADER.PROGRESS,
    cell: ({ row }) => <ProgressColumn task={row.original} />,
    size: 10,
  },
  {
    id: COLUMN_META.ACCESSOR_KEY.PRIORITY,
    accessorKey: COLUMN_META.ACCESSOR_KEY.PRIORITY,
    header: COLUMN_META.HEADER.PRIORITY,
    cell: ({ row }) => <PriorityColumn task={row.original} />,
    size: 5,
  },
];
