import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { viewIconMap } from '@/lib/constants/viewIcons';
import { View } from '@/types/request-response/space/ApiResponse.ts';
import { LABEL } from '@/lib/constants/appStrings';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data?: View[] | null;
}

export const DefaultViews = ({ isOpen, setIsOpen, data }: Props) => {
  const [activeView, setActiveView] = useState<string>(LABEL.REQUIRED_VIEWS);
  const views = [LABEL.REQUIRED_VIEWS, LABEL.DEFAULT_VIEW_TEMPLATES];

  const transformedViews = useMemo(() => {
    return (data ?? []).map((view) => ({
      id: String(view.id),
      icon: viewIconMap[view.type.toLowerCase()],
      defaultView: view.title === 'List',
      name: view.title,
      isSelected: view.isActive,
    }));
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="!max-w-[690px] min-h-[90vh] flex flex-col">
        <DialogHeader className="w-full flex items-center justify-center">
          <DialogTitle className="text-3xl mt-4">
            {LABEL.DEFAULT_SETTINGS_FOR_VIEWS}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full mt-5 max-h-[90vh]">
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
          <div className="w-full">
            {activeView === LABEL.REQUIRED_VIEWS ? (
              <RequiredViewsContent requiredViews={transformedViews} />
            ) : (
              <DefaultViewsContent />
            )}
          </div>
        </div>
        <div className="px-[40px] flex justify-center mt-auto mb-4">
          <Button
            onClick={() => setIsOpen(false)}
            size="lg"
            className="w-full bg-theme-main-dark text-base font-medium justify-center items-center"
          >
            {LABEL.DONE}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface RequiredView {
  id: string;
  icon: React.FC<{ className?: string }>;
  name: string;
  defaultView: boolean;
  isSelected: boolean;
}

function RequiredViewsContent({
  requiredViews,
}: {
  requiredViews: RequiredView[];
}) {
  const [views, setViews] = useState<RequiredView[]>(requiredViews);

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
        {LABEL.REQUIRED_VIEWS_DESCRIPTION}
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 w-full max-w-[550px] items-end">
        {views.map((view) => (
          <div
            key={view.id}
            className="relative flex flex-col border-[2px] rounded-sm border-theme-main self-end"
          >
            {view.defaultView && (
              <div className="bg-theme-main text-white text-sm font-medium text-center px-2">
                {LABEL.ALWAYS_REQUIRED}
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
                    {LABEL.DEFAULT_VIEW}
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
      <div>{LABEL.DEFAULT_VIEWS}</div>
    </div>
  );
}
