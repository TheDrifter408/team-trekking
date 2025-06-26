'use client';
import { forwardRef, PropsWithChildren, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/shadcn-ui/sidebar.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { ButtonProps } from '@headlessui/react';
import { Task } from '@/types/props/Common';
import { mockColumns } from '@/mock';
import { TextTooltip } from '@/components/shadcn-ui/tooltip';
import { ChevronRight, Ellipsis, Plus } from 'lucide-react';
import { Icon } from '@/assets/icon-path';
import { useNavigate } from 'react-router-dom';

type SidebarTriggerProps = PropsWithChildren<ButtonProps>;

export const LeftSidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ children, className, onClick, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn(className, 'items-center justify-center h-auto')}
      onClick={(event) => {
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

LeftSidebarTrigger.displayName = 'LeftSidebarTrigger';

interface LeftSidebarProps {
  className?: string;
}

interface TaskListProps {
  task: Task;
}

interface ExpandableSubtasks {
  subtask: Task;
}

const TaskList = ({ task }: TaskListProps) => {
  return (
    <>
      <div className="px-2 flex items-center justify-between bg-slate-200 group/right_buttons">
        <div className="flex gap-2 py-2">
          <Icon name="progress2" className="text-green-500" />
          <span className="text-content-default text-base">{task.name}</span>
        </div>
        <div className="flex invisible group-hover/right_buttons:visible">
          <Button variant={'ghost'} size="icon_sm">
            <Ellipsis />
          </Button>
          <Button variant={'ghost'} size="icon_sm">
            <Plus />
          </Button>
        </div>
      </div>
      {task.subTask.length > 0 ? (
        task.subTask.map((task) => <ExpandableSubTasks subtask={task} />)
      ) : (
        <></>
      )}
    </>
  );
};

const ExpandableSubTasks = ({ subtask }: ExpandableSubtasks) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  const onRenameSubmit = () => {
    setIsEditing(false);
  };

  const onToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-1 hover:bg-slate-200 py-1">
      <div className="max-w-[40px] flex-shrink-0 flex justify-start items-center">
        {/* Expand Icon */}
        <Button
          variant={'ghost'}
          onClick={onToggleExpand}
          size={'icon_sm'}
          className={cn(
            'hover:bg-slate-200 p-1 m-0 ml-1 w-min h-min',
            subtask.subTask.length > 0 ? 'visible' : 'invisible',
            isExpanded ? 'rotate-45' : 'rotate-0'
          )}
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        <Icon name="progress2" className="text-green-500" />
      </div>
      <div className="flex flex-col overflow-hidden">
        {/* Task Name */}
        <div className="flex items-center overflow-hidden group/right_buttons px-2">
          {isEditing ? (
            <input
              value={editedName}
              autoFocus
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={onRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onRenameSubmit();
                if (e.key === 'Escape') {
                  setEditedName(subtask.name);
                  setIsEditing(false);
                }
              }}
              className="text-theme-main-dark text-base bg-transparent font-medium !focus-none !ring-none !outline-none border-none "
            />
          ) : (
            <TextTooltip message={subtask.name}>
              <span
                className={cn(
                  'text-base text-content-default font-medium cursor-pointer truncate max-w-96'
                )}
                onClick={() => navigate(`/task`)}
                onDoubleClick={() => setIsEditing(true)}
              >
                {subtask.name}
              </span>
            </TextTooltip>
          )}
          <div className="flex invisible group-hover/right_buttons:visible">
            <Button variant={'ghost'} size="icon_sm">
              <Ellipsis />
            </Button>
            <Button variant={'ghost'} size="icon_sm">
              <Plus />
            </Button>
          </div>
        </div>
        {/* Subtasks */}
        <div
          className={cn(
            `grid transform`,
            isExpanded && subtask.subTask.length > 0
              ? `grid-rows-${subtask.subTask.length}`
              : 'grid-rows-0'
          )}
        >
          {subtask.subTask.length > 0 ? (
            subtask.subTask.map((subtask: Task) => <div>{subtask.name}</div>)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export const LeftSidebar = ({ className, ...props }: LeftSidebarProps) => {
  const [task, setTask] = useState<Task>(mockColumns[0].tasks[0]);

  return (
    <Sidebar
      collapsible="offcanvas"
      side={'left'}
      className={cn(
        'absolute !h-[calc(100svh-110px)] border-r overflow-hidden [&>[data-sidebar=sidebar]]:flex-row-reverse',
        className
      )}
      {...props}
    >
      {/* Expanded sidebar content */}
      <Sidebar collapsible="none" className="w-0 hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-3">
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-medium text-foreground">Subtasks</div>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-0 flex-1 bg-slate-100 w-full">
          {/* Activity feed section */}
          <TaskList task={task} />
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
};
