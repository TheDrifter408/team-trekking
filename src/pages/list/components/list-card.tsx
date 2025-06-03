import { Button } from '@/components/shadcn-ui/button.tsx';
import { Icon } from '@/assets/icon-path';
import { cn } from '@/lib/utils.ts';

interface Props {
  isTableExpanded: boolean;
  onToggleExpand: () => void;
}

export const ListCard = ({ isTableExpanded, onToggleExpand }: Props) => {
  return (
    <div className={'flex items-center h-[28px] gap-[12px]'}>
      <Button size={'icon_sm'} variant={'ghost'} onClick={onToggleExpand}>
        <Icon
          name={'expandsubtask'}
          className={cn(
            'text-content-tertiary transition-transform duration-[450ms] ease-out',
            isTableExpanded ? '-rotate-90' : 'rotate-0'
          )}
        />
      </Button>
      <span className={'text-base'}>Tasks</span>
      <span className={'font-normal text-content-tertiary text-sm'}>15</span>
      <Button size={'icon_sm'} variant={'ghost'}>
        <Icon name={'menu03'} />
      </Button>
      <Button className={'font-normal !h-[28px] !w-[84px]'} variant={'ghost'}>
        <Icon name={'add02'} className={'size-3'} />
        <span className={'text-content-tertiary text-sm'}>Add Task</span>
      </Button>
    </div>
  );
};
