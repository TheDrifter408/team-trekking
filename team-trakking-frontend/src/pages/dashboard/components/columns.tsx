'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/props/common.ts';
import {
  ArrowUpDown,
  Ban,
  Flag,
  MoreVertical,
  GripVertical as Grip,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Progress } from '@/components/progress';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { statuses } from '@/mock';
import { useState } from 'react';
import { TimeTracker } from '@/components/time-tracker';
import { useNavigate } from 'react-router-dom';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: () => <Grip size={16} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
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
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button onClick={row.getToggleExpandedHandler()} className="text-2xl">
          {row.getIsExpanded() ? '▾' : '▸'}
        </button>
      ) : null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'status',
    header: () => null,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
              <div className="relative group w-5 h-5">
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: row.original.status.color }}
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
                      strokeDasharray={`${(2 * Math.PI * 14 * row.original.progress) / 100} ${2 * Math.PI * 14}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {row.original.status.name} ({row.original.progress}%)
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="p-2">
            <div className="flex justify-between items-center gap-4 py-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pr-10"
                  onChange={() => {
                    // Handle search logic here
                  }}
                />
                <Search
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
              </div>
            </div>
            {statuses.map((status) => (
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
                <div className="relative group w-5 h-5 flex items-center justify-start gap-2">
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
                        // strokeDasharray={`${2 * Math.PI * 14 * row.original.progress / 100} ${2 * Math.PI * 14}`}
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>
                  <div className="absolute ml-4 px-2 py-1 text-sm rounded w-32">
                    {status.name}
                  </div>
                </div>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const navigate = useNavigate();

      return (
        <span
          className={'hover:underline underline-offset-2'}
          onClick={() => navigate('/task')}
        >
          {row.original.name}
        </span>
      );
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const progress = row.original.progress;
      return (
        <div className="flex items-center gap-2">
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {row.original.priority}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <div className="w-40">
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
                <Flag size={16} color="red" fill="red" /> Urgent
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
                <Flag size={16} color="yellow" fill="yellow" opacity={80} />{' '}
                High
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
                <Flag size={16} color="blue" fill="blue" /> Normal
              </div>
              <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
                <Flag size={16} color="gray" fill="gray" /> Low
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
              <Ban size={16} color="gray" /> Clear
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'assignees',
    header: 'Assignees',
    meta: {
      width: 'w-[100px]',
    },
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      // Handle close button click without opening dropdown
      const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
      };
      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              {/* Use negative margin to create overlap effect */}
              <div className="flex -space-x-2">
                {row.original.assignees?.map((assignee) => (
                  <div key={assignee.id} className="relative group">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(assignee.name)}&background=random`}
                      alt={assignee.name}
                      className="w-6 h-6 rounded-full border-2 border-background cursor-pointer"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {assignee.name}
                    </div>
                    {/* Close Icon */}
                    <button
                      className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-white border border-gray-300 rounded-full text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      onClick={(e) => handleRemoveClick(e)}
                      onMouseDown={(e) => e.stopPropagation()} // Prevent mousedown from triggering dropdown
                      onPointerDown={(e) => e.stopPropagation()} // Additional prevention for pointer events
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="p-2">
            <div className="flex justify-between items-center gap-4 py-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pr-10"
                  onChange={() => {
                    // Handle search logic here
                  }}
                />
                <Search
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
              </div>
            </div>
            {row.original.assignees.map((assignee) => (
              <div key={assignee.id} className="flex gap-2 m-1 items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    assignee.name
                  )}&background=random`}
                  alt={assignee.name}
                  className="w-6 h-6 rounded-full inline-block"
                />
                <span className="text-sm">{assignee.name}</span>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {new Date(row.original.startDate).toLocaleDateString()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <Calendar></Calendar>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {new Date(row.original.dueDate).toLocaleDateString()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <Calendar></Calendar>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <Button variant="ghost" className="h-8 w-8 p-0">
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
            <div className="flex justify-end items-center pt-4">
              <p className="text-sm">Changes are automatically saved</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'spentTime',
    header: 'Spent Time',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {row.original.spentTime}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="p-2">
            <div className="flex justify-between items-center gap-4 py-2">
              <DropdownMenuLabel>Time Estimate</DropdownMenuLabel>
              <Input
                type="text"
                defaultValue={row.original.spentTime}
                className="w-32"
                placeholder="Enter time"
              />
            </div>
            <DropdownMenuSeparator />
            <div className="flex justify-end items-center pt-4">
              <p className="text-sm">Changes are automatically saved</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'timeTracked',
    header: 'Time Tracked',
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
              <MoreVertical className="h-4 w-4" />
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
