import { useEffect } from 'react';
import { Task } from '@/types/props/Common.ts';
import { Icon } from '@/assets/icon-path';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { Button } from '@/components/shadcn-ui/button';
import { PriorityPopover } from '@/components/common/priority-popover.tsx';
import { cn } from '@/lib/utils.ts';
import { useState } from 'react';

interface Props {
  task: Task;
}
export const PriorityColumn = ({ task }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const priority = task?.priority;
  let priorityBg = '';
  if (priority === LABEL.LOW)
    priorityBg = 'text-content-tertiary hover:text-content-tertiary';
  else if (priority === LABEL.NORMAL)
    priorityBg = 'text-content-normal hover:text-content-normal';
  else if (priority === LABEL.HIGH)
    priorityBg = 'text-content-warning hover:text-content-warning';
  else priorityBg = 'text-content-danger';

  const priorityIcon = priorityBg?.length > 0 ? 'priority02' : 'priority';

  useEffect(() => {
    if (!isPopoverOpen) {
      setIsHovered(false);
    }
  }, [isPopoverOpen]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      className={`${isHovered ? 'border-l border-r rounded-[2px]' : ''} w-full h-full cursor-pointer rounded hover:bg-accent items-center flex`}
    >
      <PriorityPopover isOpen={isPopoverOpen} setIsOpen={setIsPopoverOpen}>
        <Button
          variant="ghost"
          size="auto"
          className={cn(priorityBg, `hover:scale-105 hover:text-${priorityBg}`)}
        >
          <Icon name={priorityIcon} />
        </Button>
      </PriorityPopover>
    </div>
  );
};
