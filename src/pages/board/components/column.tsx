import { useState } from 'react';
import { ChevronLeft, Circle, Ellipsis, Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent, CardHeader } from '@/components/shadcn-ui/card';
import { SortableTaskCard } from './sortable-task-card';
import { z } from 'zod';
import { addTaskSchema } from '@/lib/validation/validationSchema';
import { AddTaskForm } from './AddTaskForm';
import { faker } from '@faker-js/faker';
import { ContextMenu } from '@/components/common/context-menu';
import { columnMenuConfig } from '@/lib/constants/staticData';
import { BoardColumnProps, Task, Column } from '@/types/props/Common';
import { hexToRgba } from '@/lib/utils.ts';

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
    // Create a new Task
    const newTask: Task = {
      id: faker.number.int(),
      name: values.name,
      description: '',
      progress: 0,
      status: {
        id: faker.number.int(),
        name: column.title.toUpperCase(),
        color: column.color,
        category: column.color,
      },
      dueDate: values.date.to ? values.date.to.toUTCString() : '',
      startDate: values.date.from ? values.date.from.toUTCString() : '',
      assignees: values.assignees ? values.assignees : [],
      priority: values.priority.toUpperCase(),
      subTask: [],
      checkListCount: 0,
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

  // If collapsed, render a vertical column with sideways text
  if (isCollapsed) {
    return (
      <Card
        className={`transition-all duration-300 flex items-center min-h-32 gap-10 w-10 py-14 self-start ${className}`}
        style={{ backgroundColor: hexToRgba(column.color, 0.2) }} // for adding 20% opacity to the column background color
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
        min-w-[250px] py-1 gap-1 h-min transition-all duration-300 ${className}
        ${isOver ? 'ring-1 ring-primary' : ''}
        ${isActiveColumn ? 'ring-1 ring-primary/30' : ''}
      `}
      style={{ backgroundColor: hexToRgba(column.color, 0.2) }} // for adding 20% opacity to the column background color
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
          <ContextMenu
            trigger={
              <Button
                variant={'ghost'}
                className={'!px-0 !mx-0'}
                size={'icon_sm'}
              >
                <Ellipsis className={'text-muted-foreground'} />
              </Button>
            }
            sections={columnMenuConfig}
            width={'w-fit'}
            onItemClick={() => { }}
          />

          <Button
            onClick={AddTaskOnClick}
            size={'icon_sm'}
            className={'!px-0'}
            variant={'ghost'}
          >
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
          <AddTaskForm
            onSubmit={onSubmit}
            addingTask={addingTask}
            setAddingTask={setAddingTask}
          />
        ) : (
          <Button
            onClick={AddTaskOnClick}
            className="w-full rounded-lg bg-inherit hover:opacity-80 text-base text-content-tertiary font-medium justify-start"
          >
            <Plus size={16} className="text-muted-foreground" />
            Add Task
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
