import TaskTypeDropdown from '@/components/common/task-type-dropdown';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/components/shadcn-ui/sidebar';
import { cn, handleMutation } from '@/lib/utils/utils';
import {
  createDataTableStore,
  DataTableProvider,
} from '@/stores/zustand/data-table-store';
import {
  IconCalendar,
  IconCheck,
  IconCircleDot,
  IconCircleLetterT,
  IconFlagFilled,
  IconHourglassEmpty,
  IconListCheck,
  IconTagsFilled,
  IconUserFilled,
  IconVectorSpline,
} from '@tabler/icons-react';
import { Link, Navigate } from '@tanstack/react-router';
import { EditorState } from 'lexical';
import {
  ArrowDownUp,
  ChevronDown,
  CornerLeftUp,
  Flower,
  Maximize2,
  PlayCircle,
  PlusIcon,
} from 'lucide-react';
import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { TaskMetaRow } from './task-meta-row';
import { DatePickerWithRange } from '@/components/common/date-picker';
import TagDropdownWithSelection from '@/components/common/tag-dropdown';
import { DocEditor } from './doc-editor';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { DataTable } from '@/components/data-table/data-table';
import TaskCheckList from '@/components/common/task-check-list';
import { LABEL } from '@/lib/constants';
import { TabActionBar } from '@/components/common/table-floating-actoin-bar';
import {
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
} from '@/service/rtkQueries/taskQuery';
import {
  Member,
  Priority,
  Tag,
  Task,
} from '@/types/request-response/workspace/ApiResponse';
import { Icon } from '@/assets/icon-path';
import TimeEstimateDropdown from '@/components/common/estimate-time-dropdown';
import { TaskSkeleton } from './loading';
import { Task } from '@/types/request-response/task/ApiResponse.ts';
import { DateRange } from 'react-day-picker';
import Cookies from 'js-cookie';
import { Sheet, SheetContent } from '@/components/shadcn-ui/sheet';
import { TaskList } from '@/components/layout/task-leftsidebar';
import { TaskSidebar } from '@/components/layout/task-sidebar';
import { PageHeader } from './page-header';
import { socket } from '@/lib/constants';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useDebounceCallback } from '@/lib/hooks/use-debounceCallback';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store';
import { TaskPrioritySelect } from './task-priority-select';
import TaskStatusDialog from '@/components/common/task-status-dialog';
import TaskAssignee from '@/components/common/task-assignee.tsx';
import { StatusItem } from '@/types/request-response/list/ApiResponse';

const availableTags: Tag[] = [
  { id: 0, name: 'initiative', isActive: true },
  { id: 1, name: 'backend', isActive: true },
  { id: 2, name: 'common docs', isActive: true },
  { id: 3, name: 'complex', isActive: true },
  { id: 4, name: 'fail1', isActive: true },
  { id: 5, name: 'fail2', isActive: true },
  { id: 6, name: 'fail3', isActive: true },
  { id: 7, name: 'frontend', isActive: true },
  { id: 8, name: 'ini', isActive: true },
];

interface TaskDialogProps {
  taskId: string;
}

