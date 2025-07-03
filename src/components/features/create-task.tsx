import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/shadcn-ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { PlaceholderAvatar } from '@/components/common/avatar-generator';
import { LABEL } from '@/lib/constants';
import {
  ListIcon,
  XIcon,
  ChevronDownIcon,
  CircleIcon,
  FolderOpenIcon,
  FolderIcon,
} from 'lucide-react';
import { spaceData } from '@/mock/workspaceData';
import { Icon } from '@/assets/icon-path';
import { useEffect, useRef, useState } from 'react';
import TaskTypeDropdown from '@/components/common/task-type-dropdown.tsx';
import { DocEditor } from '@/pages/task/components/doc-editor.tsx';
import { $getRoot, EditorState } from 'lexical';
import TaskStatusDialog from '@/components/common/task-status-dialog.tsx';
import { PriorityPopover } from '@/components/common/priority-popover.tsx';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const CreateTask = ({ isOpen, setIsOpen, children }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          hideCloseButton
          className={cn(
            '!max-w-[700px] !pb-0 flex flex-col transition-opacity duration-0',
            'data-[state=open]:opacity-100 data-[state=closed]:opacity-0 pt-2 px-0'
          )}
        >
          <Tabs defaultValue="task" className="w-full">
            <DialogHeader className="relative">
              <DialogTitle className="text-xl px-2 flex items-center w-full justify-between font-semibold text-primary">
                <TabsList variant="underline" width="fit" className="w-full">
                  <TabsTrigger
                    className="text-base font-medium text-content-tertiary"
                    variant="underline"
                    value="task"
                  >
                    {LABEL.TASK}
                  </TabsTrigger>
                </TabsList>
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 mr-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <XIcon className="size-4 m-2" />
              </button>
            </DialogHeader>
            <div className="px-6 pb-6">
              <TabsContent value="task">
                <TaskContent />
              </TabsContent>
            </div>
          </Tabs>
          <div className="flex items-center rounded-b-lg p-4 border-t">
            <div className="inline-flex rounded-md justify-end w-full">
              <Button
                onClick={() => {}}
                className="!rounded-r-none h-[32px] text-base bg-theme-main-dark border-r-border/30 border-r-[1px]"
              >
                {LABEL.CREATE_TASK}
              </Button>
              <Button
                onClick={() => setIsDropdownOpen(true)}
                className="!rounded-l-none h-[32px] border-l-0 bg-theme-main-dark"
              >
                <Icon name="dropdownarrow" className={'text-base'} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CreateTaskDropdown
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
      />
    </div>
  );
};

