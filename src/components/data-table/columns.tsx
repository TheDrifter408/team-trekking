import { ColumnDef } from '@tanstack/react-table';
import { COLUMN_META } from '@/lib/constants';
import { Task } from '@/types/props/Common.ts';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { SelectColumn } from '@/components/data-table/select-column.tsx';
import { PriorityColumn } from '@/components/data-table/priority-column.tsx';
import { ProgressColumn } from '@/components/data-table/progress-column.tsx';
import { DateColumn } from '@/components/data-table/date-column.tsx';
import { NameColumn } from '@/components/data-table/name-column.tsx';
import { OptionsColumn } from '@/components/data-table/options-column.tsx';
import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { useComponentStore } from '@/stores/zustand/component-state-store.ts';
import { EstimateTimeColumn } from '@/components/data-table/estimate-time-column.tsx';

export const Columns: ColumnDef<Task>[] = [
  {
    id: COLUMN_META.ACCESSOR_KEY.SELECT,
    header: () => {
      const HeaderCheckbox = () => {
        const isAllRowSelected = useDataTableStore((s) => s.isAllRowSelected);
        const toggleAllRows = useDataTableStore((s) => s.toggleAllRows);

        return (
          <Checkbox
            checked={isAllRowSelected}
            onCheckedChange={() => toggleAllRows()}
          />
        );
      };

      return <HeaderCheckbox />;
    },
    cell: ({ row }) => <SelectColumn rowId={row.original.id} />,
    size: 50, // default width
    minSize: 40, // minimum width
    maxSize: 80, // maximum width
    enableResizing: false,
  },
  {
    id: COLUMN_META.ACCESSOR_KEY.NAME,
    header: COLUMN_META.HEADER.NAME,
    cell: ({ row }) => <NameColumn task={row.original} row={row} />,
    minSize: 280,
    maxSize: 400,
    enableResizing: true,
    meta: {
      icon: 'texticon',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.PRIORITY,
    header: COLUMN_META.HEADER.PRIORITY,
    cell: ({ row }) => <PriorityColumn task={row.original} />,
    minSize: 70,
    maxSize: 80,
    enableResizing: true,
    meta: {
      icon: 'priority02',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.PROGRESS,
    header: COLUMN_META.HEADER.PROGRESS,
    cell: ({ row }) => <ProgressColumn task={row.original} />,
    size: 190,
    minSize: 170,
    maxSize: 300,
    enableResizing: true,
    meta: {
      icon: 'progress2',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.ESTIMATED_TIME,
    header: COLUMN_META.HEADER.ESTIMATED_TIME,
    cell: ({ row }) => <EstimateTimeColumn task={row.original} />,
    size: 180,
    minSize: 160,
    maxSize: 200,
    enableResizing: true,
    meta: {
      icon: 'timeestimation',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.START_DATE,
    header: COLUMN_META.HEADER.START_DATE,
    cell: ({ row }) => <DateColumn task={row.original} dateType="start" />,
    size: 160,
    minSize: 140,
    maxSize: 200,
    enableResizing: true,
    meta: {
      icon: 'calendaradd',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.END_DATE,
    header: COLUMN_META.HEADER.END_DATE,
    cell: ({ row }) => <DateColumn task={row.original} dateType="end" />,
    size: 160,
    minSize: 140,
    maxSize: 200,
    enableResizing: true,
    meta: {
      icon: 'calendar',
    },
  },
  {
    accessorKey: COLUMN_META.ACCESSOR_KEY.OPTIONS,
    header: () => {
      const openDrawer = useComponentStore((s) => s.openDrawer);
      return (
        <Button
          size={'auto'}
          variant={'ghost'}
          className={'hover:bg-accent p-2 w-full rounded-sm'}
          onClick={() => openDrawer('list-drawer')}
        >
          <Icon name={'add01'} />
        </Button>
      );
    },
    cell: () => <OptionsColumn />,
    minSize: 60,
    maxSize: 60,
    enableResizing: false,
  },
];
