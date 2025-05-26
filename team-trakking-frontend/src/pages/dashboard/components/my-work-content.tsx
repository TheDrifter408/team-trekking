import { useState } from 'react';
import { myWorkData } from '@/mock';
import { CardContent } from '@/components/ui/card.tsx';
import { HoverableCard } from './hoverable-card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  IconCalendar,
  IconCaretDownFilled,
  IconCaretRightFilled,
  IconCircleCheck,
  IconFlag,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';
import {
  MyWorkTask,
  WorkData,
  ScheduleSection as ScheduleType,
} from '@/types/props/common.ts';

interface Props {
  expanded: boolean;
  onExpand: (cardTitle: string) => void;
  cardTitle: string;
}

export const MyWorkContent = ({ expanded, onExpand, cardTitle }: Props) => {
  return (
    <MyWork isExpanded={expanded} onExpand={onExpand} cardTitle={cardTitle} />
  );
};

function MyWork({
  isExpanded,
  onExpand,
  cardTitle,
}: {
  isExpanded: boolean;
  onExpand: (title: string) => void;
  cardTitle: string;
}) {
  const todoWorkData: WorkData | undefined = myWorkData.find(
    (data) => data.workType === 'ToDo'
  );

  // Get completed tasks
  const completedTasks =
    todoWorkData?.scheduleData.flatMap((section) =>
      section.tasks.filter((task) => task.completed)
    ) || [];

  return (
    <HoverableCard
      isExpanded={isExpanded}
      title="My Work"
      onExpand={() => onExpand(cardTitle)}
    >
      <CardContent
        className={cn(
          'overflow-y-auto space-y-1 !px-[10px]',
          isExpanded && 'flex-grow pb-[90px]'
        )}
      >
        <Content
          todoWorkData={todoWorkData}
          completedTasks={completedTasks}
          className={isExpanded ? 'flex-grow' : ''}
        />
      </CardContent>
    </HoverableCard>
  );
}

function Content({
  todoWorkData,
  completedTasks,
  className,
}: {
  todoWorkData: WorkData | undefined;
  completedTasks: MyWorkTask[];
  className?: string;
}) {
  return (
    <div className={cn('w-full', className)}>
      <Tabs defaultValue="todo" className="w-full">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="todo" variant="underline">
            <span className="text-muted-foreground font-medium text-base">
              To Do
            </span>
          </TabsTrigger>
          <TabsTrigger value="done" variant="underline">
            <span className="text-muted-foreground font-medium text-base">
              Done
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="space-y-2 mt-2">
          {todoWorkData?.scheduleData.map((section: ScheduleType) => (
            <ScheduleSection key={section.id} section={section} />
          ))}
        </TabsContent>

        <TabsContent value="done" className="space-y-2 mt-2">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task.id} className="text-sm py-1 px-4">
                {task.name}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 py-2 px-4">
              No completed tasks
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ScheduleSection({ section }: { section: ScheduleType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-100 rounded-md">
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <IconCaretDownFilled size={16} />
          ) : (
            <IconCaretRightFilled size={16} />
          )}
          <span className="font-medium text-primary text-base">
            {section.id}
          </span>
          <span className="text-sm text-gray-500">{section.tasks.length}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-1 space-y-1">
        {section.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center text-sm hover:bg-accent py-[10px] px-2 rounded"
            onMouseEnter={() => setHoveredTaskId(task.id)}
            onMouseLeave={() => setHoveredTaskId(null)}
          >
            <div
              className="w-3 h-3 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: task.color }}
            />
            <div className="max-w-[40%] text-base truncate">{task.name}</div>
            <div className="ml-[7px] max-w-[50%] text-base text-muted-foreground truncate">
              {task.description?.substring(0, 30)}
            </div>
            <div className="ml-auto shrink-0">
              {hoveredTaskId === task.id ? (
                <div className="flex ">
                  <Button
                    size={'icon_sm'}
                    className="hover:bg-gray-300"
                    variant={'ghost'}
                  >
                    <IconTrash size={16} />
                  </Button>
                  <Button
                    size={'icon_sm'}
                    className="hover:bg-gray-300"
                    variant={'ghost'}
                  >
                    <IconUser size={16} />
                  </Button>
                  <Button
                    size={'icon_sm'}
                    className="hover:bg-gray-300"
                    variant={'ghost'}
                  >
                    <IconCalendar size={16} />
                  </Button>
                  <Button
                    size={'icon_sm'}
                    className="hover:bg-gray-300"
                    variant={'ghost'}
                  >
                    <IconFlag size={16} />
                  </Button>
                  <Button
                    size={'icon_sm'}
                    className="hover:bg-gray-300"
                    variant={'ghost'}
                  >
                    <IconCircleCheck size={16} />
                  </Button>
                </div>
              ) : (
                <span className="text-base">
                  {task.dueDate ? 'Due' : 'Today'}
                </span>
              )}
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
