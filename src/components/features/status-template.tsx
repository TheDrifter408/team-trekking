import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useState,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/shadcn-ui/dialog.tsx';
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { GripVertical, Ellipsis } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { LABEL } from '@/lib/constants/appStrings.ts';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Group, Item } from '@/types/request-response/space/ApiResponse.ts';
import { useGetWorkspaceViewGroupByIDQuery } from '@/service/rtkQueries/workspaceQuery';
import { ViewGroup } from '@/types/request-response/workspace/ApiResponse';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  spaceTemplates: Group[];
  setSpaceTemplates: Dispatch<SetStateAction<Group[]>>;
}

export const StatusTemplate = ({
  isOpen,
  setIsOpen,
  spaceTemplates = [],
  setSpaceTemplates,
}: Props) => {
  const { data: templates, isLoading } = useGetWorkspaceViewGroupByIDQuery({
    id: 28,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ViewGroup | null>(
    null
  );

  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const onSelectTemplate = (templateName: string) => {
    const found = templates?.find((t) => t.name === templateName);
    if (found) {
      setSelectedTemplate(found);
      setSpaceTemplates(found.groups);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // on when drag starts
  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activeId = active.id
      .toString()
      .replace(/^item-/, '')
      .trim(); // replace the unique id

    // Find the Category (group name) of the item
    for (const group of spaceTemplates) {
      const found = group.items.find((item) => item.id.toString() === activeId);
      if (found) {
        setActiveItem(Number(activeId));
        setActiveCategory(group.name);
        break;
      }
    }
  };

  // on when dragging over a different group
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over || !activeItem || !activeCategory) return;

    const activeId = active.id
      .toString()
      .replace(/^item-/, '')
      .trim(); // replace the unique id
    const overIdRaw = over.id.toString(); // can be item-00 or group-00

    let overGroupIndex = spaceTemplates.findIndex(
      (group) => `group-${group.id}` === overIdRaw
    );

    // if not found by group id, try to find by item id inside groups
    if (overGroupIndex === -1) {
      overGroupIndex = spaceTemplates.findIndex((group) =>
        group.items.some((item) => item.id.toString() === activeId)
      );
    }

    // Find activeGroupIndex by looking inside items
    const activeGroupIndex = spaceTemplates.findIndex((group) =>
      group.items.some((item) => item.id.toString() === activeId)
    );

    if (
      overGroupIndex === -1 ||
      activeGroupIndex === -1 ||
      activeGroupIndex === overGroupIndex
    ) {
      return;
    }

    // Find the active Item inside active group
    const draggedItem = spaceTemplates[activeGroupIndex].items.find(
      (item) => item.id.toString() === activeId
    );

    if (!draggedItem) return;

    const updatedGroups = structuredClone(spaceTemplates);

    // Remove the active item from its parent group
    updatedGroups[activeGroupIndex].items = updatedGroups[
      activeGroupIndex
    ].items.filter((item) => item.id.toString() !== activeId);

    const overItems = updatedGroups[overGroupIndex].items;

    // Find the index of the item or -1 if over group container
    const overIndex = overItems.findIndex(
      (item) => `item-${item.id}` === overIdRaw
    );

    if (overIndex === -1) {
      // Dragged over empty group or group container itself, add item to start
      overItems.unshift(draggedItem);
    } else {
      overItems.splice(overIndex + 1, 0, draggedItem);
    }

    setSpaceTemplates(updatedGroups);
    setActiveCategory(updatedGroups[overGroupIndex].name);
  };

  // on when drag ends
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      setActiveItem(null);
      setActiveCategory(null);
      return;
    }

    const activeId = active.id
      .toString()
      .replace(/^item-/, '')
      .trim(); // replace the unique id
    const overIdRaw = over.id.toString(); // could be group-00 or item-00

    // Find the source group by item id
    const sourceGroupIndex = spaceTemplates.findIndex(
      (item) => item.id.toString() === activeId
    );

    // find the destination group index by group id or item id
    let destinationGroupIndex = spaceTemplates.findIndex(
      (group) => `group-${group.id}` === overIdRaw
    );

    if (destinationGroupIndex === -1) {
      destinationGroupIndex = spaceTemplates.findIndex((group) =>
        group.items.some((item) => `item-${item.id}` === overIdRaw)
      );
    }

    if (sourceGroupIndex === -1 || destinationGroupIndex === -1) return;

    const draggedItem = spaceTemplates[sourceGroupIndex].items.find(
      (item) => item.id.toString() === activeId
    );

    if (!draggedItem) return;

    const updatedGroups = structuredClone(spaceTemplates);

    // Remove dragged item from the source group
    updatedGroups[sourceGroupIndex].items = updatedGroups[
      sourceGroupIndex
    ].items.filter((item) => item.id.toString() !== activeId);

    // Find insertion index in the destination group
    const overIndex = updatedGroups[destinationGroupIndex].items.findIndex(
      (item) => `item-${item.id}` === overIdRaw
    );

    if (overIndex === -1) {
      // Dropped on empty group container: push item at the end
      updatedGroups[destinationGroupIndex].items.push(draggedItem);
    } else {
      // Insert before overIndex
      updatedGroups[destinationGroupIndex].items.splice(
        overIndex,
        0,
        draggedItem
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent
        className={cn(
          '!max-w-[690px] flex flex-col h-[85vh] max-h-[85vh] transition-opacity duration-300',
          'data-[state=open]:opacity-100 data-[state=closed]:opacity-0'
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {LABEL.EDIT_SPACE_STATUS}
            <div className="border-b mt-3" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 rounded-md overflow-hidden">
          <div className="w-[40%] p-2">
            <span className="font-medium text-sm text-muted-foreground">
              {LABEL.STATUS_TEMPLATE}
            </span>
            <Select
              value={selectedTemplate ? selectedTemplate.name : 'Custom'}
              onValueChange={(templateName) => onSelectTemplate(templateName)}
            >
              <SelectTrigger className="w-[80%] mt-2">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <div className="px-2 py-1">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search templates..."
                    />
                  </div>
                  {isLoading ? (
                    <SelectItem value="">Loading</SelectItem>
                  ) : (
                    templates &&
                    templates.map((template: ViewGroup) => (
                      <SelectItem
                        className="hover:bg-accent cursor-pointer"
                        key={template.id}
                        value={template.name}
                      >
                        {template.name}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-px bg-border" />
          <div className="w-[60%] p-2 overflow--auto max-h-full max-w-full">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
            >
              <div className="px-4">
                {spaceTemplates.length > 0 ? (
                  spaceTemplates.map((group) => (
                    <SortableContext
                      key={`group-${group.id}`}
                      id={`group-${group.id}`}
                      items={group.items.map((item) => `item-${item.id}`)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="">
                        <div className="space-y-1">
                          <StatusGroup
                            group={group}
                            setTemplates={setSpaceTemplates}
                          />
                        </div>
                      </div>
                    </SortableContext>
                  ))
                ) : (
                  // loading state
                  <div
                    className={cn('space-y-2 p-4 rounded-lg transition-colors')}
                  >
                    <div>
                      <div
                        className={cn(
                          'flex border justify-between rounded-lg items-center py-[1.5px] hover:bg-accent/50 cursor-pointer'
                        )}
                      >
                        <div className="flex items-center flex-1 border-1 border-transparent">
                          <div>
                            <GripVertical
                              size={14}
                              className="text-muted-foreground mx-1 cursor-grab"
                            />
                          </div>
                          <div className="w-3 h-3 rounded-full mr-2" />
                          <span className="text-base text-primary font-normal"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DndContext>
          </div>
        </div>
        <DialogFooter className="border-t-theme-main pt-3">
          <div className="flex justify-end w-full">
            <Button
              className={'bg-theme-main text-base'}
              onClick={() => setIsOpen(false)}
            >
              {LABEL.SAVE_TEMPLATE}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component to on the list of statuses in a category
const StatusGroup = ({
  group,
  setTemplates,
}: {
  group: Group;
  setTemplates: Dispatch<SetStateAction<Group[]>>;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `group-${group.id}`,
  });

  const [name, setName] = useState('');
  const [editing, setIsEditing] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onAddItem = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && name.trim()) {
      const newItem: Item = {
        id: group.items[group.items.length - 1].id + 1,
        name: name.trim(),
        color: 'blue',
        order: group.items[group.items.length - 1].order + 1,
      };
      setTemplates((prevTemplates) =>
        prevTemplates.map((g) =>
          g.id === group.id ? { ...g, items: [...g.items, newItem] } : g
        )
      );
      setName('');
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'space-y-2 p-4 rounded-lg transition-colors',
        isOver ? 'border-blue-500' : ''
      )}
    >
      <p className="text-xs font-bold text-muted-foreground">{group.name}</p>
      {group.items.length > 0 ? (
        group.items.map((item) => <StatusItem key={item.id} item={item} />)
      ) : (
        <div key={group.id} className="min-h-[1px]" />
      )}
      <AddStatusItem
        name={name}
        onChangeName={onChangeName}
        editing={editing}
        onAddItem={onAddItem}
      />
    </div>
  );
};

// Wrapper component that adds drag-and-drop functionality to StatusItem
function StatusItem({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `item-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [statusName, setStatusName] = useState(item.name);

  // on when user finishes editing
  const onBlur = () => {
    setIsEditing(false);
  };

  // on key press events (e.g., Enter to save)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setStatusName(item.name);
      setIsEditing(false);
    }
  };

  const onRename = () => {
    setIsEditing(true);
  };

  const onChangeColor = () => {};

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        key={item.id}
        className={cn(
          'flex border justify-between rounded-lg items-center py-[1.5px] hover:bg-accent/50 cursor-pointer',
          isEditing &&
            'ring-[1px] ring-theme-main-dark border-theme-main-light',
          isDragging && 'bg-accent/50',
          'hover:bg-accent/50'
        )}
        onClick={() => !isEditing && setIsEditing(true)}
      >
        {isEditing ? (
          // Editing mode - Input field with icons
          <div className="flex items-center w-full">
            <div className="flex items-center flex-1 px">
              <div {...listeners} onClick={(e) => e.stopPropagation()}>
                <GripVertical
                  size={14}
                  className="text-muted-foreground ml-1 mr-2 cursor-grab"
                />
              </div>
              <div
                className="min-w-[12px] h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color ?? '' }}
              />
              <Input
                className="h-7 !border-0 !ring-0 py-0 px-1 !text-base font-normal"
                value={statusName.toUpperCase()}
                onChange={(e) => setStatusName(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                autoFocus
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button size="icon_sm" variant="ghost">
                  <Ellipsis className="text-muted-foreground" size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={onChangeColor}>
                  Change Color
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <div className="flex items-center flex-1 border-1 border-transparent">
              <div>
                <GripVertical
                  size={14}
                  className="text-muted-foreground mx-1 cursor-grab"
                />
              </div>
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color ?? '' }}
              />
              <span className="text-base text-primary font-normal">
                {statusName.toUpperCase()}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button size="icon_sm" variant="ghost">
                  <Ellipsis className="text-muted-foreground" size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={onChangeColor}>
                  Change Color
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
}

const AddStatusItem = ({
  name,
  onChangeName,
  editing,
  onAddItem,
}: {
  name: string;
  onChangeName: ChangeEventHandler<HTMLInputElement>;
  editing: boolean;
  onAddItem: (event: KeyboardEvent) => void;
}) => {
  return (
    <div
      className={cn(
        'flex justify-between rounded-lg items-center py-[1.5px] transition-shadow',
        editing
          ? 'border border-solid border-theme-main-light  ring-1 ring-theme-main-dark'
          : 'border-dashed border-[1.5px] border-border'
      )}
    >
      <Input
        className="!border-none !ring-0 placeholder:text-base placeholder:pl-4"
        value={name.toUpperCase()}
        placeholder={'Add Status'}
        onChange={onChangeName}
        onKeyDown={(e) => onAddItem(e)}
      />
    </div>
  );
};
