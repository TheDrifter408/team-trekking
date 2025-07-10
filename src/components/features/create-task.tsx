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
import { PlaceholderAvatar } from '@/components/common/avatar-generator';
import TaskTypeDropdown from '@/components/common/task-type-dropdown.tsx';
import { DocEditor } from '@/routes/_auth/task/-components/doc-editor';
import { $getRoot, EditorState } from 'lexical';
import { PriorityPopover } from '@/components/common/priority-popover.tsx';
import { useListStore } from '@/stores/zustand/list-store';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';
import { useCreateTaskMutation } from '@/service/rtkQueries/taskQuery.ts';
import {
  List,
  Space,
  Folder,
} from '@/types/request-response/workspace/ApiResponse';
import { CreateTaskRequest } from '@/types/request-response/task/ApiRequest.ts';
import {
  cn,
  handleMutation,
  getContrastTextColor,
  getRandomHexColor,
} from '@/lib/utils/utils.ts';
import { LABEL } from '@/lib/constants';
import { toast } from 'sonner';
import {
  Priority,
  Member,
} from '@/types/request-response/workspace/ApiResponse';
import { StatusPopup } from '@/components/common/status-popup..tsx';
import { AssigneePopup } from '@/components/common/assignee-popover.tsx';
import { CreateTaskResponse } from '@/types/request-response/task/ApiResponse.ts';
import {
  ListTasksResponse,
  StatusItem,
} from '@/types/request-response/list/ApiResponse.ts';
import {
  TagListResponse,
  TagCreateResponse,
} from '@/types/request-response/space/ApiResponse.ts';
import { TaskDate } from '@/components/common/task-date.tsx';
import {
  format,
  isSameWeek,
  isThisYear,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import { useLazyGetListTasksQuery } from '@/service/rtkQueries/listQuery.ts';
import {
  useLazyGetTagsQuery,
  useCreateTagMutation,
} from '@/service/rtkQueries/spaceQuery.ts';
import { TagDialog } from '@/components/common/tag-dialog.tsx';
import { CreateSpaceRequest } from '@/types/request-response/space/ApiRequest.ts';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  listId: number;
}

