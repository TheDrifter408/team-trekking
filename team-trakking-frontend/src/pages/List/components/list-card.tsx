import { Button } from '@/components/ui/button.tsx';
import { Icon } from '@/assets/icon-path';

export const ListCard = () => {
  return (
    <div className={'flex items-center h-[28px] gap-[12px]'}>
      <Button size={'icon_sm'} variant={'ghost'}>
        <Icon name={'expandsubtask'} />
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
