import { Button } from '@/components/ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export const NameColumn = ({ task }) => {
  return (
    <div className="flex items-center min-w-0">
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
      <div className="ml-[12px] flex flex-col min-w-0">
        <p className="text-xs font-normal text-content-tertiary cursor-pointer hover:text-content-default truncate">
          Name of the List
        </p>
        <div className="">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-base font-normal text-content-default cursor-pointer hover:text-theme-main truncate">
                  {task.name}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                {task.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {task.subRows.length && (
            <Button size="auto" variant="ghost" className={'ml-2 gap-1'}>
              <Icon name="subtask" className={'size-3'} />
              <p className={'text-content-tertiary'}>{task.subRows.length}</p>
            </Button>
          )}
          <Button size="auto" variant="ghost" className={'ml-2 gap-1'}>
            <Icon name="description" className={'size-3'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
