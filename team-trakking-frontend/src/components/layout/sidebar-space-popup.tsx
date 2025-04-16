import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IconDots } from '@tabler/icons-react';
import {
  Archive,
  Brush,
  CircleDot,
  Edit,
  FolderPlus,
  ListPlus,
  ListTodo,
  Pencil,
  Plus,
  Settings,
  Trash2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { CreateFolder } from '@/components/create-folder.tsx';
import { useState } from 'react';
import { CreateList } from '@/components/create-list.tsx';

export const SidebarSpacePopup = () => {
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [createListOpen, setCreateListOpen] = useState(false);
  const [listName, setListName] = useState('');

  const onCreateList = () => {
    setListName('');
    setCreateListOpen(false);
  };
  const onCreateFolder = () => {
    // Reset and close dialog
    setFolderName('');
    setCreateFolderOpen(false);
  };
  return (
    <div className="flex items-center gap-x-1">
      {/* Dots dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 p-1.5 shadow-lg rounded-lg border border-gray-100"
          side="right"
          align="start"
          sideOffset={5}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
              <Edit className="h-4 w-4 text-gray-500" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
              <Pencil className="h-4 w-4 text-gray-500" />
              <span>Rename</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
              <ListTodo className="h-4 w-4 text-gray-500" />
              <span>View tasks</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
              <CircleDot className="h-4 w-4 text-gray-500" />
              <span>Task statuses</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer">
              <Brush className="h-4 w-4 text-gray-500" />
              <span>Change status</span>
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
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-amber-600 hover:bg-amber-50 cursor-pointer">
              <Archive className="h-4 w-4" />
              <span>Archive</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 cursor-pointer">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Plus button with tooltip and dropdown */}
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100"
                >
                  <Plus className="h-3.5 w-3.5" />
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
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setCreateFolderOpen(true)}
                  className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <FolderPlus className="h-4 w-4 text-gray-500" />
                  <span>Folder</span>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => setCreateListOpen(true)}
                >
                  <ListPlus className="h-4 w-4 text-gray-500" />
                  <span>List</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Tooltip>
      </TooltipProvider>
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
    </div>
  );
};
