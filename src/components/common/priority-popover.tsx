import React, { ReactNode } from 'react';
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
import { Priority } from '@/types/request-response/workspace/ApiResponse';

export const PriorityPopover = ({
  isOpen,
  setIsOpen,
  children,
  priorityList,
}: {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  children: ReactNode;
  priorityList: Priority[];
}) => {
  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={'bottom'}
        align={'start'}
        className="w-[178px] flex flex-col p-0 min-h-[70px]"
      >
        {priorityList &&
          priorityList.length > 0 &&
          priorityList.map((priority) => (
            <PriorityButton
              title={priority.title}
              style={{ color: priority.color }}
            />
          ))}

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
  style,
}: {
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Button
      variant="ghost"
      className="h-[32px] !cursor-pointer hover:bg-secondary text-base flex justify-start items-center px-3"
    >
      <div className="w-6 flex justify-center items-center shrink-0">
        <Icon name={'priority02'} style={style} className={className} />
      </div>
      <span className="ml-2 font-normal text-lg">{title}</span>
    </Button>
  );
};
