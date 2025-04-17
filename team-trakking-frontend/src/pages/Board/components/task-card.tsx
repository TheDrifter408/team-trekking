import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/mock';
import {
  Calendar,
  CheckSquare,
  Flag,
  Users,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  className?: string;
  indentLevel?: number;
  isSubtask?: boolean;
  isDragOverlay?: boolean;
}

export const TaskCard = ({
  task,
  className = '',
  indentLevel = 0,
  isSubtask = false,
  isDragOverlay = false,
}: TaskCardProps) => {
  const [showSubtasks, setShowSubtasks] = useState(false);

  const hasSubtasks = task.subtask && task.subtask.length > 0;

  // Only make the main tasks draggable, not subtasks
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      disabled: isSubtask || isDragOverlay,
    });

  const style =
    transform && !isDragOverlay
      ? {
          transform: CSS.Translate.toString(transform),
          opacity: isDragging ? 0.5 : 1,
          // Add z-index to ensure dragged items appear on top
          zIndex: isDragging ? 50 : 'auto',
        }
      : undefined;

  const toggleSubtasks = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSubtasks(!showSubtasks);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'mid':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Different classes based on drag state
  const cardClasses = `
    ${className} 
    bg-accent cursor-pointer transition-all duration-150
    ${isSubtask ? 'border-l-4 border-l-primary/30 mt-2' : ''} 
    ${isDragOverlay ? 'w-[300px] shadow-2xl ring-2 ring-primary z-50 scale-[1.03] border-primary/80 rotate-1 bg-background' : ''}
  `;

  return (
    <div className={`${isSubtask ? 'ml-4' : ''}`}>
      <Card
        ref={isSubtask || isDragOverlay ? undefined : setNodeRef}
        style={style}
        className={cardClasses}
        {...(isSubtask || isDragOverlay ? {} : attributes)}
        {...(isSubtask || isDragOverlay ? {} : listeners)}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm line-clamp-2 flex-1">
              {task.name}
            </h3>
            <div className="flex gap-1">
              {hasSubtasks && !isDragOverlay && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={toggleSubtasks}
                >
                  {showSubtasks ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {task.checklistCount > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 py-0 h-5"
                    >
                      <CheckSquare size={12} />
                      <span className="text-xs">{task.checklistCount}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Checklist Items</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {hasSubtasks && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 py-0 h-5"
                    >
                      <ChevronRight size={12} />
                      <span className="text-xs">{task.subtask.length}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Subtasks</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 py-0 h-5 ${getPriorityColor(task.priority)}`}
                  >
                    <Flag size={12} />
                    <span className="text-xs capitalize">{task.priority}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Priority</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-primary" />
              <span className="text-xs text-muted-foreground font-bold">
                {formatDate(task.startDate)} - {formatDate(task.dueDate)}
              </span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <Users size={12} className="text-primary mr-1" />
                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 3).map((assignee) => (
                        <Avatar
                          key={assignee.id}
                          className="h-5 w-5 border border-white"
                        >
                          <AvatarImage
                            src={assignee.avatar}
                            alt={assignee.name}
                          />
                          <AvatarFallback className="text-[10px]">
                            {assignee.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {task.assignees.length > 3 && (
                        <div className="h-5 w-5 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[10px]">
                          +{task.assignees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    {task.assignees.map((a) => a.name).join(', ')}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Subtasks section - don't show when this is a drag overlay */}
      {hasSubtasks && showSubtasks && !isDragOverlay && (
        <div className="pl-4 border-l-2 border-dashed border-primary/30 ml-4 mt-1 space-y-2">
          {task.subtask.map((subtask) => (
            <TaskCard
              key={subtask.id}
              task={subtask}
              isSubtask={true}
              indentLevel={indentLevel + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
