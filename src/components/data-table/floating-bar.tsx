import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { Icon } from '@/assets/icon-path';
import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  selectRows: string[];
  selectedCount: number;
}

export const FloatingBar = ({ selectRows, selectedCount }: Props) => {
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
          className="w-[90%] p-[14px] rounded-lg absolute translate-y-1/2 bottom-[50px] bg-primary"
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
                    {selectedCount} Tasks selected
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>
                  <p
                    className={
                      'text-base font-medium py-1 flex gap-x-2 items-center'
                    }
                  >
                    Deselect All
                    <span
                      className={'bg-white bg-opacity-[.134] p-[3px] rounded'}
                    >
                      ESC
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex ">
              <ActionButton text={'Status'} icon={'status3'} />
              <ActionButton text={'Assignee'} icon={'useradd'} />
              <ActionButton text={'Dates'} icon={'calendar'} />
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

const ActionButton = ({ text, icon }: { text: string; icon: any }) => {
  return (
    <Button
      className={
        'text-lg flex text-gray-300 items-center bg-white bg-opacity-0 hover:bg-opacity-[0.134] '
      }
    >
      <Icon name={icon} className={'size-5'} />
      {text}
    </Button>
  );
};