export const TaskDialog: FC<TaskDialogProps> = ({ taskId }) => {
  const { workspaceGlobal } = useWorkspaceStore();
  const priority = workspaceGlobal?.priority ?? [];
  // Hover states
  const [enterDates, setEnterDates] = useState<boolean>(false);
  const [enterAssignee, setEnterAssignee] = useState<boolean>(false);
  const [enterPriority, setEnterPriority] = useState<boolean>(false);
  const [enterEstimatedTime, setEnterEstimatedTime] = useState<boolean>(false);
  const [enterTrackTime, setEnterTrackTime] = useState<boolean>(false);
  const [enterTags, setEnterTags] = useState<boolean>(false);

  // Task states
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<StatusItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<Member[]>([]);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [taskPriority, setTaskPriority] = useState<Priority | null>(null);

  const store = createDataTableStore({});
  const { open: isSidebarOpen } = useSidebar();

  const [getTaskData, { data: taskData, isFetching }] = useLazyGetTaskQuery();
  const [updateTask] = useUpdateTaskMutation();

  // get the data for the tags
  const { data: tagData } = useGetListTagsQuery(taskData?.list.id, {
    skip: !taskData?.list.id,
  });

  // States and properties for the left sidebar of task dialog
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const defaultOpenRight = Cookies.get('right-sidebar:state') !== 'false';
  // Sidebar properties
  const sidebarStyle = {
    '--sidebar-width': '480px',
  } as CSSProperties & { [key: string]: string };
  // Sidebar onClick toggling
  const onToggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    Navigate({ to: '/home' });
  };

  const formatTrackTime = (time: string) => {
    const hourMatch = time.match(/(\d+)\s*hour/);
    const minuteMatch = time.match(/(\d+)\s*minute/);
    const hours = hourMatch ? `${hourMatch[1]}h` : '';
    const minutes = minuteMatch ? `${minuteMatch[1]}m` : '';
    return [hours, minutes].filter(Boolean).join(' ');
  };

  const onPressAddChecklist = () => {
    // setIsAddChecklist(true);
  };

  const onPriorityChange = (id: string) => {
    const found = priority.find((p) => p.id.toString() === id);
    if (found) {
      setTaskPriority(found);
    }
  };

  const onPriorityRemove = () => {
    setTaskPriority(null);
  };

  const onChangeDescription = useDebounceCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        setDescription(markdown);
      });
    },
    500 // update after a 500ms delay
  );

  const onHandleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const onHandleTaskNameBlur = async () => {
    if (taskName !== taskData?.name && taskName?.trim() !== '') {
      try {
        await handleMutation(updateTask, {
          id: Number(taskId),
          name: taskName,
        });
      } catch (error) {
        console.error('Failed to update task name:', error);
        setTaskName(taskData?.name || '');
      }
    }
  };

  const onHandleUpdateTask = async (updates: Partial<any>) => {
    try {
      const { data } = await handleMutation<Task>(updateTask, {
        id: Number(taskId),
        ...updates,
      });
      if (data) {
        setEstimatedTime(data?.timeEstimate?.toString() ?? '');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const onHandleDateRangeChange = async (
    newDateRange: DateRange | undefined
  ) => {
    setDateRange(newDateRange);

    if (newDateRange?.from && newDateRange?.to) {
      try {
        // Format dates to match your API format: "2024-07-01T00:00:00Z"
        const startDate = new Date(newDateRange.from);
        const dueDate = new Date(newDateRange.to);

        // Set time to start of day for startDate and end of day for dueDate
        startDate.setHours(0, 0, 0, 0);
        dueDate.setHours(23, 59, 59, 999);

        const updates = {
          startDate: startDate.toISOString(),
          dueDate: dueDate.toISOString(),
        };

        await handleMutation(updateTask, {
          id: Number(taskId),
          ...updates,
        });
      } catch (error) {
        console.error('Failed to update task dates:', error);
        // Revert to previous state on error
        if (taskData?.startDate && taskData?.dueDate) {
          setDateRange({
            from: new Date(taskData.startDate),
            to: new Date(taskData.dueDate),
          });
        }
      }
    } else if (newDateRange?.from && !newDateRange?.to) {
      // Handle single date selection (only start date)
      try {
        const startDate = new Date(newDateRange.from);
        startDate.setHours(0, 0, 0, 0);

        const updates = {
          startDate: startDate.toISOString(),
          dueDate: null, // Clear due date if only start date is selected
        };

        await handleMutation(updateTask, {
          id: Number(taskId),
          ...updates,
        });
      } catch (error) {
        console.error('Failed to update task start date:', error);
      }
    }
  };

  // useEffect to handle web socket operations and its side effects
  useEffect(() => {
    const room = 'task123';
    // Join the room
    socket.emit('join_room', { room });
    // Listen to real-time updates
    socket.on(room, (socketData) => {
      const { name, startDate, dueDate, description } = socketData.data;
      setTaskName(name);
      setDateRange({
        from: new Date(startDate),
        to: new Date(dueDate),
      });
      setDescription(description);
    });

    // Cleanup
    return () => {
      socket.emit('leave_room', { room });
      socket.off(room);
    };
  }, []);

  useEffect(() => {
    getTaskData(Number(taskId));
  }, [taskId]);

  useEffect(() => {
    if (taskData) {
      setTaskName(taskData.name || '');
      setDescription(taskData.description || '');
      setStatus(taskData.statusItem);
      setSelectedTags(taskData.tags || []);
      setSelectedAssignees(taskData?.assignees || []);
      setEstimatedTime(taskData?.timeEstimate?.toString() || '');
      setTaskPriority(taskData.priority);
      // Set date range from task data
      if (taskData.startDate || taskData.dueDate) {
        setDateRange({
          from: taskData.startDate ? new Date(taskData.startDate) : undefined,
          to: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
        });
      }
    }
  }, [taskData]);

  if (isFetching || !taskData) {
    return <TaskSkeleton />;
  }

  return (
    <SidebarProvider
      defaultOpen={defaultOpenRight}
      style={sidebarStyle}
      className="flex flex-col h-full"
    >
      <PageHeader onToggleSidebarOpen={onToggleLeftSidebar} />
      <SidebarInset className="flex-1 overflow-auto">
        <Sheet open={isLeftSidebarOpen} onOpenChange={onToggleLeftSidebar}>
          <SheetContent
            side="left"
            hasCloseIcon={false}
            className="ring-0 outline-0 !gap-0 bg-gray-100 border-r shadow-lg top-[96px] overflow-y-scroll h-[calc(100%-98px)] no-scrollbar"
            overlay={false}
          >
            <div className="h-[60px] gap-2 font-medium sticky bg-white flex items-center px-3 shadow-sm">
              <Icon
                name={'subtask'}
                className={'text-content-default size-4'}
              />
              {LABEL.SUBTASK}
            </div>
            <TaskList task={taskData} />
          </SheetContent>
        </Sheet>
      </SidebarInset>
      <DataTableProvider value={store}>
        <div className="flex overflow-hidden">
          <div className={'sm:w-[90%] lg:w-[50%] mx-auto my-10 items-center'}>
            <div className="space-y-4">
              {/* Show the parent task title if this is a subtask */}
              {taskData && taskData.parentTask && (
                <div className="flex items-center gap-1 hover:bg-accent w-fit rounded-xl py-[2px]">
                  <CornerLeftUp
                    className="text-muted-foreground mb-1"
                    size={14}
                  />
                  <Link
                    to="/task/$taskId"
                    params={{ taskId: taskData.parentTask.id.toString() }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {taskData.parentTask.name}
                  </Link>
                </div>
              )}
              {/* Component to display Task Type | Task ID */}
              <div className="flex items-center border border-accent rounded-lg w-min text-muted-foreground">
                <div className="flex items-center px-1 border-r border-accent">
                  <IconCircleLetterT className="rounded-lg" size={16} />
                  <span className="px-2 capitalize">
                    {taskData?.type.singularName ?? ''}
                  </span>
                  <div>
                    <TaskTypeDropdown>
                      <Button
                        variant="ghost"
                        size="icon_sm"
                        className="h-6 w-6 hover:bg-transparent"
                      >
                        <ChevronDown />
                      </Button>
                    </TaskTypeDropdown>
                  </div>
                </div>
                <div>
                  <span className="px-2">{taskData.id}</span>
                </div>
              </div>
              {/* HEADER => TITLE */}
              <div className="flex items-center gap-2">
                {taskData && taskData.parentTask && (
                  <IconVectorSpline className="text-black" size={16} />
                )}
                <Input
                  type="text"
                  value={taskName}
                  onChange={onHandleTaskNameChange}
                  onBlur={onHandleTaskNameBlur}
                  className="!text-3xl w-full !font-bold !h-fit tracking-tight bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                />
              </div>
              <div
                className={cn(
                  'grid sm:grid-cols-1',
                  isSidebarOpen ? '2xl:grid-cols-2' : 'xl:grid-cols-2'
                )}
              >
                {/* Column one contains Status, Dates, Time Estimates, Track Time, Relationships */}
                <div className="space-y-4">
                  {/* Column 1 */}
                  {/* STATUSES */}
                  <TaskMetaRow
                    icon={
                      <IconCircleDot
                        className="text-base font-semibold"
                        size={15}
                      />
                    }
                    label="Status"
                  >
                    <TaskStatusDialog
                      listId={taskData.list.id}
                      status={status}
                      setStatus={(status) => {
                        setStatus(status);
                        onHandleUpdateTask({ statusItemId: status.id });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'h-6 px-2 rounded-[6px] border',
                        `hover:${status?.color}`
                      )}
                    >
                      <IconCheck size={15} />
                    </Button>
                  </TaskMetaRow>
                  {/* START AND END DATES */}
                  <TaskMetaRow
                    icon={
                      <IconCalendar
                        className="text-base font-semibold"
                        size={15}
                      />
                    }
                    label="Dates"
                    hover={enterDates}
                    onHoverChange={setEnterDates}
                  >
                    <DatePickerWithRange
                      value={dateRange}
                      onChange={onHandleDateRangeChange}
                      placeholder="Set dates"
                    />
                  </TaskMetaRow>
                  {/* TIME ESTIMATE */}
                  <TaskMetaRow
                    icon={
                      <IconHourglassEmpty
                        className={'text-base font-semibold'}
                        size={15}
                      />
                    }
                    label={'Time Estimate'}
                    hover={enterEstimatedTime}
                    onHoverChange={setEnterEstimatedTime}
                  >
                    <div className="flex -space-x-2 ">
                      <TimeEstimateDropdown
                        time={estimatedTime}
                        onTimeEstimateChange={(minutes) => {
                          onHandleUpdateTask({ timeEstimate: minutes });
                        }}
                      >
                        <span className="text-sm cursor-pointer hover:text-foreground">
                          {estimatedTime ?? LABEL.EMPTY}
                        </span>
                      </TimeEstimateDropdown>
                    </div>
                  </TaskMetaRow>
                  {/* TRACK TIME */}
                  <TaskMetaRow
                    icon={
                      <IconHourglassEmpty
                        className={'text-base font-semibold'}
                        size={15}
                      />
                    }
                    label={'Time Track'}
                    hover={enterTrackTime}
                    onHoverChange={setEnterTrackTime}
                  >
                    {taskData && !taskData.timeTracked ? (
                      <span className="text-base flex gap-2 items-center font-medium text-content-tertiary">
                        <PlayCircle size={15} /> {LABEL.ADD_TIME}
                      </span>
                    ) : (
                      <span className="text-base font-regular">
                        {formatTrackTime(String(taskData?.timeTracked))}
                      </span>
                    )}
                  </TaskMetaRow>
                </div>
                <div className="space-y-1">
                  {/* Column 2 */}
                  {/* ASSIGNEES */}
                  <TaskMetaRow
                    icon={
                      <IconUserFilled
                        className="text-base font-semibold"
                        size={15}
                      />
                    }
                    label="Assignees"
                    hover={enterAssignee}
                    onHoverChange={setEnterAssignee}
                  >
                    <TaskAssignee
                      taskId={taskId}
                      selectedAssignee={selectedAssignees || []}
                    />
                  </TaskMetaRow>
                  {/* PRIORITY */}
                  <TaskMetaRow
                    icon={
                      <IconFlagFilled
                        className="text-base font-semibold"
                        size={15}
                      />
                    }
                    label="Priority"
                    hover={enterPriority}
                    onHoverChange={setEnterPriority}
                    onRemove={onPriorityRemove}
                  >
                    <TaskPrioritySelect
                      selectedValue={taskPriority}
                      onSelectChange={(id) => {
                        onPriorityChange(id);
                        onHandleUpdateTask({ priorityId: Number(id) });
                      }}
                      priorities={priority}
                    />
                  </TaskMetaRow>
                  {/* TAGS */}
                  <TaskMetaRow
                    icon={
                      <IconTagsFilled
                        className={'text-base font-semibold'}
                        size={15}
                      />
                    }
                    label={'Tags'}
                    hover={enterTags}
                    onHoverChange={setEnterTags}
                  >
                    <TagDropdownWithSelection
                      availableTags={availableTags}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                    />
                  </TaskMetaRow>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="space-y-2">
                <DocEditor
                  placeholder={"Start writing or type '/' for commands"}
                  value={description}
                  name={'task Description'}
                  onChange={onChangeDescription}
                  setIsEditing={() => {}}
                  onBlur={() => {
                    onHandleUpdateTask({ description: description });
                  }}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex space-x-3">
                <Button className="h-6 w-12" variant="outline">
                  <IconVectorSpline
                    className="text-muted-foreground"
                    size={14}
                  />
                  3
                </Button>
                <Button className="h-6 w-12" variant="outline">
                  <IconListCheck className="text-muted-foreground" size={14} />3
                </Button>
              </div>
              <div className="flex gap-2 bg-gray-200 px-2 py-1 items-center rounded-full whitespace-nowrap">
                <Avatar className="h-6 w-6 border border-secondary rounded-full shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-[10px]">CN</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">3 For me</span>
              </div>
            </div>
            {/* Subtask table container */}
            <div className="mt-4">
              <div className="group flex justify-between py-2 px-2">
                <h3 className="text-xl font-bold text-gray-900">Subtasks</h3>
                <div className="invisible group-hover:visible flex items-center gap-1">
                  <Button
                    variant={'ghost'}
                    className="bg-transparent text-lg text-muted-foreground"
                    onClick={onPressAddChecklist}
                  >
                    <ArrowDownUp size={18} />
                    {LABEL.SORT}
                  </Button>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        className="bg-transparent text-lg text-muted-foreground "
                      >
                        <Maximize2 size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{LABEL.FULL_SCREEN}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        className={
                          'bg-transparent text-lg text-muted-foreground'
                        }
                      >
                        <Flower size={18} />
                        {LABEL.SUGGEST_SUBTASKS}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Generate subtasks based on the comments, title and
                      checklists of this task
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              {/* Subtask data grid table */}
              <DataTableProvider value={store}>
                <DataTable />
              </DataTableProvider>
            </div>
            {/* Checklist table container */}
            <div className="group mt-4">
              <TaskCheckList />
            </div>
            {/* Attachments Container */}
            <div className="mt-4">
              <div className="group flex justify-between py-2 px-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {LABEL.ATTACHMENTS}
                </h3>
                <div className="invisible group-hover:visible flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        className="bg-transparent text-lg text-muted-foreground"
                      >
                        <PlusIcon size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{LABEL.ATTACHMENTS}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              {/* Attachments grid */}
            </div>
          </div>
          <TaskSidebar />
        </div>

        <div className="w-full px-[10px] flex items-center sticky bottom-0">
          <TabActionBar />
        </div>
      </DataTableProvider>
    </SidebarProvider>
  );
};
