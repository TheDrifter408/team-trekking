import { useEffect } from 'react';
import { Task } from '@/types/props/Common.ts';
import { Icon } from '@/assets/icon-path';
import { Button } from '@/components/shadcn-ui/button';
import { PriorityPopover } from '@/components/common/priority-popover.tsx';
import { useState } from 'react';

interface Props {
  task: Task;
}
export const PriorityColumn = ({ task }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const priority = task?.priority;
  const priorityIcon = priority ? 'priority02' : 'priority';

  useEffect(() => {
    if (!isPopoverOpen) {
      setIsHovered(false);
    }
  }, [isPopoverOpen]);
  const priorityTitle = priority ? priority.title : '';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      className={`${isHovered ? 'border- rounded-[3px]' : 'border-transparent'} w-full h-full border-l border-r  cursor-pointer rounded hover:bg-accent items-center flex`}
    >
      <PriorityPopover isOpen={isPopoverOpen} setIsOpen={setIsPopoverOpen}>
        <Button variant="ghost" size="auto" className={` h-[39px]`}>
          <Icon
            name={priorityIcon}
            style={{ color: priority ? priority.color : '' }}
          />
          <span className={'text-content-default font-normal'}>
            {priorityTitle}
          </span>
        </Button>
      </PriorityPopover>
    </div>
  );
};
