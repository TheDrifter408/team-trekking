import { FC, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { myWorkData } from '@/mock';
import { CardContent } from '@/components/shadcn-ui/card';
import { HoverableCard } from './hoverable-card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import { DragAndDropProvider } from '@/pages/dashboard/components/my-work-dnd.tsx';
import { cn } from '@/lib/utils';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { MyWorkTask, WorkData } from '@/types/props/Common.ts';

interface Props {
  expanded: boolean;
  onExpand: (cardTitle: string) => void;
  cardTitle: string;
}

export const MyWorkContent: FC<Props> = ({ expanded, onExpand, cardTitle }) => (
  <MyWork isExpanded={expanded} onExpand={onExpand} cardTitle={cardTitle} />
);

interface MyWorkProps {
  isExpanded: boolean;
  onExpand: (title: string) => void;
  cardTitle: string;
}

const MyWork: FC<MyWorkProps> = ({ isExpanded, onExpand, cardTitle }) => {
  const [workData, setWorkData] = useState(() => myWorkData);

  const todoWorkData: WorkData | undefined = workData.find(
    (data) => data.workType === 'ToDo'
  );

  const completedTasks =
    todoWorkData?.scheduleData.flatMap((section) =>
      section.tasks.filter((task) => task.completed)
    ) || [];

  const onTaskReorder = (
    sectionId: string,
    oldIndex: number,
    newIndex: number
  ) => {
    setWorkData((prevData) =>
      prevData.map((workItem) => {
        if (workItem.workType === 'ToDo') {
          return {
            ...workItem,
            scheduleData: workItem.scheduleData.map((section) => {
              if (section.id === sectionId) {
                const newTasks = arrayMove(section.tasks, oldIndex, newIndex);
                return { ...section, tasks: newTasks };
              }
              return section;
            }),
          };
        }
        return workItem;
      })
    );
  };

  const onTaskMove = (
    taskId: string,
    sourceSectionId: string,
    targetSectionId: string,
    targetIndex?: number
  ) => {
    if (sourceSectionId === targetSectionId) return;

    setWorkData((prevData) =>
      prevData.map((workItem) => {
        if (workItem.workType === 'ToDo') {
          let taskToMove: MyWorkTask | null = null;

          // Find and remove the task from source section
          const updatedScheduleData = workItem.scheduleData.map((section) => {
            if (section.id === sourceSectionId) {
              const taskIndex = section.tasks.findIndex(
                (task) => task.id === taskId
              );
              if (taskIndex !== -1) {
                taskToMove = section.tasks[taskIndex];
                return {
                  ...section,
                  tasks: section.tasks.filter((task) => task.id !== taskId),
                };
              }
            }
            return section;
          });

          // Add the task to target section at specified index or at the end
          const finalScheduleData = updatedScheduleData.map((section) => {
            if (section.id === targetSectionId && taskToMove) {
              const newTasks = [...section.tasks];
              if (typeof targetIndex === 'number' && targetIndex >= 0) {
                newTasks.splice(targetIndex, 0, taskToMove);
              } else {
                newTasks.push(taskToMove);
              }
              return {
                ...section,
                tasks: newTasks,
              };
            }
            return section;
          });

          return { ...workItem, scheduleData: finalScheduleData };
        }
        return workItem;
      })
    );
  };

  return (
    <HoverableCard
      isExpanded={isExpanded}
      title={cardTitle}
      onExpand={() => onExpand(cardTitle)}
    >
      <CardContent
        className={cn(
          'overflow-y-auto space-y-1 !px-0',
          isExpanded && 'flex-grow pb-[90px]'
        )}
      >
        <Content
          todoWorkData={todoWorkData}
          completedTasks={completedTasks}
          className={isExpanded ? 'flex-grow' : ''}
          onTaskReorder={onTaskReorder}
          onTaskMove={onTaskMove}
        />
      </CardContent>
    </HoverableCard>
  );
};

interface ContentProps {
  todoWorkData: WorkData | undefined;
  completedTasks: MyWorkTask[];
  className?: string;
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

const Content: FC<ContentProps> = ({
  todoWorkData,
  completedTasks,
  className,
  onTaskReorder,
  onTaskMove,
}) => (
  <div className={cn('w-full', className)}>
    <Tabs defaultValue="todo" className="w-full">
      <TabsList variant="underline" className="w-full px-[10px]">
        <TabsTrigger value="todo" variant="underline">
          <span className="text-muted-foreground font-medium text-base">
            {LABEL.TODO}
          </span>
        </TabsTrigger>
        <TabsTrigger value="done" variant="underline">
          <span className="text-muted-foreground font-medium text-base">
            {LABEL.DONE}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="todo" className="space-y-2 mt-2  ">
        <DragAndDropProvider
          sections={todoWorkData?.scheduleData || []}
          onTaskReorder={onTaskReorder}
          onTaskMove={onTaskMove}
        />
      </TabsContent>
      <TabsContent value="done" className="space-y-2 mt-2">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div key={task.id} className="text-sm py-1 px-4">
              {task.name}
            </div>
          ))
        ) : (
          <div className="text-base text-content-tertiary py-2 px-4">
            {LABEL.NO_COMPLTED_TASKS}
          </div>
        )}
      </TabsContent>
    </Tabs>
  </div>
);
