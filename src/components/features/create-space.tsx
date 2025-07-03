import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Textarea } from '@/components/shadcn-ui/textarea.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { useState } from 'react';
import { ColorOption, IconOption } from '@/types/props/Common';
import { colorOptions, iconOptions } from '@/mock';
import { getInitials, handleMutation } from '@/lib/utils/utils.ts';
import { DropDownContent } from '@/components/common/space-icon-name-dropdown';
import { SelectUsers } from '@/components/common/select-users';
import { CreateSpaceWorkflow } from '@/components/features/create-space-workflow.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import {
  useCreateSpaceMutation,
  useCreateStatusMutation,
} from '@/service/rtkQueries/spaceQuery.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';
import {
  Group,
  ViewStatusResponse,
} from '@/types/request-response/space/ApiResponse.ts';
import { useGetWorkspaceMemberQuery } from '@/service/rtkQueries/workspaceQuery.ts';
import { Member } from '@/types/request-response/workspace/ApiResponse.ts';

interface Props {
  createSpaceOpen: boolean;
  setCreateSpaceOpen: (open: boolean) => void;
  onCreatedSpace: () => void;
}

export const CreateSpace = ({
  createSpaceOpen,
  setCreateSpaceOpen,
  onCreatedSpace,
}: Props) => {
  const { currentWorkspace } = useWorkspaceStore();
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );
  const [description, setDescription] = useState<string>('');
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);
  const [invitedUsers, setInvitedUsers] = useState<Member[]>([]);
  const [spaceName, setSpaceName] = useState<string>('');
  const [searchAvatar, setSearchAvatar] = useState<string>('');
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const initials = getInitials(spaceName)[0] ?? 'P';
  const [createSpace] = useCreateSpaceMutation();
  const [createStatusView] = useCreateStatusMutation();
  const { data: members } = useGetWorkspaceMemberQuery(currentWorkspace?.id!, {
    skip: !currentWorkspace?.id,
  });

  const resetForm = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setCreateSpaceOpen(false);
  };

  const onToggleInvitedUsers = (assignees: Member[]) => {
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

  const onContinueCreateSpace = () => {
    setIsWorkflowOpen(true);
    setCreateSpaceOpen(false);
  };

  const onCloseWorkflow = () => {
    setIsWorkflowOpen(false);
    setCreateSpaceOpen(true);
  };

  const onCreateSpace = async (statusView: Group[]) => {
    const { data: statusViewData } = await handleMutation<ViewStatusResponse>(
      createStatusView,
      {
        name: spaceName,
        workspaceId: Number(currentWorkspace?.id),
        groups: statusView,
      }
    );
    if (statusViewData) {
      const { data: spaceData } = await handleMutation(createSpace, {
        name: spaceName,
        description: description,
        workspaceId: Number(currentWorkspace?.id),
        statusViewGroupId: statusViewData.id,
        visibility: isPrivateMode ? 'private' : 'public',
        ...(invitedUsers.length > 0 && {
          members: invitedUsers.map((user) => user.user.email),
        }),
      });
      if (spaceData) {
        onCreatedSpace();
        setIsWorkflowOpen(false);
        clearSpaceData();
      }
    }
  };
  const clearSpaceData = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setIsPrivateMode(false);
    setInvitedUsers([]);
  };

  return (
    <React.Fragment>
      <Dialog
        open={createSpaceOpen}
        onOpenChange={(open) => {
          if (!open) resetForm();
          setCreateSpaceOpen(open);
        }}
        modal={false}
      >
        <DialogContent className="!max-w-[600px] overflow-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>
              <p className="text-xl text-primary font-semibold">
                {LABEL.CREATE_SPACE}
              </p>
            </DialogTitle>
            <p className="text-base text-muted-foreground mt-1 w-full md:w-[90%]">
              {LABEL.SPACE_DESCRIPTION}
            </p>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {LABEL.ICON_AND_NAME}
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
                  placeholder={LABEL.SPACE_NAME}
                  autoFocus
                  className="w-full h-[40px] text-2xl"
                />
              </div>
            </div>

            <div>
              <p className="text-base mb-2 font-medium text-muted-foreground">
                {LABEL.DESCRIPTION}{' '}
                <span className="text-sm font-normal">({LABEL.OPTIONAL})</span>
              </p>
              <Textarea
                placeholder={''}
                className="!min-h-[25px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <p className="text-base font-medium text-muted-foreground">
                {LABEL.MAKE_PRIVATE}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-base font-normal">
                  {LABEL.ONLY_YOU_AND_INVITED_HAVE_ACCESS}
                </span>
                <Switch
                  checked={isPrivateMode}
                  onCheckedChange={setIsPrivateMode}
                  className={isPrivateMode ? '!bg-theme-main' : ''}
                  id=""
                />
              </div>
            </div>

            {isPrivateMode && (
              <SelectUsers
                multipleSelect={true}
                displayName={false}
                onRemove={() => {}}
                displayOnly={true}
                value={invitedUsers}
                users={members ?? []}
                onChange={(assignees) => onToggleInvitedUsers(assignees)}
                placeholder={LABEL.NO_INVITED_USERS}
                userListTitle={LABEL.SELECT_USERS}
              />
            )}

            <DialogFooter>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateSpaceOpen(false)}
                >
                  {LABEL.CANCEL}
                </Button>
                <Button
                  variant={'default'}
                  className="bg-theme-main text-muted"
                  onClick={onContinueCreateSpace}
                  disabled={isSubmitDisabled}
                >
                  {LABEL.CREATE_SPACE}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <CreateSpaceWorkflow
        isOpen={isWorkflowOpen}
        setIsOpen={setIsWorkflowOpen}
        onBack={onCloseWorkflow}
        onDone={onCreateSpace}
      />
    </React.Fragment>
  );
};
