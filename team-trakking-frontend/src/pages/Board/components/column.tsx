import { useState } from 'react';
import {
  ChevronLeft,
  Circle,
  ChevronRight,
  Ellipsis,
  Plus,
} from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Column, Task } from '@/mock';
import { SortableTaskCard } from './sortable-task-card';

interface BoardColumnProps {
  column: Column;
  className?: string;
  isActiveColumn?: boolean;
}

export const BoardColumn = ({
  column,
  className,
  isActiveColumn,
}: BoardColumnProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [onEnterHeader, setOnEnterHeader] = useState(false);
  const IconComponent = column.icon;

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
        className={`transition-all text-black duration-300 flex flex-col h-[200px] w-12 ${className}`}
        style={{ backgroundColor: `${column.color}` }}
      >
        <CardHeader className="p-2 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="h-6 w-6 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-2 flex flex-1 justify-center items-center">
          <div className="flex w-full mt-12 transform -rotate-90 whitespace-nowrap">
            {IconComponent && (
              <IconComponent
                className="h-4 w-4 mr-2"
                style={{ color: column.color }}
              />
            )}
            <CardTitle className="text-sm font-medium">
              {column.title}
              {column.tasks.length > 0 && (
                <span className="ml-2 bg-accent text-primary rounded-full px-2 py-1 text-xs">
                  {column.tasks.length}
                </span>
              )}
            </CardTitle>
          </div>
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
      style={{ backgroundColor: lightenColor(column.color, 10) }} // lightens by 10%
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
            <span className="text-sm">{column.title}</span>
          </div>
          <span className="text-muted-foreground font-medium text-sm">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex">
          {onEnterHeader && (
            <Button onClick={toggleCollapse} variant={'ghost'} size={'icon_sm'}>
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
          px-1 space-y-2 mb-1 overflow-y-auto min-h-[200px]
          ${isOver ? 'bg-primary/10' : ''}
        `}
      >
        {column.tasks.map((task: Task) => (
          <SortableTaskCard key={task.id} task={task} />
        ))}
        <div className="py-1 cursor-pointer items-center rounded-sm hover:bg-accent flex">
          <Plus size={16} className="text-muted-foreground" />
          <span className="text-base text-muted-foreground font-medium">
            Add Task
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
