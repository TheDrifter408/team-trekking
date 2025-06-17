import React, { ReactNode, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  Tooltip,
  TextTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { TagDialog } from '@/components/common/tag-dialog.tsx';
import { Task } from '@/types/props/Common.ts';
import { Icon } from '@/assets/icon-path.tsx';
import { cn } from '@/lib/utils.ts';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

interface Props {
  task: Task;
  row?: Row<Task>;
}

export const NameColumn = ({ task, row }: Props) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const hoveredRowId = useDataTableStore((s) => s.hoveredRowId);
  const isHovered = hoveredRowId === row?.original.id;

  const depth = row?.depth || 0;
  const canExpand = row?.getCanExpand();
  const isExpanded = row?.getIsExpanded();

  const indentationLevel = Math.min(depth, 3); // Cap at 3 levels as per your requirement
  const leftPadding = indentationLevel * 20;

  const onRenameSubmit = () => {
    if (editedName.trim()) {
      setIsEditing(false);
    }
  };

  const onExpandToggle = () => {
    if (row && canExpand) {
      row.toggleExpanded();
    }
  };

  return (
    <div
      className="flex items-center min-w-[280px] gap-[12px] overflow-hidden"
      style={{ paddingLeft: `${leftPadding}px` }}
    >
      <div className="max-w-[40px] flex-shrink-0 flex justify-between items-center">
        <IconButton
          className={'!px-0.5'}
          onClick={onExpandToggle}
          tooltipText={isExpanded ? 'Collapse subtasks' : 'Expand subtasks'}
        >
          <Icon
            name="expandsubtask"
            className={cn(
              'text-content-tertiary size-5 transition-transform duration-200',
              isExpanded ? '' : '-rotate-90'
            )}
          />
        </IconButton>

        {/* Status Icon */}
        <TextTooltip message={task.status.name}>
          <IconButton style={{ color: task.status.color }}>
            <Icon name="progress2" className={`text-${task.status.color}`} />
          </IconButton>
        </TextTooltip>
      </div>

      <div className="ml-[12px] flex flex-col overflow-hidden">
        <div className="flex items-center overflow-hidden">
          {isEditing ? (
            <input
              value={editedName}
              autoFocus
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={onRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onRenameSubmit();
                if (e.key === 'Escape') {
                  setEditedName(task.name);
                  setIsEditing(false);
                }
              }}
              className="text-theme-main-dark text-base bg-transparent font-medium !focus-none !ring-none !outline-none border-none "
            />
          ) : (
            <TextTooltip message={task.name}>
              <span
                className={cn(
                  'text-base text-content-default font-medium cursor-pointer hover:text-theme-main-dark hover:font-medium truncate max-w-[220px]'
                )}
                onClick={() => navigate(`/task`)}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.name}
              </span>
            </TextTooltip>
          )}

          {!isEditing && (
            <div className="flex-shrink-0 flex ml-2">
              <SubTaskSummary task={task} />
              <DescriptionSummary task={task} />
              <TaskModifiers
                isHovered={isHovered}
                onRename={() => setIsEditing(true)}
                depth={depth}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskModifiers = ({
  isHovered,
  onRename,
  depth = 0,
}: {
  isHovered: boolean;
  onRename: () => void;
  depth?: number;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Only allow adding subtasks if we haven't reached the maximum depth
  const canAddSubtask = depth < 2; // 0-based depth, so 2 means 3 levels total

  return (
    <div className="flex gap-0.5 ml-2">
      {isHovered && (
        <>
          <IconButton
            onClick={() => setIsDialogOpen(true)}
            tooltipText="Add tag"
          >
            <Icon
              name="tag"
              className="w-4 h-4 text-gray-500 hover:text-blue-600"
            />
          </IconButton>

          {/* Only show "Add Subtask" for tasks that can have subtasks */}
          {canAddSubtask && (
            <IconButton tooltipText="Add Subtask">
              <Icon
                name="add02"
                className="w-4 h-4 text-gray-500 hover:text-blue-600"
              />
            </IconButton>
          )}

          <IconButton tooltipText="Rename" onClick={onRename}>
            <Icon
              name="edit"
              className="w-4 h-4 text-gray-500 hover:text-blue-600"
            />
          </IconButton>
        </>
      )}

      <TagDialog
        isOpen={isDialogOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

const SubTaskSummary = ({ task }: { task: Task }) => {
  const subTask = task?.subTask ?? [];

  const summaryMap = new Map<
    string,
    { name: string; color: string; count: number }
  >();

  // Recursively count all nested subtasks
  const countAllSubtasks = (tasks: Task[]): void => {
    for (const subtask of tasks) {
      const { name, color } = subtask.status;
      const key = `${name}_${color}`;

      if (summaryMap.has(key)) {
        summaryMap.get(key)!.count += 1;
      } else {
        summaryMap.set(key, { name, color, count: 1 });
      }

      // Recursively count nested subtasks
      if (subtask.subTask && subtask.subTask.length > 0) {
        countAllSubtasks(subtask.subTask);
      }
    }
  };

  countAllSubtasks(subTask);
  const summary = Array.from(summaryMap.values());

  return (
    <>
      {(task.subTaskCount ?? 0) > 0 && (
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <IconButton>
              <Icon name="subtask" className="size-5" />
              <p className="text-content-tertiary">{task.subTaskCount}</p>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent className="w-fit">
            <div className="flex flex-col gap-1">
              {summary.map(({ name, count, color }) => (
                <div key={name + color} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ background: color }}
                  />
                  {count} {name}
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

const DescriptionSummary = ({ task }: { task: Task }) => {
  return (
    <>
      {(task.description?.length ?? 0) > 0 && (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <IconButton>
              <Icon name="description" className="size-4" />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] p-3">
            <div className="text-base root:text-content-default whitespace-pre-wrap">
              {task.description}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

const IconButton = ({
  children,
  className = '',
  tooltipText,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tooltipText?: string;
}) => {
  const ButtonComponent = (
    <Button
      {...props}
      className={cn(className, 'py-[5px] px-[7px]')}
      size="auto"
      variant="ghost"
    >
      {children}
    </Button>
  );

  if (tooltipText) {
    return <TextTooltip message={tooltipText}>{ButtonComponent}</TextTooltip>;
  }

  return ButtonComponent;
};
