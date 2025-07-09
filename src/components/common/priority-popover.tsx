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
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';

type PriorityPopoverProps = {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  children: ReactNode;
  onSelect?: (priority: Priority | null) => void; // TODO: Make this required once usage is finalized
};

export const PriorityPopover = ({
  isOpen,
  setIsOpen,
  children,
  onSelect,
}: PriorityPopoverProps) => {
  const { workspaceGlobal } = useWorkspaceStore();
  const priorityList = workspaceGlobal?.priority ?? [];
  const onSelectPriority = (priority: Priority) => {
    // TODO: Remove fallback once `onSelect` is always passed
    if (onSelect) onSelect(priority);
  };
  const onClear = () => {
    if (onSelect) onSelect(null);
  };
  const hasPriorityList = priorityList && priorityList.length > 0;

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-[178px] flex flex-col p-0 min-h-[70px]"
      >
        {hasPriorityList &&
          priorityList.map((priority) => (
            <PriorityButton
              key={priority.id} // TODO: Ensure priority objects have unique IDs
              onSelectPriority={() => onSelectPriority(priority)}
              title={priority.title}
              style={{ color: priority.color }}
            />
          ))}
        <Separator className="!h-[1px] my-1" />
        <Button
          onClick={onClear}
          variant="ghost"
          className="h-[32px] text-base flex justify-start items-center px-3"
        >
          <div className="w-6 flex justify-center items-center shrink-0">
            <Ban className="text-content-tertiary" />
          </div>
          <span className="ml-2 font-normal text-lg">{LABEL.CLEAR}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

type PriorityButtonProps = {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  onSelectPriority?: () => void; // TODO: Make required when used in command context
};

export const PriorityButton = ({
  title,
  className = '',
  style,
  onSelectPriority,
}: PriorityButtonProps) => {
  return (
    <Button
      onClick={onSelectPriority} // no-op is fine if undefined
      variant="ghost"
      className="h-[32px] !cursor-pointer hover:bg-secondary text-base flex justify-start items-center px-3"
    >
      <div className="w-6 flex justify-center items-center shrink-0">
        <Icon name="priority02" style={style} className={className} />
      </div>
      <span className="ml-2 font-normal text-lg">{title}</span>
    </Button>
  );
};
