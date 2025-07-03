import { FC, useState } from 'react';
import { sampleTask } from '@/mock';
import { cn } from '@/lib/utils/utils.ts';
import {
  ArrowDownUp,
  ChevronDown,
  CornerLeftUp,
  Flower,
  Maximize2,
  PlayCircle,
  PlusIcon,
} from 'lucide-react';
import {
  IconCalendar,
  IconCircleLetterT,
  IconFlagFilled,
  IconHourglassEmpty,
  IconListCheck,
  IconTagsFilled,
  IconUserFilled,
  IconVectorSpline,
} from '@tabler/icons-react';
import { DatePickerWithRange } from '@/components/common/date-picker.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';
import { Button } from '@/components/shadcn-ui/button';
import { TaskMetaRow } from './components/task-meta-row';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { DocEditor } from './components/doc-editor.tsx';
import TimeEstimateDropDown from '@/components/common/estimate-time-dropdown.tsx';
import { Link } from 'react-router-dom';
import { Assignee } from '@/types/props/Common.ts';
import { TagOption } from '@/types/interfaces/TagDropDown.ts';
import TagDropdownWithSelection from '@/components/common/tag-dropdown.tsx';
import TaskTypeDropdown from '@/components/common/task-type-dropdown.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import {
  createDataTableStore,
  DataTableProvider,
} from '@/stores/zustand/data-table-store.ts';
import { LABEL } from '@/lib/constants/appStrings.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip.tsx';
import { useSidebar } from '@/components/shadcn-ui/sidebar.tsx';
import { $getRoot, EditorState } from 'lexical';
import { TabActionBar } from '@/components/common/table-floating-actoin-bar.tsx';
import TaskCheckList from '@/components/common/task-check-list.tsx';

