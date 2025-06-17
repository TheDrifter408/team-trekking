import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/shadcn-ui/sheet.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { AvailableColumnsDrawer } from './available-columns-drawer';
import { CreateField } from './create-fields-drawer';
import { ArrowLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ColumnDrawer = ({ open, onClose }: Props) => {
  const [isAvailableDrawer, setIsAvailablesDrawer] = useState(true);

  const title = isAvailableDrawer ? 'Fields' : 'Create Field';
  const footerButtonTitle = isAvailableDrawer
    ? 'Create Field'
    : 'Add Existing Field';

  const onSwitchLayout = () => {
    setIsAvailablesDrawer(!isAvailableDrawer);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        overlay={false}
        side="right"
        className="w-[300px] gap-0 top-[136px] h-[calc(100%-137px)] sm:w-[400px] flex flex-col overflow-hidden"
      >
        <SheetHeader className="flex-shrink-0 bg-background h-[50px] px-4">
          <div className="relative flex items-center justify-between h-full">
            <SheetTitle className="text-2xl font-semibold flex gap-x-2 items-center">
              {!isAvailableDrawer && (
                <Button variant={'ghost'} onClick={onSwitchLayout}>
                  <ArrowLeftIcon />
                </Button>
              )}
              {title}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-y-scroll no-scrollbar">
          {isAvailableDrawer ? <AvailableColumnsDrawer /> : <CreateField />}
        </div>

        {/* Fixed Footer */}
        <SheetFooter className="flex-shrink-0 border-t bg-background">
          <div className="flex justify-center items-center w-full">
            <Button
              onClick={onSwitchLayout}
              className={cn(
                'w-full h-[43px] text-lg',
                isAvailableDrawer
                  ? 'bg-theme-main-dark'
                  : 'text-content-tertiary bg-gray-100'
              )}
              variant={isAvailableDrawer ? 'default' : 'outline'}
            >
              {footerButtonTitle}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
