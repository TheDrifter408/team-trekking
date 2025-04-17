import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const IconComponent = column.icon;

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
        w-[300px] h-auto transition-all duration-300 ${className}
        ${isOver ? 'ring-2 ring-primary' : ''}
        ${isActiveColumn ? 'ring-1 ring-primary/30' : ''}
      `}
      style={{ backgroundColor: column.color }}
    >
      <CardHeader className="mx-2 flex bg-accent rounded-full flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {IconComponent && (
            <IconComponent
              className="h-4 w-4"
              style={{ color: column.color }}
            />
          )}
          <CardTitle className="text-sm font-medium">
            {column.title}
            {column.tasks.length > 0 && (
              <span className="ml-2 rounded-full px-2 py-1 text-xs">
                {column.tasks.length}
              </span>
            )}
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="h-6 w-6 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent
        className={`
          p-2 space-y-2  overflow-y-auto min-h-[200px]
          ${isOver ? 'bg-primary/10' : ''}
        `}
      >
        {column.tasks.map((task: Task) => (
          <SortableTaskCard key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
};
