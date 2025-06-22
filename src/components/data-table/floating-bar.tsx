import React, { forwardRef } from 'react';
import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { Icon } from '@/assets/icon-path';
import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { LABEL } from '@/lib/constants/appStrings';
import TaskStatusDialog from '@/components/common/task-status-dialog.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  selectedCount: number;
}

export const FloatingBar = ({ selectedCount }: Props) => {
  const removeAllRows = useDataTableStore((state) => state.removeAllRows);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedCount > 0) {
        event.preventDefault();
        removeAllRows();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [removeAllRows, selectedCount]);

  const onDeselectAll = () => {
    removeAllRows();
  };
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full p-[10px] rounded-lg  bg-primary"
        >
          <div className="h-[32px] flex items-center justify-between text-primary-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type={'button'}
                    className={
                      'text-lg bg-white bg-opacity-0 hover:bg-opacity-[0.134] border-gray-500 border'
                    }
                    onClick={onDeselectAll}
                  >
                    {selectedCount} {LABEL.TASKS_SELECTED}
                    <XIcon className={'size-4'} onClick={onDeselectAll} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>
                  <p
                    className={
                      'text-base font-medium py-1 flex gap-x-2 items-center'
                    }
                  >
                    {LABEL.DESELECT_ALL}
                    <span
                      className={'bg-white bg-opacity-[.134] p-[3px] rounded'}
                    >
                      {LABEL.ESC}
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-center">
              <TaskStatusDialog>
                <ActionButton text={'Status'} icon={'status3'} />
              </TaskStatusDialog>
              <ActionButton text={'Assignees'} icon={'useradd'} />
              <ActionButton text={'Dates'} icon={'calendar'} />
              <div className={'border-l border-gray-400 h-[20px] '} />
              <ActionButton text={'Move/Add'} icon={'move'} />
              <ActionButton text={''} icon={'duplicate'} />
              <ActionButton text={''} icon={'trash'} />
              <ActionButton text={'More'} icon={'menu02'} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ text, icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="button"
        {...props}
        className="text-base text-gray-300 rounded hover:bg-white bg:opacity-0 hover:bg-opacity-[0.135] flex items-center"
      >
        <Icon name={icon as never} className={'size-5'} />
        {text}
      </Button>
    );
  }
);