export const Task: FC = () => {
  const [enterDates, setEnterDates] = useState<boolean>(false);
  const [enterAssignee, setEnterAssignee] = useState<boolean>(false);
  const [enterPriority, setEnterPriority] = useState<boolean>(false);
  const [enterEstimatedTime, setEnterEstimatedTime] = useState<boolean>(false);
  const [enterTrackTime, setEnterTrackTime] = useState<boolean>(false);
  const [enterTags, setEnterTags] = useState<boolean>(false);
  const [description] = useState(sampleTask.description);
  const [selectedTags, setSelectedTags] = useState<string[]>(['backend']);

  const { open: isSidebarOpen } = useSidebar();

  const availableTags: TagOption[] = [
    { id: 'initiative', label: 'initiative' },
    { id: 'backend', label: 'backend' },
    { id: 'common-docs', label: 'common docs' },
    { id: 'complex', label: 'complex' },
    { id: 'fail1', label: 'fail1' },
    { id: 'fail2', label: 'fail2' },
    { id: 'fail3', label: 'fail3' },
    { id: 'frontend', label: 'frontend' },
    { id: 'ini', label: 'ini' },
  ];

  const priorityFlags: Record<string, string> = {
    low: 'rgb(29, 78, 216)', // blue-700
    mid: 'rgb(252, 231, 53)', // yellow-700
    high: 'rgb(185, 28, 28)', // red-700
    none: '',
  };

  const formatTrackTime = (time: string) => {
    const hourMatch = time.match(/(\d+)\s*hour/);
    const minuteMatch = time.match(/(\d+)\s*minute/);
    const hours = hourMatch ? `${hourMatch[1]}h` : '';
    const minutes = minuteMatch ? `${minuteMatch[1]}m` : '';
    return [hours, minutes].filter(Boolean).join(' ');
  };

  /*const [task, setTask] = useState<TaskType>({
    id: '1',
    name: 'Implement new feature',
    description:
      'Create a new component for the dashboard that displays user statistics',
    status: {
      id: 0,
      name: 'In Progress',
      color: 'bg-green-500',
      category: 'development',
    },
    progress: 50,
    priority: 'high',
    assignees: mockUsers,
    startDate: '2024-03-15T10:00:00.000Z',
    dueDate: '2024-03-20T15:00:00.000Z',
    estimatedTime: '16',
    spendTime: '6.5',
    comments: [
      {
        id: '1',
        user: mockUsers[0],
        content: 'Started working on this. Will update soon.',
        createdAt: '2024-03-15T10:00:00.000Z',
      },
    ],
    tags: [
      { id: 0, name: 'frontend', color: '' },
      { id: 1, name: 'feature', color: '' },
    ],
    subTask: mockSubtasks,
    checklist: mockChecklist,
  });
*/
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>([]);

  const store = createDataTableStore({});

  const onPressAddChecklist = () => {
    // setIsAddChecklist(true);
  };

  const onChangeDescription = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
    });
  };

  return (
    <DataTableProvider value={store}>
      <div
        className={'2xl:w-3/4 xl:w-[80%] sm:w-[95%] mx-auto my-10 items-center'}
      >
        <div className="space-y-4">
          {/* Show the parent task title if this is a subtask */}
          {sampleTask.parentTask && (
            <div className="flex items-center gap-1 hover:bg-accent w-fit rounded-xl px-2 py-[2px]">
              <CornerLeftUp className="text-muted-foreground" size={14} />
              <Link to="" className="text-muted-foreground">
                {sampleTask.parentTask.name}
              </Link>
            </div>
          )}
          {/* Component to display Task Type | Task ID */}
          <div className="flex items-center border border-accent rounded-lg w-min text-muted-foreground">
            <div className="flex items-center px-1 border-r border-accent">
              <IconCircleLetterT className="rounded-lg" size={16} />
              <span className="px-2 capitalize">{sampleTask.type}</span>
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
              <span className="px-2">{sampleTask.id}</span>
            </div>
          </div>
          {/* HEADER => TITLE */}
          <div className="mb-4 flex items-center gap-2">
            <IconVectorSpline className="text-black" size={16} />
            <Input
              type="text"
              value={sampleTask.name}
              className="!text-3xl w-full !font-bold tracking-tight bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            />
          </div>
          <div
            className={cn(
              'grid sm:grid-cols-1',
              isSidebarOpen ? '2xl:grid-cols-2' : 'xl:grid-cols-2'
            )}
          >
            {/* Column one contains Status, Dates, Time Estimates, Track Time, Relationships */}
            <div className="space-y-1">
              {/* Column 1 */}
              {/* STATUSES */}
              {/* <TaskMetaRow
                icon={
                  <IconCircleDot
                    className="text-base font-semibold"
                    size={15}
                  />
                }
                label="Status"
              >
                <TaskStatusDialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'rounded text-white hover:text-white h-6 px-2 text-xs tracking-wide font-bold flex items-center',
                      sampleTask.status.color,
                      `hover:${sampleTask.status.color}`
                    )}
                  >
                    {sampleTask.status.name.toUpperCase()}
                    <span className="ml-2 pl-2 border-l border-white/40 flex items-center">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Button>
                </TaskStatusDialog>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-6 px-2 rounded-[6px] border',
                    `hover:${sampleTask.status.color}`
                  )}
                >
                  <IconCheck size={15} />
                </Button>
              </TaskMetaRow>*/}
              {/* START AND END DATES */}
              <TaskMetaRow
                icon={
                  <IconCalendar className="text-base font-semibold" size={15} />
                }
                label="Dates"
                hover={enterDates}
                onHoverChange={setEnterDates}
              >
                <DatePickerWithRange />
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
                  <TimeEstimateDropDown
                    children={<span cl-assName="text-sm">Empty</span>}
                  />
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
                {sampleTask.trackTime === '' ? (
                  <span className="text-base flex gap-2 items-center font-medium text-muted-foreground">
                    <PlayCircle size={15} /> Add Time
                  </span>
                ) : (
                  <span className="text-base font-regular">
                    {formatTrackTime(sampleTask.trackTime)}
                  </span>
                )}
              </TaskMetaRow>
            </div>
            <div className="space-y-1">
              {' '}
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
                {/*<SelectUsers
                  value={selectedAssignees}
                  displayName={true}
                  onRemove={() => {}}
                  multipleSelect={true}
                  onChange={(assignees) => setSelectedAssignees(assignees)}
                  users={task.assignees!}
                  placeholder="No Assignees"
                  userListTitle="Select an Assignee"
                />*/}
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
              >
                <div className="flex -space-x-2">
                  {sampleTask.priority.length > 0 ? (
                    <div className="flex gap-2">
                      <IconFlagFilled
                        size={19}
                        color={priorityFlags[sampleTask.priority]}
                      />
                      <span className="text-sm">
                        {sampleTask.priority.toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Empty</span>
                  )}
                </div>
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
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex space-x-3">
            <Button className="h-6 w-12" variant="outline">
              <IconVectorSpline className="text-muted-foreground" size={14} />3
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
                    className={'bg-transparent text-lg text-muted-foreground'}
                  >
                    <Flower size={18} />
                    {LABEL.SUGGEST_SUBTASKS}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Generate subtasks based on the comments, title and checklists
                  of this task
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
      <div className="w-full px-[10px] flex items-center sticky bottom-0">
        <TabActionBar />
      </div>
    </DataTableProvider>
  );
};
export default Task;
