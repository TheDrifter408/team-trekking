import { ReactNode, useState } from 'react';
import { ChevronRight, ChevronsUpDown, CircleDot, Layers } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import { Textarea } from '@/components/shadcn-ui/textarea.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { cn, getInitials } from '@/lib/utils/utils.ts';
import { DefaultViews } from '@/components/common/space-default-views.tsx';
import { DropDownContent } from '@/components/common/space-icon-name-dropdown.tsx';
import { StatusTemplate } from '@/components/features/status-template.tsx';
import { Assignee, ColorOption, IconOption } from '@/types/props/Common.ts';
import { iconOptions, colorOptions, taskNotificationUsers } from '@/mock';
import { SelectUsers } from '@/components/common/select-users';

interface UpdateSpaceProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const UpdateSpace = ({ isActive, setIsActive }: UpdateSpaceProps) => {
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );
  const [selectedUser, setSelectedUser] = useState<Assignee | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<Assignee[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);
  const [spaceName, setSpaceName] = useState('ProjecX Moon');
  const [searchAvatar, setSearchAvatar] = useState<string>('');
  const [isDefaultViewOpen, setIsDefaultViewOpen] = useState<boolean>(false);
  const [isTaskStatusOpen, setIsTaskStatusOpen] = useState<boolean>(false);
  const initials = getInitials(spaceName)[0] ?? 'P';

  const onClose = () => {
    setIsActive(false);
  };

  const onSelectIcon = (icon: IconOption) => {
    setSelectedIcon(icon);
  };

  const onSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const clearIcon = () => {
    setSelectedIcon(null);
  };

  const onClickDefaultView = () => {
    setIsActive(false);
    setIsDefaultViewOpen(true);
  };
  const onCloseDefaultView = () => {
    setIsDefaultViewOpen(false);
    setIsActive(true);
  };
  const onClickStatus = () => {
    setIsActive(false);
    setIsTaskStatusOpen(true);
  };
  const onCloseStatus = () => {
    setIsTaskStatusOpen(false);
    setIsActive(true);
  };

  const onSelectedUser = (assignees: Assignee[]) => {
    setSelectedUser(assignees[0] ? assignees[0] : null);
  };

  const onToggleInvitedUsers = (assignees: Assignee[]) => {
    setInvitedUsers(assignees);
  };

  return (
    <Dialog open={isActive} onOpenChange={onClose} modal={true}>
      <DialogContent className="!max-w-[700px] flex flex-col">
        {/* Header Text */}
        <DialogHeader>
          <DialogTitle>
            <p className="text-xl text-primary font-semibold">
              Edit Space settings
            </p>
          </DialogTitle>
          <p className="text-base text-muted-foreground mt-1 w-full md:w-[90%]">
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </p>
        </DialogHeader>
        <div
          className={
            'col-span-2 space-x-2 max-h-[90vh] overflow-y-auto items-center grid grid-cols-2'
          }
        >
          {/* Icon, Name & Color selection */}
          <div className="">
            <p className="text-base font-medium text-muted-foreground">
              Icon & name
            </p>
            <div className="flex mt-2 items-center space-x-2">
              <DropDownContent
                selectedColor={selectedColor}
                selectedIcon={selectedIcon}
                initials={initials}
                onSelectColor={onSelectColor}
                onSelectIcon={onSelectIcon}
                clearIcon={clearIcon}
                searchAvatar={searchAvatar}
                setSearchAvatar={setSearchAvatar}
                iconOptions={iconOptions}
                colorOptions={colorOptions}
              />
              <Input
                value={spaceName}
                className={'h-[2.5rem]'}
                onChange={(e) => setSpaceName(e.target.value)}
              />
            </div>
          </div>
          {/* Owner of the space */}
          <div className="">
            <p className="text-base font-medium text-muted-foreground">Owner</p>
            <div className="flex items-center mt-2 space-x-2 border rounded-lg h-[2.5rem] px-4">
              <SelectUsers
                value={selectedUser ? [selectedUser] : []}
                displayName={true}
                multipleSelect={false}
                onRemove={() => {}}
                placeholder="Please select an Owner"
                userListTitle="Users"
                users={taskNotificationUsers}
                onChange={(selected) => onSelectedUser(selected)}
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="py-1">
          <p className="text-base mb-2 font-medium text-muted-foreground">
            Description
            <span className={'text-sm font-normal'}>{' (optional)'}</span>
          </p>
          <Textarea
            placeholder={''}
            className={'!min-h-[25px]'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/*  Privacy */}
        <div className="">
          <p className="text-base font-medium text-muted-foreground">
            Make Private
          </p>
          <div className="flex justify-between items-center">
            <span className={'text-muted-foreground text-base font-normal'}>
              Only you and invited members have access
            </span>
            <Switch
              checked={isPrivateMode}
              onCheckedChange={setIsPrivateMode}
              className={`${isPrivateMode ? '!bg-theme-main' : ''}`}
              id=""
            />
          </div>
        </div>
        {/* Share with options */}
        {isPrivateMode && (
          <SelectUsers
            multipleSelect={true}
            displayName={false}
            onRemove={() => {}}
            displayOnly={true}
            value={invitedUsers}
            users={taskNotificationUsers}
            onChange={(assignees) => onToggleInvitedUsers(assignees)}
            placeholder="No invited Users"
            userListTitle="Select Users"
          />
        )}
        <Separator decorative={false} className={'!h-[.5px]'} />

        <SettingsCard
          icon={<Layers className="h-[18px] text-primary" />}
          title="Default views"
          content="List, Board, Team, Calendar, Gantt, Timeline, Activity, Workload, Map, Mind Map, Table"
          onClickSettings={onClickDefaultView}
        />

        <SettingsCard
          icon={<CircleDot className="h-[18px] text-primary" />}
          title="Task statuses"
          isList
          colorItems={colorOptions.map((c) => ({
            name: c.name,
            color: c.name.toLowerCase(),
          }))}
          onClickSettings={onClickStatus}
        />

        <SettingsCard
          icon={<ChevronsUpDown className="h-[18px] text-primary" />}
          title="ClickApps"
          content="Time Tracking, Sprint Points, Priority, Tags, Time Estimates, Remap Subtask Due Dates, Multiple Assignees, Email, Work In Progress Limits, Income"
        />
        <DialogFooter className={''}>
          <Button variant={'default'} className={'bg-theme-main'}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
      <DefaultViews isOpen={isDefaultViewOpen} setIsOpen={onCloseDefaultView} />
      <StatusTemplate isOpen={isTaskStatusOpen} setIsOpen={onCloseStatus} />
    </Dialog>
  );
};

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  content?: string;
  isList?: boolean;
  colorItems?: { name: string; color: string }[];
  onClickSettings?: () => void;
}
export const SettingsCard = ({
  icon,
  title,
  content,
  isList = false,
  colorItems = [],
  onClickSettings,
}: SettingsCardProps) => {
  return (
    <div
      className="mt-2 cursor-pointer border items-center rounded-xl p-[12px] flex justify-between"
      onClick={onClickSettings}
    >
      <div className="flex overflow-hidden">
        <div className="size-[42px] items-center justify-center bg-accent/40 border rounded-xl flex flex-shrink-0">
          {icon}
        </div>
        <div className="ml-2 max-w-[70%] overflow-hidden">
          <p className="text-base font-medium">{title}</p>

          {isList ? (
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-1 overflow-hidden truncate whitespace-nowrap">
                {colorItems.map((color) => (
                  <span
                    className="flex items-center gap-1 flex-shrink-0"
                    key={color.name}
                  >
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full border-[1.5px]',
                        `border-${color.color}-500`
                      )}
                    />
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <span className="text-base text-muted-foreground truncate whitespace-nowrap overflow-hidden block mt-1">
              {content}
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center ml-2">
        <span className="text-xs font-medium text-muted-foreground bg-accent rounded-full size-[16px] flex items-center justify-center">
          ?
        </span>
        <ChevronRight className="h-4 w-4 font-medium text-muted-foreground" />
      </div>
    </div>
  );
};
