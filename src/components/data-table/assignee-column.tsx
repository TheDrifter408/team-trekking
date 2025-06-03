'use client';

import { Task } from '@/types/props/Common.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Button } from '@/components/shadcn-ui/button';
import { Icon } from '@/assets/icon-path.tsx';
import { getInitials } from '@/lib/utils.ts';

interface Props {
  task: Task;
}

export const AssigneeColumn = ({ task }: Props) => {
  const assignees = task?.assignees?.slice(0, 3) ?? [];

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {assignees.length > 0 ? (
          assignees.map((assignee, index) => {
            const hasAvatar = Boolean(assignee.avatar);
            return (
              <Tooltip key={assignee.id}>
                <TooltipTrigger asChild>
                  <div
                    className="relative z-0 flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-muted text-xs font-medium text-muted-foreground cursor-pointer"
                    style={{ marginLeft: index === 0 ? 0 : '-0.5rem' }}
                  >
                    {hasAvatar ? (
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(assignee.name)
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {assignee.name}
                </TooltipContent>
              </Tooltip>
            );
          })
        ) : (
          <div>
            <Button
              variant={'ghost'}
              className={
                'w-[22px] h-[22px] !p-0 border-content-tertiary border-[1px] border-dashed rounded-full'
              }
            >
              <Icon name={'addpeople'} />
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
