import { Button } from '@/components/ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { TextTooltip } from '@/components/ui/tooltip';
import { Task } from '@/types/props/Common.ts';
import { ReactNode } from 'react';
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
            <Icon name="progress2" className={'size-4'} />
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
            {(task.subTaskCount ?? 0) > 0 && (
              <IconButton>
                <Icon name="subtask" className="size-4" />
                <p className="text-content-tertiary">{task.subTaskCount}</p>
              </IconButton>
            )}
            {(task.description?.length ?? 0) > 0 && (
              <IconButton>
                <Icon name="description" className="size-4" />
              </IconButton>
            )}
            {isHovered && (
              <div className="flex gap-0.5 ml-2">
                <IconButton>
                  <Icon name="tag" className="size-auto" />
                </IconButton>
                <IconButton>
                  <Icon
                    name="add02"
                    className="size-4 text-content-tertiary hover:text-theme-main"
                  />
                </IconButton>
                <IconButton>
                  <Icon
                    name="edit"
                    className="size-4 text-content-tertiary hover:text-theme-main"
                  />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const IconButton = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Button
      {...props}
      className={cn(className, 'py-[5px] px-[7px]')}
      size={'auto'}
      variant={'ghost'}
    >
      {children}
    </Button>
  );
};
