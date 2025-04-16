'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Flag, Filter } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/dataTable/data-table.tsx';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Task {
  id: string;
  status: string;
  name: string;
  priority: string;
  dueDate: string;
  startDate: string;
  subtasks?: Task[];
  subRows?: Task[]; // For TanStack Table
}

const priorityColors = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100',
  '': 'text-gray-600 bg-gray-100',
};

const statusLabels = {
  all: 'All Tasks',
  in_progress: 'In Progress',
  completed: 'Completed',
  pending: 'Pending',
  cancelled: 'Cancelled',
};

const statusColors = {
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function TaskStatusTable({ tasks }: { tasks: Task[] }) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Pre-process data to format for TanStack Table (with subtasks as subRows)
  const processedData = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      subRows: task.subtasks?.map((subtask) => ({
        ...subtask,
        status: task.status, // Inherit parent task status if not defined
      })),
    }));
  }, [tasks]);

  const [taskData, setTaskData] = useState<Task[]>(processedData);

  // Filtered data based on selected status
  const filteredData = useMemo(() => {
    if (selectedStatus === 'all') {
      return taskData;
    }
    return taskData.filter((task) => task.status === selectedStatus);
  }, [taskData, selectedStatus]);

  // Count tasks by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tasks.length };

    tasks.forEach((task) => {
      if (!counts[task.status]) {
        counts[task.status] = 0;
      }
      counts[task.status]++;
    });

    return counts;
  }, [tasks]);

  // Define columns for the task table
  const columns: ColumnDef<Task>[] = [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <button
            onClick={() => row.toggleExpanded()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : null;
      },
    },
    {
      accessorKey: 'name',
      header: 'Task Name',
      cell: ({ row }) => (
        <div className="font-medium text-primary">{row.getValue('name')}</div>
      ),
      meta: {
        pin: 'left', // Marking the column to be pinned
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string;
        return priority ? (
          <Badge className={`${priorityColors[priority] || ''} capitalize`}>
            {priority}
          </Badge>
        ) : (
          <Badge className="bg-gray-100 text-gray-800">None</Badge>
        );
      },
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => {
        const date = row.getValue('startDate') as string;
        return date ? (
          <div className="text-sm text-primary">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </div>
        ) : null;
      },
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }) => {
        const date = row.getValue('dueDate') as string;
        return date ? (
          <div className="text-sm text-primary">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </div>
        ) : null;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return status ? (
          <Badge className={`${statusColors[status] || ''}`}>
            {statusLabels[status] || status}
          </Badge>
        ) : null;
      },
    },
  ];

  const handleDataChange = (newData: Task[]) => {
    setTaskData(newData);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assigned to me</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}{' '}
                  {statusCounts[value] ? `(${statusCounts[value]})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredData}
          onDataChange={handleDataChange}
        />
      </CardContent>
    </Card>
  );
}
