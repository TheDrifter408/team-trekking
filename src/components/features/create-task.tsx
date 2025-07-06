import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import {
  ListIcon,
  XIcon,
  ChevronDownIcon,
  CircleIcon,
  FolderOpenIcon,
  FolderIcon,
} from 'lucide-react';
import { Icon } from '@/assets/icon-path';
import { DocEditor } from '@/pages/task/components/doc-editor.tsx';
import { EditorState, $getRoot } from 'lexical';
import { PlaceholderAvatar } from '@/components/common/avatar-generator';
import TaskTypeDropdown from '@/components/common/task-type-dropdown.tsx';
import TaskStatusDialog from '@/components/common/task-status-dialog.tsx';
import { PriorityPopover } from '@/components/common/priority-popover.tsx';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';
import { useCreateTaskMutation } from '@/service/rtkQueries/taskQuery.ts';
import {
  List,
  Space,
  Folder,
} from '@/types/request-response/workspace/ApiResponse';
import { CreateTaskRequest } from '@/types/request-response/task/ApiRequest.ts';
import { useAppNavigation } from '@/lib/hooks/useAppNavigation.ts';
import { cn } from '@/lib/utils/utils.ts';
import { LABEL } from '@/lib/constants';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const CreateTask = ({ isOpen, setIsOpen, children }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [name, setName] = useState('');
  const taskType = 1;
  const { spaces } = useWorkspaceStore();
  const [createTask] = useCreateTaskMutation();
  const { navigate, routes } = useAppNavigation();

  const onSelectList = (list: List) => {
    setSelectedList(list);
  };

  const onCreateTask = async () => {
    if (!selectedList) return;

    const payload: CreateTaskRequest = {
      name,
      listId: selectedList.id,
      typeId: taskType,
    };

    try {
      const response = await createTask(payload).unwrap();
      if (!response.id) toast.error('Task creation failed');
      navigate(routes.task, response.id);
    } catch (error: any) {
      toast.error('Task creation failed');
    }
  };

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
                <div className={'mt-6'}>
                  <PopoverSection
                    spaces={spaces ?? []}
                    onSelectList={onSelectList}
                    selectedList={selectedList}
                  />
                  <SmartInput name={name} setName={setName} />
                  <Description />
                  <TaskAttributes />
                </div>
              </TabsContent>
            </div>
          </Tabs>
          <div className="flex items-center rounded-b-lg p-4 border-t">
            <div className="inline-flex rounded-md justify-end w-full">
              <Button
                onClick={onCreateTask}
                className="!rounded-r-none h-[32px] text-base bg-theme-main-dark border-r-border/30 border-r-[1px]"
              >
                {LABEL.CREATE_TASK}
              </Button>
              <CreateTaskDropdown
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              >
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="!rounded-l-none h-[32px] border-l-0 bg-theme-main-dark"
                >
                  <Icon name="dropdownarrow" className={'text-base'} />
                </Button>
              </CreateTaskDropdown>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PopoverSection = ({
  spaces,
  onSelectList,
  selectedList,
}: {
  spaces: Space[];
  onSelectList: (list: List) => void;
  selectedList: List | null;
}) => {
  const listName = selectedList?.name ?? LABEL.LIST;
  return (
    <div className="space-x-2">
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="auto" className="text-sm h-[24px]">
            <ListIcon
              style={{ color: selectedList ? selectedList.color : '' }}
              className={'text-content-default !size-[14px]'}
            />
            {listName}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="!max-w-[290px] p-2 overflow-y-auto"
        >
          <span className="font-bold text-gray-600 text-sm">
            {LABEL.SPACES}
          </span>
          <div className="flex flex-col max-h-64 mt-2 overflow-scroll">
            {spaces.length > 0 &&
              spaces.map((item: Space, i: number) => (
                <SpaceList onSelectList={onSelectList} space={item} key={i} />
              ))}
          </div>
        </PopoverContent>
      </Popover>
      {/* Task Type Popover Component */}
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

const SpaceList = ({
  space,
  onSelectList,
}: {
  space: Space;
  onSelectList: (list: List) => void;
}) => {
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
        <div className="flex gap-2 text-base w-[90%] rounded-lg py-[4px] px-1 truncate text-overflow-ellipsis items-center hover:bg-secondary/80">
          {hasMouseEntered ? (
            <div>
              <Icon name={'expandsubtask'} className={'-rotate-90 size-5'} />
            </div>
          ) : (
            <PlaceholderAvatar
              seed={space.name}
              variant={'initials'}
              className={'size-5 rounded-lg'}
            />
          )}
          {space.name}
        </div>
      </div>
      {isFolderListOpen && (
        <div className={'space-y-0'}>
          {space.folders.length > 0 &&
            space.folders.map((folder: Folder, i: number) => (
              <FolderItem onSelectList={onSelectList} folder={folder} key={i} />
            ))}
        </div>
      )}
      {isFolderListOpen && (
        <div className={'space-y-0 pt-1 ml-[30px]'}>
          {space.lists.length > 0 &&
            space.lists.map((list: List, i: number) => (
              <ListItem onSelectList={onSelectList} list={list} key={i} />
            ))}
        </div>
      )}
    </>
  );
};
const FolderItem = ({
  folder,
  onSelectList,
}: {
  folder: Folder;
  onSelectList: (list: List) => void;
}) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHasMouseEntered(true)}
        onMouseLeave={() => setHasMouseEntered(false)}
        onClick={() => setIsListOpen(!isListOpen)}
        className="flex text-base items-center cursor-pointer gap-2 ml-[30px] hover:bg-secondary/80 p-[4px] rounded-lg"
      >
        <div className="shrink-0">
          {hasMouseEntered ? (
            <Icon name="expandsubtask" className="-rotate-90 size-5" />
          ) : isListOpen ? (
            <FolderOpenIcon
              className="size-4"
              style={{ color: folder.color }}
            />
          ) : (
            <FolderIcon className="size-4" style={{ color: folder.color }} />
          )}
        </div>
        <div className="truncate text-foreground max-w-[180px] overflow-hidden whitespace-nowrap">
          {folder.name}
        </div>
      </div>
      {isListOpen && (
        <div className="ml-[50px]">
          {folder.lists.length > 0 &&
            folder.lists.map((list: List) => (
              <ListItem onSelectList={onSelectList} key={list.id} list={list} />
            ))}
        </div>
      )}
    </>
  );
};
const ListItem = ({
  list,
  onSelectList,
}: {
  list: List;
  onSelectList: (list: List) => void;
}) => {
  return (
    <div
      onClick={() => onSelectList(list)}
      className="flex text-base h-[28px] items-center cursor-pointer gap-2 hover:bg-secondary/80 p-[4px] rounded-lg"
    >
      <div className="shrink-0">
        <Icon
          name="list"
          className={`size-4 text-content-tertiary`}
          style={{ color: list.color }}
        />
      </div>
      <div className="truncate text-base max-w-[180px] overflow-hidden whitespace-nowrap">
        {list.name}
      </div>
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
const SmartInput = ({
  name,
  setName,
}: {
  name: string;
  setName: (input: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <input
      type="text"
      value={name}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
const CreateTaskDropdown = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-56 p-1">
        <div className="flex flex-col space-y-1">
          <PopoverItem label={LABEL.CREATE_AND_OPEN} onClick={() => {}} />
          <PopoverItem
            label={LABEL.CREATE_AND_START_ANOTHER}
            onClick={() => {}}
          />
          <PopoverItem label={LABEL.CREATE_AND_DUPLICATE} onClick={() => {}} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
const PopoverItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="text-left text-sm py-2 px-3 cursor-pointer rounded-sm hover:bg-gray-100 w-full transition-colors"
  >
    {label}
  </button>
);
