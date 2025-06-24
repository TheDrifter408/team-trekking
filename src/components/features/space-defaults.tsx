// components/common/space-settings-options.tsx

import { Layers, CircleDot, ChevronsUpDown } from 'lucide-react';
import { SettingsCard } from '@/components/features/update-space';
import { ColorOption } from '@/types/props/Common';

interface Props {
  colorOptions: ColorOption[];
  onClickDefaultView?: () => void;
  onClickStatus?: () => void;
  defaultContent?: string;
  statusContent?: string;
  clickAppContent?: string;
}

export const SpaceDefaults = ({
  colorOptions,
  onClickDefaultView,
  onClickStatus,
  defaultContent,
  statusContent,
  clickAppContent,
}: Props) => {
  return (
    <>
      <SettingsCard
        icon={<Layers className="h-[18px] text-primary" />}
        title="Default views"
        content={
          defaultContent ??
          'List, Board, Team, Calendar, Gantt, Timeline, Activity, Workload, Map, Mind Map, Table'
        }
        onClickSettings={onClickDefaultView}
      />
      <SettingsCard
        icon={<CircleDot className="h-[18px] text-primary" />}
        title={statusContent ?? 'Task statuses'}
        isList
        colorItems={colorOptions.map((c) => ({
          name: c.name,
          color: c.name.toLowerCase(),
        }))}
        onClickSettings={onClickStatus}
      />
      <SettingsCard
        icon={<ChevronsUpDown className="h-[18px] text-primary" />}
        title={clickAppContent ?? 'ClickApps'}
        content="Time Tracking, Sprint Points, Priority, Tags, Time Estimates, Remap Subtask Due Dates, Multiple Assignees, Email, Work In Progress Limits, Income"
      />
    </>
  );
};
