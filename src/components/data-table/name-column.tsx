import React, { ReactNode, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  Tooltip,
  TextTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { TagDialog } from '@/components/common/tag-dialog.tsx';
import { Task } from '@/types/props/Common.ts';
import { Icon } from '@/assets/icon-path.tsx';
import { cn } from '@/lib/utils.ts';
import { Row } from '@tanstack/react-table';

interface Props {
  task: Task;
  isHovered: boolean;
  row?: Row<Task>; // Add row prop to access expand functionality
}

export const NameColumn = ({ task, isHovered, row }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const isSubRow = row?.depth && row.depth > 0;
  const canExpand = row?.getCanExpand();
  const isExpanded = row?.getIsExpanded();

  const onRenameSubmit = () => {
    if (editedName.trim()) {
      // call a save function here, or emit the change
      setIsEditing(false);
    }
  };

  const handleExpandToggle = () => {
    if (row && canExpand) {
      row.toggleExpanded();
    }
  };

  return (
    <div className="flex items-center min-w-[260px] gap-[12px] overflow-hidden">
      <div className="w-[40px] flex-shrink-0 flex justify-between items-center">
        {/* Expand/Collapse Button */}
        {canExpand ? (
          <IconButton onClick={handleExpandToggle}>
            <Icon
              name="expandsubtask"
              className={cn(
                'text-content-tertiary transition-transform duration-200',
                isExpanded ? '' : '-rotate-90'
              )}
            />
          </IconButton>
        ) : (
          <div className="w-[32px]" /> // Spacer for alignment when no expand button
        )}

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
              className="text-theme-main-dark font-medium !text-lg !focus-none !ring-none !outline-none border-none "
            />
          ) : (
            <TextTooltip message={task.name}>
              <span
                className={cn(
                  'text-lg font-medium cursor-pointer hover:text-theme-main truncate max-w-[140px]',
                  isSubRow
                    ? 'text-content-secondary text-base' // Subtasks styled differently
                    : 'text-content-default'
                )}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.name}
              </span>
            </TextTooltip>
          )}

          <div className="flex-shrink-0 flex ml-2">
            {/* Only show subtask summary for parent tasks */}
            {!isSubRow && <SubTaskSummary task={task} />}
            <DescriptionSummary task={task} />
            <TaskModifiers
              isHovered={isHovered}
              onRename={() => setIsEditing(true)}
              isSubRow={isSubRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskModifiers = ({
  isHovered,
  onRename,
  isSubRow = false,
}: {
  isHovered: boolean;
  onRename: () => void;
  isSubRow?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

          {/* Only show "Add Subtask" for parent tasks */}
          {!isSubRow && (
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

  for (let i = 0; i < subTask.length; i++) {
    const { name, color } = subTask[i].status;
    const key = `${name}_${color}`;

    if (summaryMap.has(key)) {
      summaryMap.get(key)!.count += 1;
    } else {
      summaryMap.set(key, { name, color, count: 1 });
    }
  }

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
  // tooltipText,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tooltipText?: string;
}) => {
  return (
    <Button
      {...props}
      className={cn(className, 'py-[5px] px-[7px]')}
      size="auto"
      variant="ghost"
    >
      {children}
    </Button>
  );
};
