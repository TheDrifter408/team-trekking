import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { SpaceDefaults } from '@/components/features/space-defaults.tsx';
import { colorOptions } from '@/mock';
import { useState } from 'react';
import { DefaultViews } from '@/components/common/space-default-views';
import { StatusTemplate } from '@/components/features/status-template';
import { cn } from '@/lib/utils/utils.ts';
import { useAppContext } from '@/lib/context/app-layout-context.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { View } from '@/types/request-response/space/ApiResponse.ts';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBack: () => void;
}

export const CreateSpaceWorkflow = ({ isOpen, setIsOpen, onBack }: Props) => {
  const { spaceGlobal } = useAppContext(); // contains workflow data
  const [isDefaultViewOpen, setIsDefaultViewOpen] = useState(false);
  const [isTaskStatusOpen, setIsTaskStatusOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const [defaultViewData, setDefaultViewData] = useState<View[]>([]);

  const templates = spaceGlobal?.workflow ?? [];

  const onSelectTemplate = (templateId: number) => {
    const selected = templates.find((tpl) => tpl.id === templateId);
    setSelectedTemplate(templateId);
    setDefaultViewData(selected?.defaultView || []);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!max-w-[700px] flex flex-col">
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
                  isSelected={selectedTemplate === template.id}
                  onClick={() => onSelectTemplate(template.id)}
                />
              ))}
            </div>
          </div>

          <SpaceDefaults
            colorOptions={colorOptions}
            onClickDefaultView={() => {
              setIsOpen(false);
              setIsDefaultViewOpen(true);
            }}
            onClickStatus={() => {
              setIsOpen(false);
              setIsTaskStatusOpen(true);
            }}
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
      />
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
