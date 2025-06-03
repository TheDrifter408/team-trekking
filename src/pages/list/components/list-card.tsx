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
      <Button size={'auto'} variant={'ghost'} onClick={onToggleExpand}>
        <Icon
          name={'expandsubtask'}
          className={cn(
            'text-content-tertiary transition-transform-[450ms] !size-5 ease-out',
            isTableExpanded ? '-rotate-90' : 'rotate-0'
          )}
        />
      </Button>
      <span className={'text-lg font-medium'}>Tasks</span>
      <span className={'font-medium text-content-tertiary text-base'}>15</span>
      <Button size={'icon_sm'} variant={'ghost'}>
        <Icon name={'menu03'} className={'text-content-tertiary font-medium'} />
      </Button>
      <Button className={'font-normal !h-[28px] !w-[84px]'} variant={'ghost'}>
        <Icon
          name={'add02'}
          className={'size-4 text-content-tertiary font-medium'}
        />
        <span className={'text-content-tertiary text-base font-medium'}>
          Add Task
        </span>
      </Button>
    </div>
  );
};
