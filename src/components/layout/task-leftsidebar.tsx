'use client';
import { FC, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { Task } from '@/types/request-response/task/ApiResponse';
import { TextTooltip } from '@/components/shadcn-ui/tooltip';
import { ChevronRight, Ellipsis, Plus } from 'lucide-react';
import { Icon } from '@/assets/icon-path';
import { useNavigate } from '@tanstack/react-router';

interface TaskListProps {
  task?: Task;
}

export const TaskList: FC<TaskListProps> = ({ task }) => {
  return (
    <>
      <div className="px-2 flex items-center justify-between bg-slate-200 group/right_buttons">
        <div className="flex gap-2 py-2">
          <Icon name="progress2" className="text-green-500" />
          <span className="text-content-default text-base">{task?.name}</span>
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
      {task ? (
        task.subTasks.length > 0 ? (
          task.subTasks.map((task, idx) => (
            <ExpandableSubTasks key={idx} subtask={task} />
          ))
        ) : (
          <></>
        )
      ) : (
        <LoadingSubtasks />
      )}
    </>
  );
};

interface ExpandableSubtasks {
  subtask: Task;
}

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
            subtask.subTasks.length > 0 ? 'visible' : 'invisible',
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
                onClick={() => navigate({ to: `/task/${subtask.id}` })}
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
            isExpanded && subtask.subTasks.length > 0
              ? `grid-rows-${subtask.subTasks.length}`
              : 'grid-rows-0'
          )}
        >
          {subtask.subTasks.length > 0 ? (
            subtask.subTasks.map((subtask: Task) => <div>{subtask.name}</div>)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSubtasks = () => {
  return (
    <div className="flex items-center gap-1 hover:bg-slate-200 py-1 animate-pulse">
      {/* Expand Icon Placeholder */}
      <div className="max-w-[40px] flex-shrink-0 flex justify-start items-center">
        <div className="w-5 h-5 bg-gray-300 rounded-sm ml-2" />
      </div>

      {/* Icon Placeholder */}
      <div>
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* Content Placeholder */}
      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex items-center overflow-hidden px-2">
          {/* Task name skeleton */}
          <div className="h-4 bg-gray-300 rounded w-40" />

          {/* Action buttons */}
          <div className="flex ml-auto gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="w-5 h-5 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Subtask rows skeleton */}
        <div className="grid grid-rows-2 mt-1 gap-1">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};
