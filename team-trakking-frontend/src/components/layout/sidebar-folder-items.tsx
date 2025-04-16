import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import { Folder, FolderPlus, ListIcon, ListPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { IconDots, IconCaretRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip.tsx';
import { CreateFolder } from '../create-folder';
import { CreateList } from '../create-list';

interface Props {
  name: string;
  folder: {
    id: number;
    name: string;
    lists: [
      {
        name: string;
        id: number;
        taskNumber: number;
      },
    ];
  };
}

export const SidebarFolderItems = ({ name, folder }: Props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonEntered, setIsButtonEntered] = useState(false);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [createListOpen, setCreateListOpen] = useState(false);
  const [listName, setListName] = useState('');
  const listData = folder.lists;

  const onCreateFolder = () => {
    console.log('Creating folder:', folderName);
    setFolderName('');
    setCreateFolderOpen(false);
  };
  const onCreateList = () => {
    console.log('Creating list:', listName);
    setListName('');
    setCreateListOpen(false);
  };
  return (
    <>
      <Collapsible>
        <div
          className="flex items-center justify-between rounded-lg bg-secondary hover:bg-muted transition-colors duration-200 group/space"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center">
            {!isHovered ? (
              <Folder className="h-4 w-4 ml-1  text-indigo-600" />
            ) : (
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 transition-all"
                >
                  <IconCaretRightFilled className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </Button>
              </CollapsibleTrigger>
            )}

            <div className="flex flex-1 items-center">
              <Button
                variant={'link'}
                size={'sm'}
                onMouseEnter={() => setIsButtonEntered(true)}
                onMouseLeave={() => setIsButtonEntered(false)}
                onClick={() => navigate('/folder')}
                className={
                  'text-sm hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
                }
              >
                <span
                  className={cn(
                    'text-xs truncate',
                    isButtonEntered ? 'max-w-[120px]' : 'max-w-[80px] '
                  )}
                >
                  {name}
                </span>
              </Button>
            </div>
          </div>
          {!isButtonEntered && (
            <div className="flex items-center gap-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              >
                <IconDots className="h-4 w-4" />
              </Button>

              {/* Plus Button with Dropdown */}
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
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
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => setCreateFolderOpen(true)}
                        >
                          <FolderPlus className="h-4 w-4 text-gray-500" />
                          <span>Folder</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 cursor-pointer "
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
            </div>
          )}
        </div>

        <CollapsibleContent className="pl-6 mt-1 space-y-1">
          {listData &&
            listData.length > 0 &&
            listData.map((listItem) => (
              <div
                key={listItem.id}
                className="flex items-center justify-between px-1 bg-secondary rounded-md hover:bg-gray-200 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <ListIcon className="h-3 w-3 text-blue-700" />
                  <Button
                    variant={'link'}
                    size={'sm'}
                    onMouseEnter={() => setIsButtonEntered(true)}
                    onMouseLeave={() => setIsButtonEntered(false)}
                    className={
                      'text-sm hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
                    }
                  >
                    <span className={cn('text-xs truncate')}>
                      {listItem.name}
                    </span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                >
                  <IconDots className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </CollapsibleContent>
      </Collapsible>
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
    </>
  );
};