export const CreateTask = ({ isOpen, setIsOpen, children, listId }: Props) => {
  const { list, setList } = useListStore();
  const { spaces, members } = useWorkspaceStore();
  const [fetchListTasks] = useLazyGetListTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [createTag] = useCreateTagMutation();
  const [fetchTags] = useLazyGetTagsQuery();

  const [name, setName] = useState('');
  const [spaceId, setSpaceId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [status, setStatus] = useState<StatusItem | null>(null);
  const [assignees, setAssignees] = useState<Member[]>([]);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagListResponse[]>([]);
  const [spaceTags, setSpaceTags] = useState<TagListResponse[]>([]);
  const [dueDate, setDueDate] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );

  const taskType = 1;

  useEffect(() => {
    if (list && list.status.groups) {
      for (const group of list.status.groups) {
        if (group.name === 'Not Started') {
          setStatus(group.items[0]);
          break;
        }
      }
    }
  }, [list]);

  // Get the List data based on ListId & Space ID.
  useEffect(() => {
    const getTags = async (id: number) => {
      const response = await handleMutation<TagListResponse[]>(fetchTags, id);
      if (response.data) {
        setSpaceTags(response.data);
      }
    };
    if (!spaces || !listId) return;

    let foundList: List | undefined = undefined;
    let foundSpaceId: number | null = null;

    for (const space of spaces) {
      const listInSpace = space.lists.find((list) => list.id === listId);
      if (listInSpace) {
        foundList = listInSpace;
        foundSpaceId = space.id;
        break;
      }
      for (const folder of space.folders) {
        const listInFolder = folder.lists.find((list) => list.id === listId);
        if (listInFolder) {
          foundList = listInFolder;
          foundSpaceId = space.id;
          break;
        }
      }
      if (foundList) break;
    }
    if (foundList && foundSpaceId) {
      setSelectedList(foundList);
      setSpaceId(foundSpaceId);
      getTags(foundSpaceId);
    }
  }, [listId, spaces]);

  const onSelectList = (list: List) => {
    setSelectedList(list);
  };
  const onSelectPriority = (priority: Priority | null) => {
    setSelectedPriority(priority);
  };
  const onSelectAssignee = (member: Member) => {
    setAssignees((prev) => {
      const isAlreadySelected = prev.some((a) => a.id === member.id);
      return isAlreadySelected ? prev : [...prev, member];
    });
  };
  const onRemoveAssignee = (assigneeId: number) => {
    setAssignees((prev) => prev.filter((m) => m.id !== assigneeId));
  };
  const onSelectTag = (tag: TagListResponse) => {
    setSelectedTags((prev) => {
      const isSelected = prev.some((x) => x.id === tag.id);
      return isSelected ? prev : [...prev, tag];
    });
  };
  const onRemoveTag = (tagId: number) => {
    setSelectedTags((prev) => prev.filter((x) => x.id !== tagId));
  };
  const onSelectStatus = (status: StatusItem) => {
    setStatus(status);
  };
  const onCreateTag = async (name: string) => {
    const color = getRandomHexColor();
    const newTag = {
      name: name,
      color: color,
      isActive: true,
      id: Date.now(),
    };
    // Here we Update the UI before the API request for smoother performance. Hence, we mutate the
    // arrays for: (i) tags that are selected (ii) tags available to pick from
    setSelectedTags((prev) => [...prev, newTag]);
    setSpaceTags((prev) => [...prev, newTag]);
    if (spaceId) {
      const payload: CreateSpaceRequest = {
        name,
        spaceId,
        color: newTag.color,
      };
      const { data } = await handleMutation<CreateSpaceRequest>(
        createTag,
        payload
      );
      if (data) {
        const { id: createdTagId } = data;
        const { data: updatedTags } = await handleMutation<TagListResponse[]>(
          fetchTags,
          spaceId
        );
        if (updatedTags) {
          setSpaceTags(updatedTags);
          // newTag.id is temp. update its id with response to match with spaceTags new arr.
          setSelectedTags((prev) =>
            prev.map((tag) =>
              tag.id === newTag.id ? { ...tag, id: createdTagId } : tag
            )
          );
        }
      }
    }
  };
  const onCreateTask = async () => {
    if (!selectedList || !name) return;
    let statusGroupId;
    if (list?.status && status) {
      for (const group of list.status.groups) {
        const match = group.items.find((item) => item.id === status.id);
        if (match) {
          statusGroupId = group.id;
          break;
        }
      }
    }
    const payload: CreateTaskRequest = {
      name,
      listId: selectedList.id,
      typeId: taskType,
      priorityId: selectedPriority?.id,
      assigneeIds: assignees.map((assignee) => assignee.user.id),
      statusViewGroupId: list?.status.id,
      statusGroupId: statusGroupId,
      statusItemId: status?.id,
      dueDate: dueDate || null,
      tagIds: selectedTags.map((tag) => tag.id),
    };
    try {
      const { data } = await handleMutation<CreateTaskResponse>(
        createTask,
        payload
      );
      if (data) {
        const { data: newList } = await handleMutation<ListTasksResponse>(
          fetchListTasks,
          listId
        );
        if (newList) {
          setList(newList);
        }
        setIsOpen(false);
      } else toast.error(LABEL.TASK_CREATION_FAILED);
    } catch {
      toast.error(LABEL.TASK_CREATION_FAILED);
    }
  };
  const formatSmartDate = (date: Date): string => {
    const now = new Date();
    if (isSameWeek(now, date, { weekStartsOn: 1 })) {
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      if (isYesterday(date)) return 'Yesterday';
    }
    return isThisYear(date)
      ? format(date, 'MMM d')
      : format(date, 'MMM d, yyyy');
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
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
              <Header setIsOpen={setIsOpen} />
            </DialogHeader>
            <TabsContent className="px-6 pb-6" value="task">
              <div className={'mt-6 space-x-2'}>
                <ListItems
                  selectedList={selectedList}
                  spaces={spaces ?? []}
                  onSelectList={onSelectList}
                />
                <TaskTypeDropdown>
                  <Button
                    variant={'outline'}
                    size={'auto'}
                    className={'text-sm h-[24px]'}
                  >
                    <CircleIcon
                      className={'text-content-default !size-[14px]'}
                    />
                    {LABEL.TASK}
                    <ChevronDownIcon />
                  </Button>
                </TaskTypeDropdown>
                <SmartInput name={name} setName={setName} />
                <Description />
                <div className={'mt-4'}>
                  <div className="space-x-2 w-full flex items-center">
                    <StatusPopup
                      status={list?.status ?? null}
                      onStatusSelect={onSelectStatus}
                      currentStatus={status}
                    >
                      <Button
                        variant={'ghost'}
                        className={'uppercase text-base h-[24px]'}
                        style={{
                          background: status?.color ?? '',
                          color: getContrastTextColor(status?.color ?? ''),
                        }}
                      >
                        {status?.name ?? LABEL.COMPLETED}
                      </Button>
                    </StatusPopup>
                    <Button
                      onClick={() => setIsAssigneeOpen(true)}
                      variant="outline"
                      className="h-[24px] pl-2 pr-2 flex items-center gap-1"
                    >
                      {assignees.length > 0 ? (
                        <>
                          {assignees.slice(0, 3).map((assignee) => (
                            <div
                              key={assignee.id}
                              className="flex items-center rounded-full overflow-hidden relative"
                            >
                              {assignee.user.image ? (
                                <img
                                  src={assignee.user.image}
                                  alt={assignee.user.fullName}
                                  className="size-[18px] object-cover rounded-full"
                                />
                              ) : (
                                <PlaceholderAvatar
                                  variant="initials"
                                  seed={assignee.user.fullName}
                                  className="size-[18px] text-[10px]"
                                />
                              )}
                            </div>
                          ))}
                          {assignees.length > 3 && (
                            <span className="text-xs text-muted-foreground ml-1">
                              +{assignees.length - 3}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <Icon name="users" /> {LABEL.ASSIGNEE}
                        </>
                      )}
                    </Button>
                    <TaskDate
                      date={dueDate ? new Date(dueDate) : undefined}
                      onDateChange={(d) => setDueDate(d ? d.toISOString() : '')}
                    >
                      <Button variant="outline" className="h-[24px]">
                        <Icon name="calendar" />
                        {dueDate
                          ? formatSmartDate(new Date(dueDate))
                          : LABEL.DUE_DATE}
                      </Button>
                    </TaskDate>
                    <PriorityPopover onSelect={onSelectPriority}>
                      {selectedPriority ? (
                        <Button variant={'outline'} className={'h-[24px]'}>
                          <Icon
                            name={'priority02'}
                            style={{
                              color: selectedPriority
                                ? selectedPriority.color
                                : '',
                            }}
                          />
                          {selectedPriority.title}
                        </Button>
                      ) : (
                        <Button variant={'outline'} className={'h-[24px]'}>
                          <Icon name={'priority'} /> {LABEL.PRIORITY}
                        </Button>
                      )}
                    </PriorityPopover>
                    <Button
                      onClick={() => setIsTagDialogOpen(true)}
                      variant={'outline'}
                      className={'h-[24px]'}
                    >
                      <Icon name={'tag'} />
                      {selectedTags.length > 0 && selectedTags.length}{' '}
                      {LABEL.TAGS}
                    </Button>
                    <Button
                      variant={'outline'}
                      size={'auto'}
                      className={'!size-[24px]'}
                    >
                      <Icon name={'menu03'} />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Footer
            onCreateTask={onCreateTask}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </DialogContent>
      </Dialog>
      {isAssigneeOpen && (
        <AssigneePopup
          members={members ?? []}
          assignees={assignees}
          open={isAssigneeOpen}
          onOpenChange={setIsAssigneeOpen}
          onSelectAssignee={onSelectAssignee}
          onRemoveAssignee={onRemoveAssignee}
        />
      )}
      <TagDialog
        isOpen={isTagDialogOpen}
        setIsDialogOpen={setIsTagDialogOpen}
        tags={spaceTags}
        onSelectTag={onSelectTag}
        selectedTags={selectedTags}
        onRemoveTag={onRemoveTag}
        onCreateTag={onCreateTag}
      />
    </div>
  );
};

interface ListItemsProps {
  selectedList: List | null;
  spaces: Space[];
  onSelectList: (list: List) => void;
}

const ListItems = ({ selectedList, spaces, onSelectList }: ListItemsProps) => {
  const [open, setOpen] = useState(false);
  const listName = selectedList?.name ?? LABEL.LIST;

  const onToggle = () => setOpen((prev) => !prev);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="auto"
          className="text-sm h-[24px]"
          onClick={onToggle}
        >
          <ListIcon
            style={{ color: selectedList?.color ?? '' }}
            className="text-content-default !size-[14px]"
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
        {selectedList && (
          <div className="mb-2">
            <span className="font-bold mb-1 text-gray-600 text-sm">
              {LABEL.RECENTS}
            </span>
            <ListItem
              selectedList={selectedList}
              onSelectList={() => {}}
              list={selectedList}
            />
            <div className={'w-full border border-gray-300/40 h-[1px] mt-4'} />
          </div>
        )}
        <span className="font-bold text-gray-600 text-sm">{LABEL.SPACES}</span>
        <div className="flex flex-col max-h-64 mt-2 overflow-scroll">
          {spaces.length > 0 &&
            spaces.map((item: Space, i: number) => (
              <SpaceList
                selectedList={selectedList}
                onSelectList={onSelectList}
                space={item}
                key={i}
              />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface ItemProps {
  space: Space;
  selectedList: List | null;
  onSelectList: (list: List) => void;
}
const SpaceList = ({ space, selectedList, onSelectList }: ItemProps) => {
  const { isHovered, ...hoverProps } = useHoverState();
  const [isOpen, toggle] = useToggleState();
  const isCollapsible = selectedList ? Number(selectedList.id) > 0 : false;

  return (
    <>
      <div {...hoverProps} onClick={toggle} className="cursor-pointer">
        <div className="flex gap-2 text-base w-[90%] rounded-lg py-[4px] px-1 truncate items-center hover:bg-secondary/80">
          {isHovered ? (
            <Icon name="expandsubtask" className="-rotate-90 size-5" />
          ) : (
            <PlaceholderAvatar
              seed={space.name}
              variant="initials"
              className="size-5 rounded-lg"
            />
          )}
          {space.name}
        </div>
      </div>

      {isOpen && (
        <>
          <CollapsibleSection items={space.folders} className="space-y-0">
            {(folder: Folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                selectedList={selectedList}
                onSelectList={onSelectList}
              />
            )}
          </CollapsibleSection>

          <CollapsibleSection
            items={space.lists}
            className="space-y-0 pt-1 ml-[30px]"
            condition={isCollapsible}
          >
            {(list: List) => (
              <ListItem
                key={list.id}
                list={list}
                selectedList={selectedList}
                onSelectList={onSelectList}
              />
            )}
          </CollapsibleSection>
        </>
      )}
    </>
  );
};

interface FolderItemProps {
  folder: Folder;
  selectedList: List | null;
  onSelectList: (list: List) => void;
}
const FolderItem = ({
  folder,
  selectedList,
  onSelectList,
}: FolderItemProps) => {
  const { isHovered, ...hoverProps } = useHoverState();
  const [isOpen, toggle] = useToggleState();

  const getFolderIcon = () => {
    if (isHovered)
      return <Icon name="expandsubtask" className="-rotate-90 size-5" />;

    const IconComponent = isOpen ? FolderOpenIcon : FolderIcon;
    return <IconComponent className="size-4" style={{ color: folder.color }} />;
  };
  return (
    <>
      <div
        {...hoverProps}
        onClick={toggle}
        className="flex text-base items-center cursor-pointer gap-2 ml-[30px] hover:bg-secondary/80 p-[4px] rounded-lg"
      >
        <div className="shrink-0">{getFolderIcon()}</div>
        <div className="truncate text-foreground max-w-[180px]">
          {folder.name}
        </div>
      </div>

      {isOpen && (
        <CollapsibleSection
          items={folder.lists}
          className="ml-[50px]"
          condition={selectedList ? selectedList.id > 0 : false}
        >
          {(list: List) => (
            <ListItem
              key={list.id}
              list={list}
              selectedList={selectedList}
              onSelectList={onSelectList}
            />
          )}
        </CollapsibleSection>
      )}
    </>
  );
};

interface ListItemProps {
  list: List;
  selectedList: List | null;
  onSelectList: (list: List) => void;
}
const ListItem = ({ list, selectedList, onSelectList }: ListItemProps) => {
  const isSelected = selectedList?.id === list.id;
  return (
    <div
      onClick={() => onSelectList(list)}
      className={cn(
        'flex text-base h-[28px] items-center cursor-pointer gap-2 hover:bg-secondary/80 rounded-lg',
        isSelected && 'bg-pink-100'
      )}
    >
      <Icon
        name="list"
        className="size-4 text-content-tertiary shrink-0"
        style={{ color: list.color }}
      />
      <div className="truncate justify-between flex items-center text-base w-full">
        <p>{list.name}</p>
        {isSelected && <Icon name="okfill01" className="text-theme-main" />}
      </div>
    </div>
  );
};

interface CollapsibleSectionProps<T> {
  items: T[] | undefined;
  children: (item: T) => React.ReactNode;
  className?: string;
  condition?: boolean;
}

const CollapsibleSection = <T,>({
  items,
  children,
  className = '',
  condition = true,
}: CollapsibleSectionProps<T>) => {
  if (!items?.length || !condition) return null;

  return <div className={className}>{items.map(children)}</div>;
};

const Description = () => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

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

interface HeaderProps {
  setIsOpen: (open: boolean) => void;
}
const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <>
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
    </>
  );
};

interface FooterProps {
  onCreateTask: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
}
const Footer = ({
  onCreateTask,
  isDropdownOpen,
  setIsDropdownOpen,
}: FooterProps) => {
  return (
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

const useHoverState = () => {
  const [isHovered, setIsHovered] = useState(false);
  return {
    isHovered,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
};
const useToggleState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  return [isOpen, () => setIsOpen((prev) => !prev)] as const;
};
