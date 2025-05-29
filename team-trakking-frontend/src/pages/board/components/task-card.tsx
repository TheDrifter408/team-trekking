import { useState, memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/mock';
import {
  Calendar,
  Flag,
  Spline,
  CircleCheck,
  CircleUserRound,
} from 'lucide-react';
import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { TaskDescriptionIcon } from '@/assets/icons.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';

// Moved outside component to avoid re-creation on each render
const PRIORITY_COLORS = {
  high: 'rgb(198, 42, 47)',
  mid: 'rgb(255, 197, 61)',
  low: 'rgb(62, 99, 221)',
  default: 'rgb(187, 187, 187)',
};

interface TaskCardProps {
  task: Task;
  className?: string;
  indentLevel?: number;
  isSubtask?: boolean;
  isDragOverlay?: boolean;
}

const TaskCard = ({
  task,
  className = '',
  indentLevel = 0,
  isSubtask = false,
  isDragOverlay = false,
}: TaskCardProps) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [onEnterSubtask, setOnEnterSubtask] = useState(false);

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
          zIndex: isDragging ? 50 : 'auto',
        }
      : undefined;

  const toggleSubtasks = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSubtasks(!showSubtasks);
  };

  const getPriorityColor = (priority: string) => {
    return (
      PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] ||
      PRIORITY_COLORS.default
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d');
    } catch {
      return 'Invalid date';
    }
  };

  // Different classes based on drag state - using cn utility for cleaner class composition
  const cardClasses = cn(
    className,
    'bg-background cursor-pointer transition-all duration-150',
    isSubtask && 'border-l-4 border-l-primary/30 ',
    isDragOverlay &&
      'w-[244px] shadow-2xl ring-2 ring-primary z-50 scale-[1.03] border-primary/80 rotate-1 bg-background'
  );

  // Extract reusable UI elements
  const SubtaskToggleButton = () => (
    <div
      className="w-full py-1 px-2 hover:bg-accent rounded mt-2 gap-2 flex items-center"
      onMouseEnter={() => setOnEnterSubtask(true)}
      onMouseLeave={() => setOnEnterSubtask(false)}
      onClick={toggleSubtasks}
    >
      {onEnterSubtask ? (
        showSubtasks ? (
          <IconCaretDownFilled
            strokeWidth={3}
            size={13}
            className="text-muted-foreground"
          />
        ) : (
          <IconCaretRightFilled
            strokeWidth={3}
            size={13}
            className="text-muted-foreground"
          />
        )
      ) : showSubtasks ? (
        <IconCaretDownFilled
          strokeWidth={3}
          size={13}
          className="text-muted-foreground"
        />
      ) : (
        <Spline strokeWidth={3} size={13} className="text-muted-foreground" />
      )}
      <span className="text-sm">{task.subtask.length} Subtasks</span>
    </div>
  );

  const BadgeStyle =
    'py-[2px] px-[4px] items-center justify-center rounded-sm flex border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50';

  return (
    <div>
      <Card
        ref={isSubtask || isDragOverlay ? undefined : setNodeRef}
        style={style}
        className={cardClasses}
        {...(isSubtask || isDragOverlay ? {} : { ...attributes, ...listeners })}
      >
        <CardContent className="px-3">
          {/* task title */}
          <div className="flex justify-between items-start">
            <span className="font-medium text-base line-clamp-2 flex-1">
              {task.name}
            </span>
          </div>

          {/* task information buttons */}
          <div className="flex mt-2 gap-2">
            <button className="hover:bg-accent rounded-sm p-.5">
              <TaskDescriptionIcon />
            </button>

            {task.checklistCount > 0 && (
              <Button
                variant="ghost"
                className="flex items-center justify-center gap-1 !py-[2px] !px-[4px] h-fit"
              >
                <CircleCheck size={12} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  0/{task.checklistCount}
                </span>
              </Button>
            )}
          </div>

          {/* task badges */}
          <div className="mt-2 gap-1 flex-wrap w-fit h-fit flex">
            {/* User badge */}
            <div className={BadgeStyle}>
              <CircleUserRound className="text-muted-foreground" size={12} />
            </div>

            {/* Date badge */}
            <div className={cn(BadgeStyle, 'gap-1')}>
              <Calendar className="text-muted-foreground" size={12} />
              <span className="text-sm text-muted-foreground font-semibold">
                {formatDate(task.startDate)} - {formatDate(task.dueDate)}
              </span>
            </div>

            {/* Priority badge */}
            <div className={cn(BadgeStyle, 'gap-1')}>
              <Flag
                fill={getPriorityColor(task.priority)}
                color={getPriorityColor(task.priority)}
                className="text-muted-foreground"
                size={12}
              />
              <span className="text-sm font-medium text-muted-foreground capitalize">
                {task.priority}
              </span>
            </div>
          </div>

          {/* Subtask toggle */}
          {hasSubtasks && <SubtaskToggleButton />}
        </CardContent>
      </Card>

      {/* Subtasks */}
      {hasSubtasks && showSubtasks && !isDragOverlay && (
        <div className="ml-4 mt-1 space-y-2">
          {task.subtask.map((subtask) => (
            <TaskCard
              key={subtask.id}
              task={subtask}
              indentLevel={indentLevel + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export const MemoizedTaskCard = memo(TaskCard);
export { MemoizedTaskCard as TaskCard };
