'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/common.ts';
import { useNavigate } from 'react-router-dom';
import {
  GripVertical,
  MoreVertical,
  Plus,
  Flag,
  Ban,
  Pencil,
} from 'lucide-react';
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
import { DataTableViewOptions } from '@/components/dataTable/data-table-view-options.tsx';

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

      const rowId = (row.original as any).id;
      const seed = rowId.charCodeAt(0) || 0;
      const statusIndex = seed % statuses.length;
      const status = statuses[statusIndex];
      const progress = row.original.progress % 101; // 0-100 range

      const circumference = 2 * Math.PI * 14;
      const dashArray = `${(circumference * progress) / 100} ${circumference}`;

      const isRowHovered = false;
      return (
        <div
          className="flex items-center gap-3"
          onClick={() => navigate('/task')}
        >
          {/* Status progress circle */}
          <div className="relative w-5 h-5 flex-shrink-0">
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: status.color }}
            >
              <svg
                className="absolute top-0 left-0 w-full h-full -rotate-90"
                viewBox="0 0 32 32"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  strokeWidth="3"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  strokeWidth="3"
                  fill="none"
                  stroke="white"
                  strokeDasharray={dashArray}
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">List name</span>
            <span className="text-primary text-base gap-2 flex items-center font-medium hover:text-violet-600">
              {row.getValue('name')}
              {isRowHovered && (
                <div className=" flex items-center">
                  <Button
                    variant="ghost"
                    size="icon_sm"
                    className=" hover:bg-violet-100 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Add subtask to:', row.original.id);
                    }}
                  >
                    <Plus size={13} className="text-violet-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon_sm"
                    className=" hover:bg-violet-100 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit task:', row.original.id);
                    }}
                  >
                    <Pencil size={16} className="text-violet-600" />
                  </Button>
                </div>
              )}
            </span>
            {/* Hover action buttons */}
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
