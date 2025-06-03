import { Button } from '@/components/shadcn-ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Tooltip,
  TextTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Task } from '@/types/props/Common.ts';
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  task: Task;
  isHovered: boolean;
}

export const NameColumn = ({ task, isHovered }: Props) => {
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
          <TextTooltip message={task.name}>
            <span className="text-lg font-medium text-content-default cursor-pointer hover:text-theme-main truncate max-w-[140px]">
              {task.name}
            </span>
          </TextTooltip>
          <div className="flex-shrink-0 flex ml-2 ">
            <SubTaskSummary task={task} />
            <DescriptionSummary task={task} />
            {isHovered && <TaskModifiers isHovered={isHovered} />}
          </div>
        </div>
      </div>
    </div>
  );
};

import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Plus } from 'lucide-react';

// Mock tag data - matches the colors from the image
const AVAILABLE_TAGS = [
  { id: '1', name: 'backend', color: '#FEF3C7' },
  { id: '2', name: '3', color: '#C7D2FE' },
  { id: '3', name: 'api', color: '#DBEAFE' },
  { id: '4', name: 'bug', color: '#FECACA' },
  { id: '5', name: 'button', color: '#D1FAE5' },
  { id: '6', name: 'design', color: '#E0E7FF' },
  { id: '7', name: 'fail 1', color: '#FEDD9B' },
  { id: '8', name: 'fail 4', color: '#F8BBD0' },
  { id: '9', name: 'frontend', color: '#F3E8FF' },
];

const TagDialog = ({
  isOpen,
  searchTerm,
  setSearchTerm,
  setIsDialogOpen,
}: {
  isOpen: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsDialogOpen: (open: boolean) => void;
}) => {
  const filteredTags = AVAILABLE_TAGS.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onTagClick = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[300px] p-0">
        {/* Search Input Section */}
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder="Search or Create New"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="text-sm"
          />
        </div>

        {/* Tags List Section */}
        <div className="max-h-64 overflow-y-auto">
          <div className="p-2">
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                onClick={onTagClick}
                className="w-full flex items-start p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <span
                  className="px-2 py-1 rounded text-xs font-medium text-gray-700 inline-block"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              </button>
            ))}

            {/* Create new tag option */}
            {searchTerm &&
              !filteredTags.some(
                (tag) => tag.name.toLowerCase() === searchTerm.toLowerCase()
              ) && (
                <button
                  onClick={onTagClick}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors text-left"
                >
                  <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Create "{searchTerm}"
                  </span>
                </button>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TaskModifiers = ({ isHovered }: { isHovered: boolean }) => {
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
          <IconButton tooltipText={'Add Subtask'}>
            <Icon
              name="add02"
              className="w-4 h-4 text-gray-500 hover:text-blue-600"
            />
          </IconButton>
          <IconButton tooltipText={'Rename'}>
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
