import { useEffect, useState } from 'react';
import { getInitials } from '@/lib/utils/utils.ts';
import { Assignee, ColorOption, IconOption } from '@/types/props/Common.ts';
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
import { DefaultViews } from '@/components/common/space-default-views.tsx';
import { DropDownContent } from '@/components/common/space-icon-name-dropdown.tsx';
import { SelectUsers } from '@/components/common/select-users';
import { StatusTemplate } from '@/components/features/status-template.tsx';
import { SpaceDefaults } from '@/components/features/space-defaults.tsx';
import { useAppContext } from '@/lib/context/app-layout-context';

import { iconOptions, colorOptions, taskNotificationUsers } from '@/mock';
import { LABEL } from '@/lib/constants';
import { ClickApp, StatusItem, View } from '@/types/request-response/space/ApiResponse';

interface Props {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const UpdateSpace = ({ isActive, setIsActive }: Props) => {
  const { spaceGlobal } = useAppContext();
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );
  const [selectedUser, setSelectedUser] = useState<Assignee | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<Assignee[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);
  const [spaceName, setSpaceName] = useState(LABEL.PROJECTX_MOON); // replace with your constant key
  const [searchAvatar, setSearchAvatar] = useState<string>('');
  const [isDefaultViewOpen, setIsDefaultViewOpen] = useState<boolean>(false);
  const [isTaskStatusOpen, setIsTaskStatusOpen] = useState<boolean>(false);
  const initials = getInitials(spaceName)[0] ?? LABEL.DEFAULT_INITIAL; // e.g. 'P'

  const [defaultViewData, setDefaultViewData] = useState<View[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<Record<string, StatusItem[]>>({});
  const [clickApps, setClickApps] = useState<ClickApp[]>([]);


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

  useEffect(() => {
    if (spaceGlobal) {
      setDefaultViewData(spaceGlobal.workflow[0].defaultView);
      setTaskStatuses(spaceGlobal.workflow[0].statusItems);
      setClickApps(spaceGlobal.clickApps);
    }
  }, [spaceGlobal]);


  return (
    <Dialog open={isActive} onOpenChange={onClose} modal={true}>
      <DialogContent className="!max-w-[700px] flex flex-col">
        {/* Header Text */}
        <DialogHeader>
          <DialogTitle>
            <p className="text-xl text-primary font-semibold">
              {LABEL.EDIT_SPACE_SETTINGS}
            </p>
          </DialogTitle>
          <p className="text-base text-muted-foreground mt-1 w-full md:w-[90%]">
            {LABEL.SPACE_DESCRIPTION}
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
              {LABEL.ICON_AND_NAME}
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
            <p className="text-base font-medium text-muted-foreground">
              {LABEL.OWNER}
            </p>
            <div className="flex items-center mt-2 space-x-2 border rounded-lg h-[2.5rem] px-4">
              <SelectUsers
                value={selectedUser ? [selectedUser] : []}
                displayName={true}
                multipleSelect={false}
                onRemove={() => { }}
                placeholder={LABEL.PLEASE_SELECT_OWNER}
                userListTitle={LABEL.USERS}
                users={taskNotificationUsers}
                onChange={(selected) => onSelectedUser(selected)}
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="py-1">
          <p className="text-base mb-2 font-medium text-muted-foreground">
            {LABEL.DESCRIPTION}{' '}
            <span className={'text-sm font-normal'}>({LABEL.OPTIONAL})</span>
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
            {LABEL.MAKE_PRIVATE}
          </p>
          <div className="flex justify-between items-center">
            <span className={'text-muted-foreground text-base font-normal'}>
              {LABEL.ONLY_YOU_AND_INVITED_HAVE_ACCESS}
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
            onRemove={() => { }}
            displayOnly={true}
            value={invitedUsers}
            users={taskNotificationUsers}
            onChange={(assignees) => onToggleInvitedUsers(assignees)}
            placeholder={LABEL.NO_INVITED_USERS}
            userListTitle={LABEL.SELECT_USERS}
          />
        )}
        <Separator decorative={false} className={'!h-[.5px]'} />

        <SpaceDefaults
          defaultContent={defaultViewData}
          statusContent={taskStatuses}
          clickAppContent={clickApps}
          onClickDefaultView={onClickDefaultView}
          onClickStatus={onClickStatus}
        />
        <DialogFooter className={''}>
          <Button variant={'default'} className={'bg-theme-main'}>
            {LABEL.SAVE_CHANGES}
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* Extra dialogs */}
      <DefaultViews
        data={defaultViewData}
        isOpen={isDefaultViewOpen}
        setIsOpen={onCloseDefaultView}
      />
      <StatusTemplate isOpen={isTaskStatusOpen} setIsOpen={onCloseStatus} />
    </Dialog>
  );
};
