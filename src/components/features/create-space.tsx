import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Textarea } from '@/components/shadcn-ui/textarea.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { useState } from 'react';
import { Assignee, ColorOption, IconOption } from '@/types/props/Common';
import { colorOptions, iconOptions, taskNotificationUsers } from '@/mock';
import { getInitials } from '@/lib/utils/utils.ts';
import { DropDownContent } from '@/components/common/space-icon-name-dropdown';
import { SelectUsers } from '@/components/common/select-users';

interface Props {
  // Dialog state
  createSpaceOpen: boolean;
  setCreateSpaceOpen: (open: boolean) => void;
  onCreateSpace: () => void;
}

export const CreateSpace = ({
  createSpaceOpen,
  setCreateSpaceOpen,
  onCreateSpace,
}: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );
  const [description, setDescription] = useState<string>('');
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);
  const [invitedUsers, setInvitedUsers] = useState<Assignee[]>([]);
  const [spaceName, setSpaceName] = useState<string>('');
  const [searchAvatar, setSearchAvatar] = useState<string>('');
  const initials = getInitials(spaceName)[0] ?? 'P';

  const resetForm = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setCreateSpaceOpen(false);
  };

  const onToggleInvitedUsers = (assignees: Assignee[]) => {
    setInvitedUsers(assignees);
  };

  const onSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const isSubmitDisabled = !spaceName.trim();

  const onSelectIcon = (icon: IconOption) => {
    setSelectedIcon(icon);
  };

  const clearIcon = () => {
    setSelectedIcon(null);
  };

  return (
    <Dialog
      open={createSpaceOpen}
      onOpenChange={(open) => {
        if (!open) resetForm();
        setCreateSpaceOpen(open);
      }}
    >
      <DialogContent className="max-w-[400px] md:max-w-[650px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a Space
          </DialogTitle>
          <DialogDescription className="text-base font-medium antialiased">
            A space represents teams, departments or groups, each with its own
            Lists, workflows, and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* space Name with Icon Integration */}
          <div>
            <span className="text-sm text-muted-foreground">
              Icon &amp; Name
            </span>
            <div className="flex mt-1 items-center space-x-2">
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
                id="spaceName"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="My New Space"
                autoFocus
                className="w-full text-2xl"
              />
            </div>
          </div>
          {/* Description */}
          <div className="">
            <p className="text-base mb-2 font-medium text-muted-foreground">
              Description
              <span className={'text-sm font-normal'}>( optional )</span>
            </p>
            <Textarea
              placeholder={''}
              className={'!min-h-[25px]'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
          <DialogFooter>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateSpaceOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={'default'}
                className="bg-theme-main text-muted"
                onClick={onCreateSpace}
                disabled={isSubmitDisabled}
              >
                Create Space
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
