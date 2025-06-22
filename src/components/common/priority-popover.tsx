import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/shadcn-ui/popover';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Icon } from '@/assets/icon-path';
import { Ban } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings';
import { ReactNode } from 'react';

export const PriorityPopover = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[178px] flex flex-col px-[6px] min-h-[70px]">
        <PriorityButton
          title={LABEL.URGENT}
          className={'text-content-danger'}
        />
        <PriorityButton title={LABEL.HIGH} className={'text-content-warning'} />
        <PriorityButton
          title={LABEL.NORMAL}
          className={'text-content-normal'}
        />
        <PriorityButton title={LABEL.LOW} className={'text-content-tertiary'} />
        <Separator className={'!h-[1px] my-1'} />
        <Button
          variant="ghost"
          className="h-[32px] text-base flex justify-start items-center px-3"
        >
          <div className="w-6 flex justify-center items-center shrink-0">
            <Ban className={'text-content-tertiary'} />
          </div>
          <span className="ml-2 font-normal text-lg">{LABEL.CLEAR}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const PriorityButton = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      className="h-[32px] text-base flex justify-start items-center px-3"
    >
      <div className="w-6 flex justify-center items-center shrink-0">
        <Icon name={'priority02'} className={className} />
      </div>
      <span className="ml-2 font-normal text-lg">{title}</span>
    </Button>
  );
};
