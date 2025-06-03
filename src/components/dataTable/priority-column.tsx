import { Task } from '@/types/props/Common.ts';
import { Icon } from '@/assets/icon-path';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';

interface Props {
  task: Task;
}
export const PriorityColumn = ({ task }: Props) => {
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
  return (
    <div>
      <Button
        variant={'ghost'}
        size={'auto'}
        className={cn(priorityBg, 'hover:scale-105')}
      >
        <Icon name={priorityIcon} />
      </Button>
    </div>
  );
};
