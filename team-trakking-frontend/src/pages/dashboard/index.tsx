'use client';

import { ReactNode, useState } from 'react';
import { recentData, myWorkData, assignedCommentData } from '@/mock';
import { WELCOME_MESSAGE } from '@/lib/constants';
import { ScheduleSection as SchedulType } from '@/types/props/common';
import { Main } from '@/components/layout/main.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { List, Circle } from 'lucide-react';
import {
  IconCaretRightFilled,
  IconCaretDownFilled,
  IconCalendar,
  IconCircleCheck,
  IconFlag,
  IconTrash,
  IconUser,
  IconArrowsDiagonal,
} from '@tabler/icons-react';
import { PageHeader } from './components/page-header';

export const Dashboard = () => {
  const [state, setState] = useState<'Default' | 'Full'>('Full');
  const [title, setTitle] = useState<string>('');
  const onCancelFullView = () => {
    setState('Default');
    setTitle('');
  };
  const onExpandToFullView = (cardTitle: string) => {
    setState('Full');
    setTitle(cardTitle);
  };
  return (
    <div>
      <PageHeader
        title={title}
        onCancelFullView={onCancelFullView}
        state={state}
      />
      <Main>
        <div className="px-[25px]">
          <span className="text-3xl font-semibold ml-3">{WELCOME_MESSAGE}</span>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <RecentsCard onExpand={onExpandToFullView} />
            <MyWorkCard onExpand={onExpandToFullView} />
            <AssignedComments onExpand={onExpandToFullView} />
          </div>
        </div>
      </Main>
    </div>
  );
};

function HoverableCard({
  children,
  title,
  onExpand,
}: {
  children: ReactNode;
  title: string;
  onExpand: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="h-[336px] w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative">
        <CardTitle className="flex items-center cursor-default">
          {title}
        </CardTitle>
        {isHovered && (
          <Button
            onClick={onExpand}
            size={'icon_sm'}
            variant={'ghost'}
            className="absolute top-0 right-4"
          >
            <IconArrowsDiagonal className="text-muted-foreground" />
          </Button>
        )}
      </CardHeader>
      {children}
    </Card>
  );
}

function AssignedComments({
  onExpand,
}: {
  onExpand: (cardTitle: string) => void;
}) {
  return (
    <HoverableCard
      title="Assigned comments"
      onExpand={() => onExpand('Assigned Comments')}
    >
      <CardContent className="overflow-y-scroll space-y-3 px-2 max-h-[270px]">
        {assignedCommentData.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-start hover:bg-accent p-2 rounded-sm cursor-default justify-between"
          >
            <div className="flex space-x-3 w-full">
              <img
                src={item.imageUrl}
                alt="avatar"
                className="h-[24px] w-[24px] rounded-full shrink-0"
              />
              <div className="flex flex-col w-full">
                <span className="text-base w-full">{item.comment}</span>
                <div className="flex justify-between w-full mt-1">
                  <span className="text-xs text-muted-foreground truncate max-w-[70%]">
                    {item.taskName}
                  </span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.commentTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </HoverableCard>
  );
}

function MyWorkCard({ onExpand }: { onExpand: (cardTitle: string) => void }) {
  const todoWorkData = myWorkData.find((data) => data.workType === 'ToDo');

  // Get completed tasks
  const completedTasks =
    todoWorkData?.scheduleData.flatMap((section) =>
      section.tasks.filter((task) => task.completed)
    ) || [];

  return (
    <HoverableCard title="My Work" onExpand={() => onExpand('My Work')}>
      <CardContent className="overflow-y-scroll space-y-1 !px-[10px]">
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
            {todoWorkData?.scheduleData.map((section) => (
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
      </CardContent>
    </HoverableCard>
  );
}

function RecentsCard({ onExpand }: { onExpand: (cardTitle: string) => void }) {
  return (
    <HoverableCard title="Recents" onExpand={() => onExpand('Recents')}>
      <CardContent className="overflow-y-scroll space-y-1 !px-[10px]">
        {recentData.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 hover:bg-accent py-1 rounded"
          >
            <div className="w-[20px]">
              {item.type === 'List' ? (
                <List size={15} className={'bg-text-muted'} />
              ) : (
                <Circle size={15} className={'bg-text-muted'} />
              )}
            </div>
            <div className="relative w-[45%] shrink-0">
              <span className="block text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name}
              </span>
            </div>
            <span className="text-muted-foreground w-[45%] text-base truncate">
              {item.location}
            </span>
          </div>
        ))}
      </CardContent>
    </HoverableCard>
  );
}

function ScheduleSection({ section }: { section: SchedulType }) {
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
