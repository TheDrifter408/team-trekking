import React, { useEffect, useState } from 'react';
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

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: Group[];
}

export const StatusTemplate = ({ isOpen, setIsOpen, data }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [statusGroups, setStatusGroups] = useState<Group[]>([]);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

    const activeId = active.id.toString().replace('item-', '').trim(); // replace the unique id

    // Find the Category (group name) of the item
    for (const group of statusGroups) {
      const found = group.items.find((item) => item.id.toString() === activeId);
      if (found) {
        setActiveId(Number(activeId));
        setActiveCategory(group.name);
        break;
      }
    }
  };

  // on when dragging over a different group
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const activeId = active.id.toString().replace('item-', '').trim(); // replace the unique id
    const overId = over.id
      .toString()
      .replace(/^(item-|group-)/, '')
      .trim(); // replace the unique id name

    if (activeId === overId) return;

    let activeGroupIndex = -1;
    let overGroupIndex = -1;

    statusGroups.forEach((group, index) => {
      if (group.items.some((item) => item.id.toString() === activeId)) {
        activeGroupIndex = index;
      }
      if (group.items.some((item) => item.id.toString() === overId)) {
        overGroupIndex = index;
      }
    });

    // if the group is empty
    if (overGroupIndex === -1) {
      overGroupIndex = statusGroups.findIndex(
        (group) => group.id.toString() === overId.toString()
      );
    }

    // if not found or in the same group
    if (
      activeGroupIndex === -1 ||
      overGroupIndex === -1 ||
      activeGroupIndex === overGroupIndex
    ) {
      return;
    }

    const activeItem = statusGroups[activeGroupIndex].items.find(
      (item) => item.id.toString() === activeId
    );
    if (!activeItem) return;

    const updatedGroups = structuredClone(statusGroups); // this creates a deep copy of statusGroups
    updatedGroups[activeGroupIndex].items = updatedGroups[
      activeGroupIndex
    ].items.filter((item) => item.id.toString() !== activeId);

    const overItems = updatedGroups[overGroupIndex].items;

    const overIndex = overItems.findIndex(
      (item) => item.id.toString() === overId
    );

    // If the Item is dragged over an empty group
    if (overIndex === -1) {
      overItems.unshift(activeItem);
    } else {
      overItems.splice(overIndex + 1, 0, activeItem);
    }

    setStatusGroups(updatedGroups);
    setActiveCategory(updatedGroups[overGroupIndex].name);
  };

  // on when drag ends
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      setActiveId(null);
      setActiveCategory(null);
      return;
    }

    const activeId = active.id.toString().replace('item-', '').trim(); // replace the unique id
    const overId = over.id
      .toString()
      .replace(/^(item-|group-)/, '')
      .trim(); // replace the unique id name

    if (activeId === overId) {
      setActiveId(null);
      setActiveCategory(null);
      return;
    }

    let sourceGroupIndex = -1;
    let destinationGroupIndex = -1;

    for (let i = 0; i < statusGroups.length; i++) {
      if (
        statusGroups[i].items.some((item) => item.id.toString() === activeId)
      ) {
        sourceGroupIndex = i;
      }
      if (statusGroups[i].items.some((item) => item.id.toString() === overId)) {
        destinationGroupIndex = i;
      }
    }

    if (sourceGroupIndex === -1 || destinationGroupIndex === -1) {
      setActiveId(null);
      setActiveCategory(null);
      return;
    }

    const draggedItem = statusGroups[sourceGroupIndex].items.find(
      (item) => item.id.toString() === activeId
    );
    if (!draggedItem) {
      setActiveId(null);
      setActiveCategory(null);
      return;
    }

    const updatedGroups = [...statusGroups];

    updatedGroups[sourceGroupIndex].items = updatedGroups[
      sourceGroupIndex
    ].items.filter((item) => item.id.toString() !== activeId);

    const overIndex = updatedGroups[destinationGroupIndex].items.findIndex(
      (item) => item.id.toString() === overId
    );

    updatedGroups[destinationGroupIndex].items.splice(
      overIndex,
      0,
      draggedItem
    );

    setStatusGroups(updatedGroups);
    setActiveId(null);
    setActiveCategory(null);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setStatusGroups(data);
    }
  }, [data]);

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
              value={selectedTemplate ? selectedTemplate : 'Custom'}
              onValueChange={setSelectedTemplate}
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
                  {['Template One', 'Template Two', 'Template Three'].map(
                    (template, idx) => (
                      <SelectItem
                        className="hover:bg-accent cursor-pointer"
                        key={idx}
                        value={template}
                      >
                        {template}
                      </SelectItem>
                    )
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
                {statusGroups.map((group) => (
                  <SortableContext
                    key={group.id}
                    items={group.items.map((item) => item.id)}
                  >
                    <div key={group.id} className="mt-4">
                      <div className="space-y-2 mt-2">
                        <StatusGroup group={group} />
                      </div>
                    </div>
                  </SortableContext>
                ))}
              </div>
            </DndContext>
          </div>
        </div>
        <DialogFooter className="border-t-theme-main pt-3">
          <div className="flex justify-end w-full">
            <Button className={'bg-theme-main text-base'}>
              {LABEL.SAVE_TEMPLATE}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component to on the list of statuses in a category
const StatusGroup = ({ group }: { group: Group }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: group.id.toString(),
  });

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
        // Render an empty div if items is empty
        <div>
          <div
            className={cn(
              'flex border justify-between rounded-lg items-center py-[1.5px] hover:bg-accent/50 cursor-pointer'
            )}
          >
            <div className="flex items-center min-h-7 flex-1 border-1 border-transparent" />
          </div>
        </div>
      )}
      <AddStatusItem />
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
  } = useSortable({ id: item.id });

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
    <div ref={setNodeRef} style={style} {...attributes}>
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
              <div {...listeners} onClick={(e) => e.stopPropagation()}>
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

const AddStatusItem = () => {
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
        value={name}
        placeholder={'Add Status'}
        onChange={onChangeName}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
      />
    </div>
  );
};
