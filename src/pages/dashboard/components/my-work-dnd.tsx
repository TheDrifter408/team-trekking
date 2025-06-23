import { FC, useState } from 'react';
import {
  MyWorkTask,
  ScheduleSection as ScheduleType,
} from '@/types/props/Common.ts';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@/assets/icon-path.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { LABEL } from '@/lib/constants';

interface DropIndicatorProps {
  isVisible: boolean;
}

const DropIndicator: FC<DropIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="h-0.5 bg-blue-500 mx-4 my-1 rounded-full opacity-80 transition-opacity duration-200">
      <div className="w-2 h-2 bg-blue-500 rounded-full -mt-1 -ml-1"></div>
    </div>
  );
};

interface SortableTaskItemProps {
  task: MyWorkTask;
  isDragOver: boolean;
  isAfterDraggedItem: boolean;
}

const SortableTaskItem: FC<SortableTaskItemProps> = ({
  task,
  isDragOver,
  isAfterDraggedItem,
}) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const iconList = ['trash', 'user', 'calendar', 'priority'];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isHovered = hoveredTaskId === task.id;

  return (
    <>
      <DropIndicator isVisible={isDragOver && !isAfterDraggedItem} />
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center cursor-default h-[52px] text-sm hover:bg-secondary/20 rounded relative min-w-0"
        onMouseEnter={() => setHoveredTaskId(task.id)}
        onMouseLeave={() => setHoveredTaskId(null)}
      >
        <div className="flex items-center h-full shrink-0">
          <div
            className={`transition-opacity duration-200 cursor-grab active:cursor-grabbing ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            {...attributes}
            {...listeners}
          >
            <Icon name="drag" className="size-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center flex-1 border-b h-full px-2 min-w-0">
          <div
            className="size-4 rounded-full mr-2 shrink-0"
            style={{ backgroundColor: task.color }}
          />
          <div className="min-w-0 flex flex-1 text-base text-content-default truncate">
            {task.name}
            <div className="ml-2 min-w-0 flex-1 text-base text-muted-foreground truncate">
              {task.description?.substring(0, 30)}
            </div>
          </div>

          <div className="ml-auto shrink-0">
            {isHovered ? (
              <div
                className="flex space-x-1"
                onClick={(e) => e.stopPropagation()}
              >
                {iconList.map((icon, index) => (
                  <Button
                    key={index}
                    size={'auto'}
                    className={'bg-background p-[3px]'}
                    variant="outline"
                  >
                    <Icon
                      name={icon as any}
                      className={'size-5 text-[#646464]/80 text-opacity-90 '}
                    />
                  </Button>
                ))}
                <Button size={'auto'} variant={'ghost'} className={'p-[3px]'}>
                  <Icon
                    name={'okfill03'}
                    className={'text-theme-main-dark size-6'}
                  />
                </Button>
              </div>
            ) : (
              <span className="text-base whitespace-nowrap">
                {task.dueDate ? 'Due' : 'Today'}
              </span>
            )}
          </div>
        </div>
      </div>
      <DropIndicator isVisible={isDragOver && isAfterDraggedItem} />
    </>
  );
};

interface ScheduleSectionProps {
  section: ScheduleType;
  isDragOver: boolean;
  dragOverInfo: { taskIndex: number; isAfter: boolean } | null;
}

const ScheduleSection: FC<ScheduleSectionProps> = ({
  section,
  isDragOver,
  dragOverInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `section-${section.id}`,
    data: {
      type: 'section',
      sectionId: section.id,
    },
  });

  const {
    setNodeRef: setSectionRef,
    transform,
    transition,
    isDragging: isSectionDragging,
  } = useSortable({
    id: section.id,
    data: {
      type: 'section',
    },
  });

  const sectionStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSectionDragging ? 0.5 : 1,
  };

  const combinedRef = (node: HTMLElement | null) => {
    setSectionRef(node);
    setDroppableRef(node);
  };

  return (
    <div ref={combinedRef} style={sectionStyle}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger
          className={cn(
            'flex items-center justify-between w-full py-2 px-4 hover:bg-gray-100 rounded-md transition-colors',
            isDragOver && 'bg-blue-50 border-2 border-dashed border-blue-300'
          )}
        >
          <div className="flex items-center space-x-2">
            {isOpen ? (
              <IconCaretDownFilled size={16} />
            ) : (
              <IconCaretRightFilled size={16} />
            )}
            <span className="font-medium text-primary text-base">
              {section.id}
            </span>
            <span className="text-sm text-gray-500">
              {section.tasks.length}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-1 !mx-0 ml-2">
          <SortableContext
            items={section.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {section.tasks.length === 0 ? (
              <div
                className={cn(
                  'py-1 px-1text-base text-content-tertiary rounded-md mx-4 my-2'
                )}
              >
                {LABEL.NO_TASKS}
              </div>
            ) : (
              section.tasks.map((task, index) => (
                <SortableTaskItem
                  key={task.id}
                  task={task}
                  isDragOver={isDragOver && dragOverInfo?.taskIndex === index}
                  isAfterDraggedItem={dragOverInfo?.isAfter || false}
                />
              ))
            )}
          </SortableContext>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

interface TaskItemOverlayProps {
  task: MyWorkTask;
}

const TaskItemOverlay: FC<TaskItemOverlayProps> = ({ task }) => {
  return (
    <div className="flex items-center h-[52px] text-sm bg-white shadow-lg rounded opacity-95 min-w-0 border-2 border-blue-300">
      {/* Grip icon in overlay */}
      <div className="flex items-center h-full shrink-0">
        <Icon name="drag" className="size-4 text-muted-foreground -ml-[10px]" />
      </div>

      {/* Main content */}
      <div className="flex items-center flex-1 px-2 min-w-0">
        <div
          className="size-4 rounded-full mr-2 shrink-0"
          style={{ backgroundColor: task.color }}
        />
        <div className="min-w-0 flex-1 text-base text-content-default truncate">
          {task.name}
        </div>
        <div className="ml-2 min-w-0 flex-1 text-base text-muted-foreground truncate">
          {task.description?.substring(0, 30)}
        </div>
        <div className="ml-auto shrink-0">
          <span className="text-base whitespace-nowrap">
            {task.dueDate ? 'Due' : 'Today'}
          </span>
        </div>
      </div>
    </div>
  );
};

interface DragAndDropProviderProps {
  sections: ScheduleType[];
  onTaskReorder: (
    sectionId: string,
    oldIndex: number,
    newIndex: number
  ) => void;
  onTaskMove: (
    taskId: string,
    sourceSectionId: string,
    targetSectionId: string,
    targetIndex?: number
  ) => void;
}

const DragAndDropProvider: FC<DragAndDropProviderProps> = ({
  sections,
  onTaskReorder,
  onTaskMove,
}) => {
  const [activeTask, setActiveTask] = useState<MyWorkTask | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dragOverSection, setDragOverSection] = useState<string | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{
    sectionId: string;
    taskIndex: number;
    isAfter: boolean;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;

    // Find the task and its section
    for (const section of sections) {
      const task = section.tasks.find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
        setActiveSection(section.id);
        break;
      }
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
      setDragOverSection(null);
      setDragOverInfo(null);
      return;
    }

    const overId = over.id as string;

    // Check if dragging over a section header
    if (overId.startsWith('section-')) {
      const sectionId = overId.replace('section-', '');
      setDragOverSection(sectionId);
      setDragOverInfo(null);
      return;
    }

    // Check if dragging over a task
    const overTask = sections
      .flatMap((section) =>
        section.tasks.map((task) => ({ ...task, sectionId: section.id }))
      )
      .find((task) => task.id === overId);

    if (overTask) {
      const section = sections.find((s) => s.id === overTask.sectionId);
      if (section) {
        const taskIndex = section.tasks.findIndex((t) => t.id === overId);
        const rect = over.rect;
        const isAfter = event.delta.y > rect.height / 2;

        setDragOverSection(overTask.sectionId);
        setDragOverInfo({
          sectionId: overTask.sectionId,
          taskIndex: isAfter ? taskIndex + 1 : taskIndex,
          isAfter,
        });
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setDragOverSection(null);
    setDragOverInfo(null);

    if (!over || !activeSection) {
      setActiveTask(null);
      setActiveSection(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle dropping on section header
    if (overId.startsWith('section-')) {
      const targetSectionId = overId.replace('section-', '');
      if (targetSectionId !== activeSection) {
        onTaskMove(activeId, activeSection, targetSectionId);
      }
      setActiveTask(null);
      setActiveSection(null);
      return;
    }

    // Handle dropping on/near a task
    const overTask = sections
      .flatMap((section) =>
        section.tasks.map((task) => ({ ...task, sectionId: section.id }))
      )
      .find((task) => task.id === overId);

    if (overTask) {
      const targetSectionId = overTask.sectionId;

      if (targetSectionId !== activeSection) {
        // Moving to different section
        const targetSection = sections.find((s) => s.id === targetSectionId);
        if (targetSection) {
          const taskIndex = targetSection.tasks.findIndex(
            (t) => t.id === overId
          );
          const rect = over.rect;
          const isAfter = event.delta.y > rect.height / 2;
          const insertIndex = isAfter ? taskIndex + 1 : taskIndex;

          onTaskMove(activeId, activeSection, targetSectionId, insertIndex);
        }
      } else {
        // Reordering within same section
        const currentSection = sections.find((s) => s.id === activeSection);
        if (currentSection && activeId !== overId) {
          const oldIndex = currentSection.tasks.findIndex(
            (t) => t.id === activeId
          );
          const newIndex = currentSection.tasks.findIndex(
            (t) => t.id === overId
          );

          if (oldIndex !== -1 && newIndex !== -1) {
            onTaskReorder(activeSection, oldIndex, newIndex);
          }
        }
      }
    }

    setActiveTask(null);
    setActiveSection(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {sections.map((section: ScheduleType) => (
        <ScheduleSection
          key={section.id}
          section={section}
          isDragOver={dragOverSection === section.id}
          dragOverInfo={
            dragOverInfo?.sectionId === section.id
              ? {
                  taskIndex: dragOverInfo.taskIndex,
                  isAfter: dragOverInfo.isAfter,
                }
              : null
          }
        />
      ))}

      <DragOverlay>
        {activeTask ? <TaskItemOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export { DragAndDropProvider, DragOverlay };