const CreateTaskDropdown = ({ isOpen, setIsOpen }) => {
  return (
    <div className="inline-flex rounded-md ">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuContent align="end" className="w-56 p-1" sideOffset={5}>
          <DropdownMenuItem
            onClick={() => {}}
            className="text-sm py-2 px-3 cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"
          >
            {LABEL.CREATE_AND_OPEN}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="text-sm py-2 px-3 cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"
          >
            {LABEL.CREATE_AND_START_ANOTHER}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="text-sm py-2 px-3 cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"
          >
            {LABEL.CREATE_AND_DUPLICATE}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
const TaskContent = () => {
  return (
    <div className={'mt-6'}>
      <PopoverSection />
      <SmartInput />
      <Description />
      <TaskAttributes />
    </div>
  );
};
const TaskAttributes = () => {
  return (
    <div className={'mt-4'}>
      <div className="space-x-2 w-full flex items-center">
        <TaskStatusDialog>
          <Button
            variant={'ghost'}
            className={
              'bg-green-700 hover:bg-green-800 hover:text-white text-white uppercase text-base h-[24px]'
            }
          >
            {LABEL.COMPLETE}
          </Button>
        </TaskStatusDialog>
        <Button variant={'outline'} className={'h-[24px]'}>
          <Icon name={'users'} /> {LABEL.ASSIGNEE}
        </Button>
        <Button variant={'outline'} className={'h-[24px]'}>
          <Icon name={'calendar'} /> {LABEL.DUE_DATE}
        </Button>
        <PriorityPopover>
          <Button variant={'outline'} className={'h-[24px]'}>
            <Icon name={'priority02'} /> {LABEL.PRIORITY}
          </Button>
        </PriorityPopover>
        <Button variant={'outline'} className={'h-[24px]'}>
          <Icon name={'tag'} /> {LABEL.TAGS}
        </Button>
        <Button variant={'outline'} size={'auto'} className={'!size-[24px]'}>
          <Icon name={'menu03'} />
        </Button>
      </div>
    </div>
  );
};
const Description = () => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  const onChangeDescription = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent().toString();
      setDescription(text);
    });
  };
  // Close editor on click outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(e.target as Node) &&
        description.trim().length === 0
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', onClickOutside);
    } else {
      document.removeEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isEditing, description]);

  return (
    <div className="mt-2" ref={editorRef}>
      {!isEditing && description.length === 0 ? (
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          className="w-full font-normal !pl-0 text-base hover:bg-secondary !justify-start"
        >
          <Icon name="doc" className="size-5 text-content-tertiary" />
          <span className={'text-content-tertiary'}>
            {LABEL.ADD_DESCRIPTION}
          </span>
        </Button>
      ) : (
        <div className="mt-4">
          <div className="space-y-2">
            <DocEditor
              value={''}
              placeholder={"Start writing or type '/' for commands"}
              name={'task Description'}
              onChange={onChangeDescription}
              setIsEditing={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};
const SmartInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <input
      type="text"
      placeholder="Task Name"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (e.target.value === '') setIsFocused(false);
      }}
      className={`
        w-full h-[34px] mt-2 bg-transparent rounded-lgv outline-none text-xl font-medium placeholder-content-tertiary placeholder:text-xl placeholder:font-medium
        hover:bg-secondary
        ${isFocused ? 'border border-border cursor-text' : 'border-b border-transparent'}
        transition-all duration-150 ease-in-out rounded-md pl-2
        focus:border-border
        hover:cursor-text
      `}
    />
  );
};
const PopoverSection = () => {
  return (
    <div className="space-x-2">
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="auto" className="text-sm h-[24px]">
            <ListIcon className={'text-content-default !size-[14px]'} />{' '}
            {LABEL.LIST}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="max-h-[400px] w-[300px] p-2 overflow-auto"
        >
          <span className="font-bold text-gray-600 text-sm">
            {LABEL.SPACES}
          </span>
          <div className="flex flex-col mt-2 max-h-[400px] overflow-auto">
            {spaceData.map((item, i) => (
              <SpaceList space={item} key={i} />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <TaskTypeDropdown>
        <Button
          variant={'outline'}
          size={'auto'}
          className={'text-sm h-[24px]'}
        >
          <CircleIcon className={'text-content-default !size-[14px]'} />
          {LABEL.TASK}
          <ChevronDownIcon />
        </Button>
      </TaskTypeDropdown>
    </div>
  );
};
const SpaceList = ({ space }) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const [isFolderListOpen, setIsFolderListOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHasMouseEntered(true)}
        onMouseLeave={() => setHasMouseEntered(false)}
        onClick={() => setIsFolderListOpen(!isFolderListOpen)}
        className="cursor-pointer"
      >
        <div className="flex gap-2 w-[90%] rounded-lg py-[4px] px-1 truncate text-overflow-ellipsis items-center hover:bg-secondary/80">
          {hasMouseEntered ? (
            <div>
              <Icon name={'expandsubtask'} className={'-rotate-90 size-6'} />
            </div>
          ) : (
            <PlaceholderAvatar
              seed={space.name}
              variant={'initials'}
              className={'size-6 rounded-lg'}
            />
          )}
          {space.name}
        </div>
      </div>
      {isFolderListOpen && (
        <div className={'space-y-0'}>
          {space.folders.length > 0 &&
            space.folders.map((folder: any, i: number) => (
              <FolderItem folder={folder} key={i} />
            ))}
        </div>
      )}
      {isFolderListOpen && (
        <div className={'space-y-0 pt-1 ml-[30px]'}>
          {space.lists.length > 0 &&
            space.lists.map((list: any, i: number) => (
              <ListItem list={list} key={i} />
            ))}
        </div>
      )}
    </>
  );
};
const FolderItem = ({ folder }) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHasMouseEntered(true)}
        onMouseLeave={() => setHasMouseEntered(false)}
        onClick={() => setIsListOpen(!isListOpen)}
        className="flex items-center cursor-pointer gap-2 ml-[30px] hover:bg-secondary/80 p-[4px] rounded-lg"
      >
        <div className="shrink-0">
          {hasMouseEntered ? (
            <Icon name="expandsubtask" className="-rotate-90 size-6" />
          ) : isListOpen ? (
            <FolderOpenIcon className="size-5" />
          ) : (
            <FolderIcon className="size-5" />
          )}
        </div>
        <div className="truncate text-foreground max-w-[180px] overflow-hidden whitespace-nowrap">
          {folder.name}
        </div>
      </div>
      {isListOpen && (
        <div className="ml-[50px]">
          {folder.lists.length > 0 &&
            folder.lists.map((list) => <ListItem key={list.id} list={list} />)}
        </div>
      )}
    </>
  );
};
const ListItem = ({ list }) => {
  return (
    <div className="flex items-center cursor-pointer gap-2 hover:bg-secondary/80 p-[4px] rounded-lg">
      <div className="shrink-0">
        <Icon name="list" className="size-5 text-content-default" />
      </div>
      <div className="truncate text-base max-w-[180px] overflow-hidden whitespace-nowrap">
        {list.name}
      </div>
    </div>
  );
};
