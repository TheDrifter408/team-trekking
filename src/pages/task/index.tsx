import React, { useState } from 'react';
import { mockChecklist, mockSubtasks, mockUsers, sampleTask } from '@/mock';
import { cn } from '@/lib/utils';
import { ChevronDown, PlayCircle, Plus } from 'lucide-react';
import {
  IconCalendar,
  IconCheck,
  IconCircleDot,
  IconFlagFilled,
  IconHourglassEmpty,
  IconListCheck,
  IconTag,
  IconTagsFilled,
  IconUserFilled,
  IconVectorSpline,
  IconX,
} from '@tabler/icons-react';
import { DatePickerWithRange } from '@/components/date-picker.tsx';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SortableChecklistRow } from '@/pages/task/components/sortable-checklist-row.tsx';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TaskMetaRow } from './components/task-meta-row';
import { Input } from '@/components/ui/input.tsx';
import { AssigneeAvatar } from '@/components/assignee-avatar.tsx';
import { DocEditor } from './components/doc-editor.tsx';
import { Subtask } from '@/pages/task/components/Subtask.tsx';

export const Task: React.FC = () => {
  const [enterStatus, setEnterStatus] = useState<boolean>(false);
  const [enterDates, setEnterDates] = useState<boolean>(false);
  const [enterAssignee, setEnterAssignee] = useState<boolean>(false);
  const [enterPriority, setEnterPriority] = useState<boolean>(false);
  const [enterEstimatedTime, setEnterEstimatedTime] = useState<boolean>(false);
  const [enterTrackTime, setEnterTrackTime] = useState<boolean>(false);
  const [enterTags, setEnterTags] = useState<boolean>(false);
  const [description, setDescription] = useState(sampleTask.description);

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

  const [selectedSubtasks, setSelectedSubtasks] = useState<Set<string>>(
    new Set()
  );
  const [selectedChecklistItems, setSelectedChecklistItems] = useState<
    Set<string>
  >(new Set());
  const [task, setTask] = useState({
    id: '1',
    title: 'Implement new feature',
    description:
      'Create a new component for the dashboard that displays user statistics',
    status: 'in_progress',
    priority: 'high',
    assignees: mockUsers,
    startDate: '2024-03-15T10:00:00.000Z',
    dueDate: '2024-03-20T15:00:00.000Z',
    estimatedTime: 16,
    timeSpent: 6.5,
    comments: [
      {
        id: '1',
        user: mockUsers[0],
        content: 'Started working on this. Will update soon.',
        createdAt: '2024-03-15T10:00:00.000Z',
      },
    ],
    tags: ['frontend', 'feature'],
    subtasks: mockSubtasks,
    checklist: mockChecklist,
  });

  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const [isAddChecklist, setIsAddChecklist] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onPressAddSubtask = () => {
    setIsAddTask(true);
  };

  const handleChecklistToggle = (itemId: string) => {
    setTask({
      ...task,
      checklist: task.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  const handleSubtaskDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTask((task) => {
        const oldIndex = task.subtasks.findIndex((t) => t.id === active.id);
        const newIndex = task.subtasks.findIndex((t) => t.id === over.id);
        return {
          ...task,
          subtasks: arrayMove(task.subtasks, oldIndex, newIndex),
        };
      });
    }
  };

  const handleChecklistDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTask((task) => {
        const oldIndex = task.checklist.findIndex((t) => t.id === active.id);
        const newIndex = task.checklist.findIndex((t) => t.id === over.id);
        return {
          ...task,
          checklist: arrayMove(task.checklist, oldIndex, newIndex),
        };
      });
    }
  };

  const handleSelectAllSubtasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSubtasks(new Set(task.subtasks.map((st) => st.id)));
    } else {
      setSelectedSubtasks(new Set());
    }
  };

  const handleSelectAllChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedChecklistItems(new Set(task.checklist.map((item) => item.id)));
    } else {
      setSelectedChecklistItems(new Set());
    }
  };

  const handleSubtaskSelect = (id: string) => {
    const newSelected = new Set(selectedSubtasks);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubtasks(newSelected);
  };

  const handleChecklistSelect = (id: string) => {
    const newSelected = new Set(selectedChecklistItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedChecklistItems(newSelected);
  };

  const onPressAddChecklist = () => {
    setIsAddChecklist(true);
  };

  return (
    <div className={' md:px-6 items-center'}>
      <div className="space-y-0 mt-4">
        {/* HEADER => TITLE */}
        <div className="mb-4">
          <Input
            type="text"
            value={sampleTask.name}
            className="!text-2xl w-full !font-semibold tracking-tight bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          />
        </div>
        {/* STATUSES */}
        <TaskMetaRow
          icon={<IconCircleDot className="text-base font-semibold" size={15} />}
          label="Status"
          hover={enterStatus}
          onHoverChange={setEnterStatus}
        >
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'rounded-r-none text-white h-6 px-3 text-xs tracking-wide font-bold',
              sampleTask.status.color,
              `hover:${sampleTask.status.color}`
            )}
          >
            {sampleTask.status.name.toUpperCase()}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-6 px-2 rounded-l-none border border-l-0',
              `hover:${sampleTask.status.color}`
            )}
          >
            <IconCheck size={15} />
          </Button>
        </TaskMetaRow>
        {/* START AND END DATES */}
        <TaskMetaRow
          icon={<IconCalendar className="text-base font-semibold" size={15} />}
          label="Dates"
          hover={enterDates}
          onHoverChange={setEnterDates}
        >
          <DatePickerWithRange />
        </TaskMetaRow>
        {/* ASSIGNEES */}
        <TaskMetaRow
          icon={
            <IconUserFilled className="text-base font-semibold" size={15} />
          }
          label="Assignees"
          hover={enterAssignee}
          onHoverChange={setEnterAssignee}
        >
          <div className="flex -space-x-2">
            {sampleTask.assignees.map((assignee) => (
              <AssigneeAvatar
                key={assignee}
                assignee={assignee}
                enterAssignee={enterAssignee}
                onRemove={() => {}}
              />
            ))}
          </div>
        </TaskMetaRow>
        {/* PRIORITY */}
        <TaskMetaRow
          icon={
            <IconFlagFilled className="text-base font-semibold" size={15} />
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
          {sampleTask.estimatedTime === '' ? (
            <span className="text-base text-muted-foreground font-medium">
              Empty
            </span>
          ) : (
            <span className="text-base font-regular">
              {sampleTask.estimatedTime}h
            </span>
          )}
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
        {/* TAGS */}
        <TaskMetaRow
          icon={
            <IconTagsFilled className={'text-base font-semibold'} size={15} />
          }
          label={'Tags'}
          hover={enterTags}
          onHoverChange={setEnterTags}
        >
          {sampleTask.tags && sampleTask.tags.length > 0 ? (
            sampleTask.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 group relative pr-6"
              >
                <IconTag size={12} />
                {tag}
                {enterTags && (
                  <button
                    onClick={() => console.log('Remove tag:', tag)}
                    className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
                  >
                    <IconX size={10} />
                  </button>
                )}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-gray-400">No tags</span>
          )}
        </TaskMetaRow>
      </div>
      <div className="mt-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <DocEditor
            placeholder={"Start writing or type '/' for commands"}
            value={description}
            name={'task Description'}
            onChange={(e) => setDescription(e.target.value)}
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
      <div className="mt-4">
        <Subtask
          task={task}
          handleSelectAllSubtasks={handleSelectAllSubtasks}
          selectedSubtasks={selectedSubtasks}
          handleSubtaskDragEnd={handleSubtaskDragEnd}
          onPressAddSubtask={onPressAddSubtask}
          sensors={sensors}
          handleSubtaskSelect={handleSubtaskSelect}
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between py-2 px-2">
          <h3 className="text-lg font-medium text-gray-900">Checklist</h3>
          <Button
            size={'icon'}
            className={'bg-indigo-600 h-6 w-6 rounded-1 mr-1'}
            onClick={onPressAddChecklist}
          >
            <Plus color={'white'} size={18} />
          </Button>
        </div>

        <div className="mt-2  rounded-lg shadow overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleChecklistDragEnd}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllChecklist}
                      checked={
                        selectedChecklistItems.size === task.checklist.length
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <SortableContext
                  items={task.checklist.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {task.checklist.map((item) => (
                    <SortableChecklistRow
                      key={item.id}
                      id={item.id}
                      selected={selectedChecklistItems.has(item.id)}
                      onSelect={() => handleChecklistSelect(item.id)}
                      item={item}
                      onToggle={() => handleChecklistToggle(item.id)}
                    />
                  ))}
                </SortableContext>
              </tbody>
            </table>
          </DndContext>
        </div>
      </div>

      <div className="mb-[60px]"></div>
    </div>
  );
};
