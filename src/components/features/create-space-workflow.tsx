import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { SpaceDefaults } from '@/components/features/space-defaults.tsx';
import { useEffect, useState } from 'react';
import { DefaultViews } from '@/components/common/space-default-views';
import { StatusTemplate } from '@/components/features/status-template';
import { cn } from '@/lib/utils/utils.ts';
import { useAppContext } from '@/lib/context/app-layout-context.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import {
  View,
  StatusItem,
  Workflow,
  ClickApp,
} from '@/types/request-response/space/ApiResponse.ts';
import { ClickAppsDialog } from './clickapps-dialog';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBack: () => void;
}

export const CreateSpaceWorkflow = ({ isOpen, setIsOpen, onBack }: Props) => {
  const { spaceGlobal } = useAppContext(); // contains workflow data
  // Dialog States for default views, task Statuses and ClickApps 
  const [isDefaultViewOpen, setIsDefaultViewOpen] = useState(false);
  const [isTaskStatusOpen, setIsTaskStatusOpen] = useState(false);
  const [isClickAppsOpen, setIsClickAppsOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<Workflow | null>(null);

  const [defaultViewData, setDefaultViewData] = useState<View[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<Record<string, StatusItem[]>>({});
  const [clickApps, setClickApps] = useState<ClickApp[]>([]);

  const templates = spaceGlobal?.workflow ?? [];

  const onSelectTemplate = (templateId: number) => {
    const selected = templates.find((tpl) => tpl.id === templateId);
    if (selected) {
      setSelectedTemplate(selected);
      setDefaultViewData(selected.defaultView);
      setTaskStatuses(selected.statusItems);
    }

  };

  const onSelectClickApp = (app: ClickApp) => {
    const foundClickApp = clickApps.find((a) => a.id === app.id);
    if (!foundClickApp) {
      return;
    } else {
      const newSelectedClickApps = clickApps.map(
        (a) => a.id === foundClickApp.id ? { ...a, isActive: !a.isActive } : a
      );
      setClickApps(newSelectedClickApps);
    }
  }

  useEffect(() => {
    if (spaceGlobal) {
      setSelectedTemplate(spaceGlobal.workflow[0]);
      setDefaultViewData(spaceGlobal.workflow[0].defaultView);
      setTaskStatuses(spaceGlobal.workflow[0].statusItems);
      setClickApps(spaceGlobal.clickApps);
    }
  }, [spaceGlobal]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(
          "!max-w-[700px] flex flex-col transition-opacity duration-300",
          "data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
          )}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
              {LABEL.DEFINE_YOUR_WORKFLOW}
            </DialogTitle>
            <p className="text-base text-muted-foreground mt-1">
              {LABEL.DEFINE_WORKFLOW_DESCRIPTION}
            </p>
          </DialogHeader>

          <div className="py-[15px]">
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <Template
                  key={template.id}
                  templateTitle={template.title}
                  templateDescription={template.subTitle}
                  isSelected={selectedTemplate ? selectedTemplate.id === template.id : false}
                  onClick={() => onSelectTemplate(template.id)}
                />
              ))}
            </div>
          </div>

          <SpaceDefaults
            onClickDefaultView={() => {
              setIsOpen(false);
              setIsDefaultViewOpen(true);
            }}
            defaultContent={defaultViewData}
            onClickStatus={() => {
              setIsOpen(false);
              setIsTaskStatusOpen(true);
            }}
            statusContent={taskStatuses}
            onClickClickApps={() => {
              setIsOpen(false);
              setIsClickAppsOpen(true);
            }}
            clickAppContent={clickApps}
          />

          <DialogFooter className="w-full flex !justify-between">
            <Button variant="outline" onClick={onBack}>
              {LABEL.BACK}
            </Button>
            <Button
              variant="default"
              className="bg-theme-main"
              onClick={() => setIsOpen(false)}
            >
              {LABEL.DONE}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DefaultViews
        isOpen={isDefaultViewOpen}
        setIsOpen={() => {
          setIsDefaultViewOpen(false);
          setIsOpen(true);
        }}
        data={defaultViewData}
      />
      <StatusTemplate
        isOpen={isTaskStatusOpen}
        setIsOpen={() => {
          setIsTaskStatusOpen(false);
          setIsOpen(true);
        }}
        data={taskStatuses}
      />
      <ClickAppsDialog
        isOpen={isClickAppsOpen}
        onOpenChange={() => {
          setIsClickAppsOpen(false);
          setIsOpen(true);
        }}
        selectedClickApps={clickApps}
        onSelectClickApp={onSelectClickApp} />
    </>
  );
};

const Template = ({
  templateTitle,
  templateDescription,
  isSelected = false,
  onClick,
}: {
  templateTitle: string;
  templateDescription: string;
  isSelected?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        'border rounded-lg p-3 flex-1 cursor-pointer',
        isSelected && 'border-theme-main bg-theme-main-light'
      )}
      onClick={onClick}
    >
      <p className="font-medium text-base text-content-default">
        {templateTitle}
      </p>
      <span className="text-content-tertiary text-sm font-medium">
        {templateDescription}
      </span>
    </div>
  );
};
