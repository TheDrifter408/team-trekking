// components/common/space-settings-options.tsx

import { Layers, CircleDot, ChevronsUpDown, ArrowRight } from 'lucide-react';
import { SettingsCard } from '@/components/features/settings-card';
import { ClickApp, StatusItem, View } from '@/types/request-response/space/ApiResponse';
import { cn, extractDefaultViews, extractTaskStatus } from '@/lib/utils/utils';

interface Props {
  onClickDefaultView?: () => void;
  onClickStatus?: () => void;
  defaultContent: View[];
  statusContent: Record<string, StatusItem[]>;
  clickAppContent: ClickApp[];
}

export const SpaceDefaults = ({
  onClickDefaultView,
  onClickStatus,
  defaultContent,
  statusContent,
  clickAppContent,
}: Props) => {
  const defalutViewsContent = extractDefaultViews(defaultContent);
  const taskStatusContent = extractTaskStatus(statusContent);

  return (
    <>
      <SettingsCard
        icon={<Layers className="h-[18px] text-primary" />}
        title="Default views"
        onClickSettings={onClickDefaultView}
      >
        <p className='text-base text-muted-foreground'>{defalutViewsContent}</p>
      </SettingsCard>
      <SettingsCard
        icon={<CircleDot className="h-[18px] text-primary" />}
        title={'Task statuses'}
        onClickSettings={onClickStatus}
      >
        <div className="text-base text-muted-foreground flex items-center gap-1 overflow-hidden whitespace-nowrap">
          {taskStatusContent.map((color) => (
            <span
              className="flex items-center gap-1 flex-shrink-0"
              key={color.name}
            >
              <div
                className={cn(
                  'w-3 h-3 rounded-full border-[1.5px]',
                )}
                style={{ backgroundColor: `${color.color}` }}
              />
              {color.name}<ArrowRight size={14} />
            </span>
          ))}
        </div>
      </SettingsCard>
      <SettingsCard
        icon={<ChevronsUpDown className="h-[18px] text-primary" />}
        title="ClickApps"
      >
        <p className="text-base text-muted-foreground">{clickAppContent.map((value:ClickApp) => value.title).join(',')}</p>
      </SettingsCard>
    </>
  );
};
