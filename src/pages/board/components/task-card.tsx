import { useState, memo, MouseEvent, useRef, KeyboardEvent } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  Calendar,
  Flag,
  Spline,
  CircleCheck,
  CircleUserRound,
  Check,
  Pencil,
  Ellipsis,
} from 'lucide-react';
import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { TaskDescriptionIcon } from '@/assets/icons.tsx';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/lib/utils/utils.ts';
import { ContextMenu } from '@/components/common/context-menu';
import { boardTaskMenuConfig } from '@/lib/constants/staticData';
import { TaskCardProps } from '@/types/props/Common';
import { useClickOutside } from '@/lib/hooks/use-click-outside';
import { useAutoFocus } from '@/lib/hooks/use-auto-focus';
import { MenuItem, SubmenuItem } from '@/types/interfaces/ContextMenu';
import { useTheme } from '@/lib/context/theme-context';
import { PRIORITY_COLORS } from '@/mock';

const TaskCard = ({
  task,
  className = '',
  indentLevel = 0,
  isSubtask = false,
  isDragOverlay = false,
}: TaskCardProps) => {
  const { theme } = useTheme();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [onEnterTask, setOnEnterTask] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [onEnterSubtask, setOnEnterSubtask] = useState(false);
  const [isEditingTaskName, setIsEditingTaskName] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);

  const inputRef = useAutoFocus<HTMLDivElement>(isEditingTaskName);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsEditingTaskName(false);
    }
  };

  useClickOutside([contentRef], () => {
    if (isEditingTaskName) {
      setIsEditingTaskName(false);
    }
  });

  const onEditingTaskName = () => {
    setIsEditingTaskName(true);
  };

  const handleContextMenuAction = (item: MenuItem | SubmenuItem) => {
    switch (item.action) {
      case 'rename':
        setIsEditingTaskName(true);
        break;
      default:
        return;
    }
  };

  const hasSubtasks = task.subTask && task.subTask.length > 0;
  // function to handle if the ContextMenu is Open
  const onMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isContextMenuOpen) {
      setOnEnterTask(false);
    }
  };

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

  const toggleSubtasks = (e: MouseEvent) => {
    setShowSubtasks((prev) => !prev);
    e.stopPropagation();
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
  // check if the context menu is open or not

  // Extract reusable UI elements
  const SubtaskToggleButton = () => (
    <button
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
      <span className="text-sm">
        {task.subTask ? task.subTask.length : 0} Subtasks
      </span>
    </button>
  );

  const BadgeStyle =
    'py-[2px] px-[4px] items-center justify-center rounded-sm flex border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50';

  return (
    <div>
      <Card
        ref={isSubtask || isDragOverlay ? undefined : setNodeRef}
        style={style}
        className={cn(
          className,
          'bg-background cursor-pointer transition-all duration-150 relative py-2',
          isSubtask && 'border-l-4 border-l-primary/30 ',
          isDragOverlay &&
            'w-[244px] shadow-2xl ring-2 ring-primary z-50 scale-[1.03] border-primary/80 rotate-1 bg-background'
        )}
        {...(isSubtask || isDragOverlay ? {} : { ...attributes, ...listeners })}
        onMouseEnter={() => setOnEnterTask(true)}
        onMouseLeave={(e) => onMouseLeave(e)}
      >
        <CardContent className="px-3" ref={contentRef}>
          {/* task title */}
          <div className="flex justify-between items-start">
            <div
              contentEditable={isEditingTaskName}
              suppressContentEditableWarning // removing this attributes prints console warnings
              ref={inputRef}
              className={cn(
                'font-medium text-base line-clamp-2 flex-1',
                isEditingTaskName
                  ? 'focus:outline-none focus-visible:ring-0 cursor-text'
                  : ''
              )}
              onKeyDown={handleKeyDown}
            >
              {task.name}
            </div>
            <div
              className={cn(
                'absolute top-0 right-0 flex border rounded-xl z-10 transition-opacity duration-100 shadow-sm',
                onEnterTask && !isEditingTaskName
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible',
                theme === 'dark' ? 'bg-black' : 'bg-white'
              )}
            >
              <Button
                size={'icon_sm'}
                className={'!px-0 hover:shadow-sm'}
                variant={'ghost'}
              >
                <Check />
              </Button>
              <Button
                onClick={onEditingTaskName}
                size={'icon_sm'}
                className={'!px-0 hover:shadow-sm'}
                variant={'ghost'}
              >
                <Pencil />
              </Button>
              <ContextMenu
                trigger={
                  <Button
                    onClick={() => {
                      setIsContextMenuOpen((prev) => !prev);
                      setOnEnterTask((prev) => !prev);
                    }}
                    size={'icon_sm'}
                    className={'!px-0 hover:shadow-sm'}
                    variant={'ghost'}
                  >
                    <Ellipsis />
                  </Button>
                }
                sections={boardTaskMenuConfig}
                width="w-fit"
                onItemClick={(item) => handleContextMenuAction(item)}
              />
            </div>
          </div>

          {/* task information buttons */}
          <div className="flex mt-2 gap-2">
            <button className="hover:bg-accent rounded-sm p-.5">
              <TaskDescriptionIcon />
            </button>
            <Button
              variant="ghost"
              className="flex items-center justify-center gap-1 !py-[2px] !px-[4px] h-fit"
            >
              <CircleCheck size={12} className="text-muted-foreground" />
              <span className="text-sm text-content-tertiary">
                0/{task.checkListCount ? task.checkListCount : 0}
              </span>
            </Button>
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
              <span className="text-sm text-content-tertiary font-semibold">
                {task.startDate && task.dueDate
                  ? `${formatDate(task.startDate)}` +
                    '-' +
                    `${formatDate(task.dueDate)}`
                  : ''}
              </span>
            </div>

            {/* Priority badge */}
            <div className={cn(BadgeStyle, 'gap-1')}>
              <Flag
                fill={
                  task.priority
                    ? getPriorityColor(task.priority)
                    : 'bg-gray-500'
                }
                color={
                  task.priority
                    ? getPriorityColor(task.priority)
                    : 'bg-gray-500'
                }
                className="text-muted-foreground"
                size={12}
              />
              <span className="text-sm font-medium text-content-tertiary capitalize">
                {task.priority}
              </span>
            </div>
          </div>

          {/* Subtask toggle */}
          {hasSubtasks && <SubtaskToggleButton />}
        </CardContent>
      </Card>

      {/* Subtasks */}
      {showSubtasks && (
        <div className="ml-2 mt-1 space-y-1">
          {task.subTask?.map((subtask) => (
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
