import { Button } from '@/components/ui/button';
import { ViewMode } from 'gantt-task-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  const viewModes: { label: string; mode: ViewMode }[] = [
    { label: 'Hour', mode: ViewMode.Hour },
    { label: 'Quarter Day', mode: ViewMode.QuarterDay },
    { label: 'Half Day', mode: ViewMode.HalfDay },
    { label: 'Day', mode: ViewMode.Day },
    { label: 'Week', mode: ViewMode.Week },
    { label: 'Month', mode: ViewMode.Month },
    { label: 'Year', mode: ViewMode.Year },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border bg-muted">
      <div className="flex flex-wrap gap-2">
        {viewModes.map(({ label, mode }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            onClick={() => onViewModeChange(mode)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="show-task-list"
          checked={isChecked}
          onCheckedChange={onViewListChange}
        />
        <Label htmlFor="show-task-list">Show Task List</Label>
      </div>
    </div>
  );
};
