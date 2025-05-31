import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { taskTemplates } from '@/mock';
import { Input } from '@/components/ui/input';
import { Info, GripVertical, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

// Types
interface TaskTemplate {
  id: number;
  name: string;
  statuses: TaskStatus[];
}

interface TaskStatus {
  id: number;
  name: string;
  color: string;
  category: string;
}

interface Category {
  id: string;
  status: number[];
  description: string;
}

interface CategoryStatusGroup {
  description: string;
  statuses: TaskStatus[];
}

interface StatusesByCategory {
  [key: string]: CategoryStatusGroup;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const getFilteredTemplates = (
  templates: TaskTemplate[],
  query: string
): TaskTemplate[] => {
  return templates.filter((template) =>
    template.name.toLowerCase().includes(query.toLowerCase())
  );
};

const getCurrentTemplate = (
  templates: TaskTemplate[],
  templateName: string
): TaskTemplate | undefined => {
  return templates.find((template) => template.name === templateName);
};

const getStatusesByCategory = (
  currentTemplate: TaskTemplate | undefined,
  categories: Category[]
): StatusesByCategory => {
  if (!currentTemplate) return {};

  const statusesByCategory: StatusesByCategory = {};

  // Initialize categories
  categories.forEach((category) => {
    statusesByCategory[category.id] = {
      description: category.description,
      statuses: [],
    };
  });

  currentTemplate.statuses.forEach((status) => {
    if (statusesByCategory[status.category]) {
      statusesByCategory[status.category].statuses.push(status);
    }
  });

  return statusesByCategory;
};

export const StatusTemplate = ({ isOpen, setIsOpen }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(
    taskTemplates.templates[0]?.name ?? ''
  );
  const [statusGroups, setStatusGroups] = useState<StatusesByCategory>({});
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTemplates = getFilteredTemplates(
    taskTemplates.templates,
    searchQuery
  );
  const currentTemplate = getCurrentTemplate(
    taskTemplates.templates,
    selectedTemplate
  );

  // Set initial status groups
  useEffect(() => {
    const groups = getStatusesByCategory(
      currentTemplate,
      taskTemplates.categories
    );
    setStatusGroups(groups);
  }, [currentTemplate]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Handle when drag starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number);

    // Find which category this status belongs to
    for (const categoryId in statusGroups) {
      const found = statusGroups[categoryId].statuses.find(
        (status) => status.id === active.id
      );
      if (found) {
        setActiveCategory(categoryId);
        break;
      }
    }
  };

  // Handle when dragging over a different category
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over || !activeCategory) return;

    // Find the target category
    let targetCategory = activeCategory;
    for (const categoryId in statusGroups) {
      const found = statusGroups[categoryId].statuses.find(
        (status) => status.id === over.id
      );
      if (found) {
        targetCategory = categoryId;
        break;
      }
    }

    // If we're dragging into a different category
    if (targetCategory !== activeCategory && activeId) {
      setStatusGroups((current) => {
        // Find the item we're dragging
        const activeStatus = current[activeCategory].statuses.find(
          (status) => status.id === activeId
        );

        if (!activeStatus) return current;

        // Create a copy with the item removed from its original category
        const updatedGroups = { ...current };
        updatedGroups[activeCategory] = {
          ...current[activeCategory],
          statuses: current[activeCategory].statuses.filter(
            (status) => status.id !== activeId
          ),
        };

        // Update the category on the status
        const updatedStatus = { ...activeStatus, category: targetCategory };

        // Add the item to the new category
        updatedGroups[targetCategory] = {
          ...current[targetCategory],
          statuses: [...current[targetCategory].statuses, updatedStatus],
        };

        setActiveCategory(targetCategory);
        return updatedGroups;
      });
    }
  };

  // Handle when drag ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !activeCategory) {
      setActiveId(null);
      setActiveCategory(null);
      return;
    }

    // Find which category the over item belongs to
    let targetCategory = activeCategory;
    for (const categoryId in statusGroups) {
      const found = statusGroups[categoryId].statuses.find(
        (status) => status.id === over.id
      );
      if (found) {
        targetCategory = categoryId;
        break;
      }
    }

    // If we're in the same category, handle reordering
    if (targetCategory === activeCategory && active.id !== over.id) {
      setStatusGroups((current) => {
        const statusList = [...current[activeCategory].statuses];
        const oldIndex = statusList.findIndex(
          (status) => status.id === active.id
        );
        const newIndex = statusList.findIndex(
          (status) => status.id === over.id
        );

        const newStatusList = arrayMove(statusList, oldIndex, newIndex);

        return {
          ...current,
          [activeCategory]: {
            ...current[activeCategory],
            statuses: newStatusList,
          },
        };
      });
    }

    setActiveId(null);
    setActiveCategory(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="!max-w-[690px] flex flex-col h-[80%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Edit Space Status
            <div className="border-b mt-3" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 rounded-md overflow-hidden">
          <div className="w-[40%] p-2">
            <span className="font-medium text-sm text-muted-foreground">
              Status template
            </span>
            <Select
              value={selectedTemplate}
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
                  {filteredTemplates.map((template) => (
                    <SelectItem
                      className="hover:bg-accent cursor-pointer"
                      key={template.id}
                      value={template.name}
                    >
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-px bg-border" />
          <div className="w-[60%] p-2 overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="px-4">
                {taskTemplates.categories.map(
                  (category: Category) =>
                    statusGroups[category.id]?.statuses.length > 0 && (
                      <div key={category.id} className="mt-4">
                        <TemplateCategory category={category} />
                        <div className="space-y-1 mt-2">
                          <CategoryStatusList
                            statuses={statusGroups[category.id].statuses}
                            categoryId={category.id}
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </DndContext>
          </div>
        </div>
        <DialogFooter className="border-t-theme-main pt-3">
          <div className="flex justify-end w-full">
            <Button className={'bg-theme-main text-base'}>Save Template</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component to handle the list of statuses in a category
function CategoryStatusList({
  statuses,
}: {
  statuses: TaskStatus[];
  categoryId: string;
}) {
  return (
    <SortableContext
      items={statuses.map((status) => status.id)}
      strategy={verticalListSortingStrategy}
    >
      {statuses.map((status) => (
        <SortableStatusItem key={status.id} status={status} />
      ))}
      <AddStatusItem />
    </SortableContext>
  );
}

function AddStatusItem() {
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
}

// Wrapper component that adds drag-and-drop functionality to StatusItem
function SortableStatusItem({ status }: { status: TaskStatus }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <StatusItem
        status={status}
        dragHandleProps={listeners}
        isDragging={isDragging}
      />
    </div>
  );
}

function StatusItem({
  status,
  dragHandleProps = {},
  isDragging = false,
}: {
  status: TaskStatus;
  dragHandleProps?: SyntheticListenerMap;
  isDragging?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [statusName, setStatusName] = useState(status.name);

  // Handle when user finishes editing
  const onBlur = () => {
    setIsEditing(false);
  };

  // Handle key press events (e.g., Enter to save)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setStatusName(status.name);
      setIsEditing(false);
    }
  };

  const onRename = () => {
    setIsEditing(true);
  };

  const onChangeColor = () => {};

  return (
    <div
      key={status.id}
      className={cn(
        'flex border justify-between rounded-lg items-center py-[1.5px] hover:bg-accent/50 cursor-pointer',
        isEditing && 'ring-[1px] ring-theme-main-dark border-theme-main-light',
        isDragging && 'bg-accent/50',
        'hover:bg-accent/50'
      )}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        // Editing mode - Input field with icons
        <div className="flex items-center w-full">
          <div className="flex items-center flex-1 px-1">
            <div {...dragHandleProps} onClick={(e) => e.stopPropagation()}>
              <GripVertical
                size={14}
                className="text-muted-foreground ml-1 mr-2 cursor-grab"
              />
            </div>
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: status.color }}
            />
            <Input
              className="h-7 !border-0 !ring-0 py-0 px-1 text-base font-normal"
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
          <div className="flex items-center flex-1">
            <div {...dragHandleProps} onClick={(e) => e.stopPropagation()}>
              <GripVertical
                size={14}
                className="text-muted-foreground mx-1 cursor-grab"
              />
            </div>
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: status.color }}
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
  );
}

// Renders the Template's category item
function TemplateCategory({ category }: { category: Category }) {
  return (
    <div key={category.id} className="mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm text-muted-foreground font-medium">
          {category.id}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="rounded-full p-1 bg-accent text-xs flex items-center justify-center w-5 h-5">
                <Info size={12} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{category.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
