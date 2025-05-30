import { Button } from '@/components/ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export const NameColumn = ({ task, isHovered }) => {
  return (
    <div className="flex items-center w-[240px] overflow-hidden">
      <div className="w-[40px] flex-shrink-0 flex justify-between items-center">
        <Button size="auto" variant="ghost">
          <Icon
            name="expandsubtask"
            className="text-content-tertiary -rotate-90"
          />
        </Button>
        <Button
          size="auto"
          variant="ghost"
          style={{ color: task.status.color }}
        >
          <Icon name="progress2" />
        </Button>
      </div>
      <div className="ml-[12px] flex flex-col overflow-hidden">
        <p className="text-xs font-normal text-content-tertiary cursor-pointer hover:text-content-default truncate">
          Name of the List
        </p>
        <div className="flex items-center overflow-hidden">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-base font-normal text-content-default cursor-pointer hover:text-theme-main truncate max-w-[140px]">
                  {task.name}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                {task.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex-shrink-0 flex ml-2 gap-1">
            {task.subRows.length > 0 && (
              <Button size="auto" variant="ghost" className="gap-1">
                <Icon name="subtask" className="size-3" />
                <p className="text-content-tertiary">{task.subRows.length}</p>
              </Button>
            )}
            <Button size="auto" variant="ghost" className="gap-1">
              <Icon name="description" className="size-3" />
            </Button>
            {isHovered && (
              <div className="flex gap-0.5 ml-2">
                <Button size="auto" variant="ghost" className="gap-1 bg-accent">
                  <Icon name="tag" className="size-auto" />
                </Button>
                <Button size="auto" variant="ghost" className="gap-1 bg-accent">
                  <Icon
                    name="add02"
                    className="size-auto text-content-tertiary hover:text-theme-main"
                  />
                </Button>
                <Button size="auto" variant="ghost" className="gap-1 bg-accent">
                  <Icon
                    name="edit"
                    className="size-auto text-content-tertiary hover:text-theme-main"
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
