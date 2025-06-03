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

interface Props {
  task: Task;
  isHovered: boolean;
}

export const NameColumn = ({ task, isHovered }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const onRenameSubmit = () => {
    if (editedName.trim()) {
      // call a save function here, or emit the change
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center min-w-[260px] gap-[12px] overflow-hidden">
      <div className="w-[40px] flex-shrink-0 flex justify-between items-center">
        <IconButton>
          <Icon
            name="expandsubtask"
            className="text-content-tertiary -rotate-90"
          />
        </IconButton>
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
                className="text-lg font-medium text-content-default cursor-pointer hover:text-theme-main truncate max-w-[140px]"
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.name}
              </span>
            </TextTooltip>
          )}
          <div className="flex-shrink-0 flex ml-2 ">
            <SubTaskSummary task={task} />
            <DescriptionSummary task={task} />
            <TaskModifiers
              isHovered={isHovered}
              onRename={() => setIsEditing(true)}
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
}: {
  isHovered: boolean;
  onRename: () => void;
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
          <IconButton tooltipText="Add Subtask">
            <Icon
              name="add02"
              className="w-4 h-4 text-gray-500 hover:text-blue-600"
            />
          </IconButton>
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
