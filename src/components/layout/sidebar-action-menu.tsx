import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button';
import { IconDots } from '@tabler/icons-react';
import {
  Archive,
  CircleDot,
  Droplets,
  FolderPlus,
  ListPlus,
  Save,
  Pencil,
  Plus,
  Settings,
  Trash2,
  Link2,
  UserPlus,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Separator } from '@/components/shadcn-ui/separator';
import { CreateFolder } from '@/components/features/create-folder.tsx';
import { CreateList } from '@/components/features/create-list.tsx';
import { InviteUser } from '@/components/features/invite-user.tsx';

interface SidebarActionsMenuProps {
  showOptionsMenu?: boolean;
  showAddMenu?: boolean;
  menuSize?: 'default' | 'small';
  customOptionsItems?: React.ReactNode;
  customAddItems?: React.ReactNode;
  onRename?: () => void;
  onCopyLink?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export const SidebarActionsMenu = ({
  showOptionsMenu = true,
  showAddMenu = true,
  menuSize = 'default',
  customOptionsItems,
  customAddItems,
  onRename,
  onCopyLink,
  onArchive,
  onDelete,
}: SidebarActionsMenuProps) => {
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [createListOpen, setCreateListOpen] = useState(false);
  const [listName, setListName] = useState('');
  const [inviteUserOpen, setInviteUserOpen] = useState(false);

  const onInviteUsers = () => {};

  const onCreateList = () => {
    setListName('');
    setCreateListOpen(false);
  };

  const onCreateFolder = () => {
    setFolderName('');
    setCreateFolderOpen(false);
  };

  const onFolderSelect = () => {
    setTimeout(() => {
      setCreateFolderOpen(true);
    }, 10);
  };

  const onListSelect = () => {
    setTimeout(() => {
      setCreateListOpen(true);
    }, 10);
  };
  const onClickInvite = () => {
    setTimeout(() => {
      setInviteUserOpen(true);
    }, 10);
  };

  // Adjust sizes based on the menuSize prop
  const iconSize = menuSize === 'small' ? 'h-3 w-3' : 'h-4 w-4';
  const buttonSize = menuSize === 'small' ? 'h-5 w-5' : 'h-6 w-6';
  const plusIconSize = menuSize === 'small' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  return (
    <div className="flex items-center gap-x-1">
      {/* Options dropdown menu */}
      {showOptionsMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`${buttonSize} text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md`}
            >
              <IconDots className={iconSize} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 p-1.5 shadow-lg rounded-lg border border-gray-100"
            side="right"
            align="start"
            sideOffset={5}
          >
            {customOptionsItems || (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={onRename}
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={onCopyLink}
                  >
                    <Link2 className="h-4 w-4 text-gray-500" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
                    <Droplets className="h-4 w-4 text-gray-500" />
                    <span>Icon & Color</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
                    <CircleDot className="h-4 w-4 text-gray-500" />
                    <span>Task statuses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
                    <Save className="h-4 w-4 text-gray-500" />
                    <span>Save as template</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onClickInvite}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <UserPlus className="h-4 w-4 text-gray-500" />
                    <span>Invite User</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-amber-600 hover:bg-amber-50 cursor-pointer"
                    onClick={onArchive}
                  >
                    <Archive className="h-4 w-4" />
                    <span>Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={onDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Plus button with tooltip and dropdown */}
      {showAddMenu && (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <DropdownMenu>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${buttonSize} text-gray-500 hover:text-indigo-600 hover:bg-indigo-100`}
                  >
                    <Plus className={plusIconSize} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Add new item</p>
              </TooltipContent>
              <DropdownMenuContent
                className="w-40 p-1.5 shadow-lg rounded-lg border border-gray-100"
                side="right"
                align="start"
                sideOffset={5}
              >
                {customAddItems || (
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={onFolderSelect}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <FolderPlus className="h-4 w-4 text-gray-500" />
                      <span>Folder</span>
                    </DropdownMenuItem>
                    {menuSize === 'default' && <Separator />}
                    <DropdownMenuItem
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={onListSelect}
                    >
                      <ListPlus className="h-4 w-4 text-gray-500" />
                      <span>List</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Modals/Dialogs */}
      <CreateFolder
        createFolderOpen={createFolderOpen}
        setCreateFolderOpen={setCreateFolderOpen}
        folderName={folderName}
        setFolderName={setFolderName}
        onCreateFolder={onCreateFolder}
      />
      <CreateList
        createListOpen={createListOpen}
        setCreateListOpen={setCreateListOpen}
        listName={listName}
        setListName={setListName}
        onCreateList={onCreateList}
      />
      <InviteUser
        inviteUserOpen={inviteUserOpen}
        setInviteUserOpen={setInviteUserOpen}
        onInvite={onInviteUsers}
        maxInvites={10}
      />
    </div>
  );
};
