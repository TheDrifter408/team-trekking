'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/Common.ts';
import { useNavigate } from 'react-router-dom';
import { GripVertical, MoreVertical, Flag, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Progress } from '@/components/progress';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { statuses } from '@/mock';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { TimeTracker } from '@/components/time-tracker.tsx';
import { Icon } from '@/assets/icon-path';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: () => <GripVertical className={'text-muted-foreground'} size={16} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className={'border-muted-foreground'}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className={'border-muted-foreground'}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const navigate = useNavigate();
      const item = row.original;
      const rowId = (row.original as any).id;
      const seed = rowId.charCodeAt(0) || 0;
      const statusIndex = seed % statuses.length;
      const status = statuses[statusIndex];
      const progress = row.original.progress;
      return (
        <div
          className="items-center flex w-[200px]"
          onClick={() => navigate('/task')}
        >
          <div className="w-[40px] h-[16px] justify-between mr-[12px] flex items-center">
            <Button size={'auto'} variant={'ghost'}>
              <Icon name={'expandsubtask'} className={'-rotate-90'} />
            </Button>
            <Button
              size={'auto'}
              style={{ color: item.status.color }}
              variant={'ghost'}
            >
              <Icon name={'progress2'} />
            </Button>
          </div>
          <div className="justify-center flex flex-col">
            <p className="text-content-tertiary text-xs hover:text-content-default cursor-pointer">
              List Name
            </p>
            <div className="flex items-center gap-[8px]">
              <p className="text-content-default cursor-pointer hover:text-theme-main w-[100px] truncate font-normal text-sm">
                {row.original.name}
              </p>
              {row.original.subRows && (
                <Button variant={'ghost'} size={'auto'} className={'px-[2px]'}>
                  <Icon name={'subtask'} className={'size-3'} />
                  <p className={'text-content-tertiary font-normal text-xs'}>
                    {row.original.subRows.length}
                  </p>
                </Button>
              )}
              {row.original.estimatedTime && (
                <Button variant={'ghost'} size={'auto'} className={'px-[2px]'}>
                  <Icon name={'description'} className={'size-3'} />
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const progress = row.original.progress;
      return (
        <div className="flex w-[100px] items-center gap-2">
          <Progress value={progress} className="w-[60%]" />
          <span className="text-sm text-muted-foreground text-green-600">
            {progress}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      // Function to render the appropriate flag icon based on priority
      const renderPriorityIcon = (priority: string) => {
        switch (priority?.toLowerCase()) {
          case 'urgent':
            return <Flag size={16} color="red" fill="red" />;
          case 'high':
            return <Flag size={16} color="yellow" fill="yellow" opacity={80} />;
          case 'normal':
            return <Flag size={16} color="blue" fill="blue" />;
          case 'low':
            return <Flag size={16} color="gray" fill="gray" />;
          default:
            return <Flag size={16} className={'text-muted-foreground'} />;
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-primary">
              {renderPriorityIcon(row.original.priority)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <div className="w-40">
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 items-center cursor-pointer">
                <Flag size={16} color="red" fill="red" /> Urgent
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 items-center cursor-pointer">
                <Flag size={16} color="yellow" fill="yellow" opacity={80} />
                High
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 items-center cursor-pointer">
                <Flag size={16} color="blue" fill="blue" /> Normal
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 items-center cursor-pointer">
                <Flag size={16} color="gray" fill="gray" /> Low
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 items-center cursor-pointer">
              <Ban size={16} color="gray" /> Clear
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: () => <div className="text-left">Start Date</div>,
    size: 120, // Set a fixed width for the column
    cell: ({ row }) => {
      return (
        <div className="text-left w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 justify-start text-left text-base font-regular w-full"
              >
                {new Date(row.original.startDate).toLocaleDateString()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Calendar></Calendar>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: () => <div className="text-left">Due Date</div>,
    size: 120, // Set a fixed width for the column
    cell: ({ row }) => {
      return (
        <div className="text-left w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 justify-start text-left text-base font-regular w-full"
              >
                {new Date(row.original.dueDate).toLocaleDateString()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Calendar></Calendar>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: 'estimatedTime',
    header: 'Estimated Time',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 px-2 justify-start text-left text-base w-full"
            >
              {row.original.estimatedTime}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="p-2">
            <div className="flex justify-between items-center gap-4 py-2">
              <DropdownMenuLabel>Time Estimate</DropdownMenuLabel>
              <Input
                type="text"
                defaultValue={row.original.estimatedTime}
                className="w-32"
                placeholder="Enter time"
              />
            </div>
            <DropdownMenuSeparator />
            <div className="flex justify-center items-center pt-4">
              <p className="text-sm">Changes are automatically saved</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'timeTracked',
    header: () => 'Time Tracked',
    cell: ({ row }) => {
      const handleTimeUpdate = (newTime: string) => {
        console.log(`Time changed to: ${newTime}`);
        // No data updates happen here
      };
      return (
        <TimeTracker
          initialTime={row.original.timeTracked}
          onTimeUpdate={handleTimeUpdate}
          taskId={row.original.id}
        />
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Copy Link</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const myComponent = () => {
  return (
    <div>
      <div className="font-xl">hey</div>
    </div>
  );
};
