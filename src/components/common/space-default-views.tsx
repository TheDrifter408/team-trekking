import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { requiredViews } from '@/mock';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DefaultViews = ({ isOpen, setIsOpen }: Props) => {
  const [activeView, setActiveView] = useState<string>('Required Views');
  const views = ['Required Views', 'Default View Templates'];

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="!max-w-[690px] flex flex-col">
        <DialogHeader className="w-full flex items-center justify-center">
          <DialogTitle className="text-3xl mt-4">
            Default settings for Views
          </DialogTitle>
        </DialogHeader>
        <div className="w-full mt-5 ">
          <div className="relative w-full px-[40px] flex border-b-[1px]">
            {views.map((view, i) => (
              <div
                key={i}
                className="w-1/2 flex font-medium text-lg text-gray-600 dark:text-gray-50 justify-center items-center cursor-pointer py-2 relative"
                onClick={() => setActiveView(view)}
              >
                <span className="text-center">{view}</span>
                {activeView === view && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-theme-main-dark" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-[40px] flex justify-center">
          <div className="w-full ">
            {activeView === 'Required Views' ? (
              <RequiredViewsContent />
            ) : (
              <DefaultViewsContent />
            )}
          </div>
        </div>
        <div className="px-[40px] flex justify-center mt-auto mb-4">
          <Button
            size={'lg'}
            className="w-full bg-theme-main-dark text-base font-medium justify-center items-center"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function RequiredViewsContent() {
  const [views, setViews] = useState(requiredViews);

  const onToggle = (id: string) => {
    setViews((prev) =>
      prev.map((view) =>
        view.id === id ? { ...view, isSelected: !view.isSelected } : view
      )
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="text-center text-base max-w-[550px]">
        When navigating to Spaces, Folders, and Lists in ClickUp, you can set
        which view(s) are automatically created and required, without having to
        create them manually. These views cannot be deleted.
      </div>
      <div className="grid grid-cols-2 grid-flow-row-dense gap-y-4 gap-x-6 w-full max-w-[550px] items-end">
        {views.map((view) => (
          <div
            key={view.id}
            className="relative flex flex-col border-[2px] rounded-sm border-theme-main self-end"
            style={{ height: 'auto' }}
          >
            {view.defaultView && (
              <div className="bg-theme-main text-white text-sm font-medium text-center px-2">
                ALWAYS REQUIRED
              </div>
            )}
            <div className="flex p-4 justify-between items-center">
              <div className="flex gap-2 items-center">
                <view.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{view.name}</span>
              </div>
              <div className="gap-2 flex items-center">
                {view.defaultView && (
                  <span className="text-sm font-medium text-theme-main">
                    Default View
                  </span>
                )}
                <Switch
                  disabled={view.defaultView}
                  checked={view.isSelected}
                  onCheckedChange={() => onToggle(view.id)}
                  className="data-[state=unchecked]:bg-muted-foreground data-[state=checked]:bg-theme-main"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefaultViewsContent() {
  return (
    <div className="w-full flex justify-center">
      <div>Default views</div>
    </div>
  );
}
