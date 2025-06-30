import { useState } from 'react';
import { Label } from '@/components/shadcn-ui/label.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog.tsx';
import { ChevronDown, ChevronRight, Disc2, GripVertical } from 'lucide-react';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LABEL } from '@/lib/constants';

interface Status {
  id: string;
  name: string;
  color: string;
  category: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  statuses: Status[];
}

export const StatusView = ({
  open,
  setOpen,
  statuses: initialStatuses,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(
    'Select a status template'
  );
  const [statuses, setStatuses] = useState<Status[]>(initialStatuses);
  const categoryOrder = ['Not Started', 'Active', 'Closed'];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group statuses by category
  const groupedStatuses = statuses.reduce(
    (groups, status) => {
      if (!groups[status.category]) {
        groups[status.category] = [];
      }
      groups[status.category].push(status);
      return groups;
    },
    {} as { [key: string]: Status[] }
  );

  const categories = categoryOrder.filter((cat) =>
    Object.keys(groupedStatuses).includes(cat)
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent, category: string) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setStatuses((items) => {
        // Find all statuses in this category
        const categoryItems = items.filter(
          (item) => item.category === category
        );

        // Find indices within category items
        const oldIndex = categoryItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = categoryItems.findIndex(
          (item) => item.id === over?.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          // Reorder the category items using arrayMove
          const newCategoryItems = arrayMove(categoryItems, oldIndex, newIndex);

          // Replace these items in the original array
          const otherItems = items.filter((item) => item.category !== category);
          return [...otherItems, ...newCategoryItems];
        }

        return items;
      });
    }
  };

  // Filter statuses based on selected option
  const getFilteredCategories = () => {
    if (selectedOption === 'View All') return categories;

    return categories.filter((category) => {
      if (selectedOption === 'Active Only') return category === 'Active';
      if (selectedOption === 'Completed') return category === 'Closed';
      return true;
    });
  };

  return (
    <div>
      <Label className="text-right mb-2">Settings</Label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="py-4 bg-background w-full border rounded-xl flex items-center px-3 cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-3">
                <div className="rounded-md border border-1 p-2">
                  <Disc2 />
                </div>
                <div>
                  <p className="text-base">{LABEL.EDIT_STATUSES}</p>
                  <p className="text-xs text-muted-foreground">
                    {LABEL.USE_SPACE_STATUSES}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-muted px-2 py-1 text-xs">?</div>
                <ChevronRight />
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="!max-w-[690px] flex flex-col h-[80%]">
          <DialogHeader>
            <DialogTitle>Statuses</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="w-full flex">
            {/* Left column - 40% width */}
            <div className="w-2/5 flex flex-col items-start pl-2 pr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-7 w-full px-3 text-muted-foreground flex justify-between mb-4"
                  >
                    {selectedOption}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[--radix-dropdown-menu-trigger-width]">
                  <DropdownMenuItem
                    onClick={() => setSelectedOption('View All')}
                  >
                    Custom
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => setSelectedOption('Active Only')}
                  >
                    Scrum
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => setSelectedOption('Completed')}
                  >
                    Marketing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Vertical separator */}
            <Separator orientation="vertical" />

            {/* Right column - 60% width */}
            <div className="w-3/5 overflow-y-auto pl-4">
              {getFilteredCategories().map((category) => (
                <div key={`statuses-${category}`} className="mb-3">
                  <h3 className="text-xs font-medium text-gray-600 mb-1">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, category)}
                    >
                      <SortableContext
                        items={(groupedStatuses[category] || []).map(
                          (status) => status.id
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {(groupedStatuses[category] || []).map((status) => (
                          <SortableStatusItem key={status.id} status={status} />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sortable status item component
function SortableStatusItem({ status }: { status: Status }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 px-2 py-2 rounded-md border bg-gray-50"
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4 text-gray-600 cursor-grab" />
      </div>
      <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
      <span className="text-xs">{status.name}</span>
    </div>
  );
}
