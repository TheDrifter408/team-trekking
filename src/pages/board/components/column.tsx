import { Dispatch, SetStateAction, useState } from 'react';
import { ChevronLeft, Circle, Ellipsis, Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Column, Priority, Task, TaskStatus } from '@/mock';
import { SortableTaskCard } from './sortable-task-card';
import { z } from 'zod';
import { addTaskSchema } from '../schema/addTaskSchema';
import { AddTaskForm } from './AddTaskForm';
import { faker } from '@faker-js/faker';
interface BoardColumnProps {
  column: Column;
  className?: string;
  isActiveColumn?: boolean;
  setColumns: Dispatch<SetStateAction<Column[]>>;
  updateCollapsed: (column: Column) => void;
  isCollapsed: boolean;
}

export const BoardColumn = ({
  column,
  className,
  isActiveColumn,
  setColumns,
  updateCollapsed,
  isCollapsed,
}: BoardColumnProps) => {
  const [onEnterHeader, setOnEnterHeader] = useState(false);
  const [addingTask, setAddingTask] = useState(false);

  const onSubmit = (values: z.infer<typeof addTaskSchema>) => {
    // Assign the correct enum value from user input for status and priority
    const status: TaskStatus =
      TaskStatus[column.title.toUpperCase() as keyof typeof TaskStatus];
    const priority: Priority =
      Priority[values.priority.toUpperCase() as keyof typeof Priority];
    // Create a new Task
    const newTask: Task = {
      id: faker.string.uuid(),
      name: values.name,
      description: '',
      status,
      dueDate: values.date.to ? values.date.to.toUTCString() : '',
      startDate: values.date.from ? values.date.from.toUTCString() : '',
      assignees: values.assignees ? values.assignees : [],
      priority,
      subtask: [],
      checklistCount: 0,
    };
    setColumns((prev) => {
      const updated = [...prev];
      const col = updated.find((c) => c.id === column.id);
      if (col) {
        col.tasks = [...col.tasks, newTask];
      }
      return updated;
    });
  };

  const AddTaskOnClick = () => {
    setAddingTask((prev) => !prev);
  };

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const toggleCollapse = (column: Column) => {
    updateCollapsed(column);
  };
  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  // If collapsed, render a vertical column with sideways text
  if (isCollapsed) {
    return (
      <Card
        className={`transition-all text-black duration-300 flex items-center min-h-32 gap-10 w-10 py-14 self-start ${className}`}
        style={{ backgroundColor: '#fff' }}
        onClick={() => toggleCollapse(column)}
      >
        <CardContent className="flex items-center p-2 rotate-90 w-auto h-full">
          <div
            className="flex items-center gap-2 w-full transition-transform delay-100 duration-300 whitespace-nowrap rounded shadow-sm p-1"
            style={{ backgroundColor: `${column.color}` }}
          >
            <Circle size={16} className="text-white" />
            <span className="text-sm text-black pr-1">
              {column.title.toUpperCase()}
            </span>
          </div>
          <span className="ml-2 text-sm">
            {column.tasks.length > 0 ? column.tasks.length : ''}
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      className={`
        w-[244px] py-1 gap-1 h-auto transition-all duration-300 ${className}
        ${isOver ? 'ring-2 ring-primary' : ''}
        ${isActiveColumn ? 'ring-1 ring-primary/30' : ''}
      `}
      style={{ backgroundColor: lightenColor(column.color, 20) }} // lightens by 20%
    >
      <CardHeader
        className="flex items-center justify-between !px-2"
        onMouseEnter={() => setOnEnterHeader(true)}
        onMouseLeave={() => setOnEnterHeader(false)}
      >
        <div className="flex items-center gap-1">
          <div
            className={'flex items-center py-1 px-1 gap-1 rounded-sm'}
            style={{ backgroundColor: column.color }}
          >
            <Circle size={16} />
            <span className="text-sm text-black pr-1">
              {column.title.toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-sm px-1">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex">
          {onEnterHeader && (
            <Button
              onClick={() => toggleCollapse(column)}
              variant={'ghost'}
              size={'icon_sm'}
            >
              <ChevronLeft className={'text-muted-foreground'} />
            </Button>
          )}
          <Button variant={'ghost'} className={'!px-0 !mx-0'} size={'icon_sm'}>
            <Ellipsis className={'text-muted-foreground'} />
          </Button>
          <Button size={'icon_sm'} className={'!px-0'} variant={'ghost'}>
            <Plus className={'text-muted-foreground'} />
          </Button>
        </div>
      </CardHeader>
      <CardContent
        className={`
          px-1 space-y-2 overflow-y-auto overflow-x-hidden max-h-[43rem]
          ${isOver ? 'bg-primary/10' : ''}
        `}
      >
        {column.tasks.map((task: Task) => (
          <SortableTaskCard key={task.id} task={task} />
        ))}
        {addingTask ? (
          <AddTaskForm onSubmit={onSubmit} setAddingTask={setAddingTask} />
        ) : (
          <Button
            onClick={AddTaskOnClick}
            className="w-full rounded-lg bg-inherit hover:bg-gray-50 text-base text-muted-foreground font-medium justify-start"
          >
            <Plus size={16} className="text-muted-foreground" />
            Add Task
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
