// components/common/space-settings-options.tsx

import { Layers, CircleDot, ChevronsUpDown, ArrowRight } from 'lucide-react';
import { SettingsCard } from '@/components/features/settings-card';
import {
  ClickApp,
  DefaultView,
  Item,
  Group,
} from '@/types/request-response/space/ApiResponse';
import { cn, extractDefaultViews } from '@/lib/utils/utils';

interface Props {
  onClickDefaultView?: () => void;
  onClickStatus?: () => void;
  onClickClickApps: () => void;
  defaultContent: DefaultView[];
  statusContent: Group[];
  clickAppContent: ClickApp[];
}

export const SpaceDefaults = ({
  onClickDefaultView,
  onClickStatus,
  onClickClickApps,
  defaultContent,
  statusContent,
  clickAppContent,
}: Props) => {
  const defalutViewsContent = extractDefaultViews(defaultContent);

  return (
    <>
      <SettingsCard
        icon={<Layers className="h-[18px] text-primary" />}
        title="Default views"
        onClickSettings={onClickDefaultView}
      >
        <p className="text-base text-muted-foreground">{defalutViewsContent}</p>
      </SettingsCard>
      <SettingsCard
        icon={<CircleDot className="h-[18px] text-primary" />}
        title={'Task statuses'}
        onClickSettings={onClickStatus}
      >
        <div className="text-base text-muted-foreground flex items-center gap-1 overflow-hidden whitespace-nowrap">
          {statusContent ? (
            statusContent.map((group) =>
              group.items.map((status: Item) => (
                <span
                  className="flex items-center gap-1 flex-shrink-0"
                  key={status.id}
                >
                  <div
                    className={cn('w-3 h-3 rounded-full border-[1.5px]')}
                    style={{ backgroundColor: status.color }}
                  />
                  {status.name.toUpperCase()}
                  <ArrowRight size={14} />
                </span>
              ))
            )
          ) : (
            <div />
          )}
        </div>
      </SettingsCard>
      <SettingsCard
        icon={<ChevronsUpDown className="h-[18px] text-primary" />}
        title="ClickApps"
        onClickSettings={onClickClickApps}
      >
        <p className="text-base text-muted-foreground">
          {clickAppContent.map((value: ClickApp) => value.title).join(',')}
        </p>
      </SettingsCard>
    </>
  );
};
