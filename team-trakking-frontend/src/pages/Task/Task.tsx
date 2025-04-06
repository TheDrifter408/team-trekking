import React, { useState } from 'react';
import {
  mockChecklist,
  mockSubtasks,
  mockUsers,
  priorityColors,
  statusColors,
} from '@/data/mockData.ts';
import {
  Calendar,
  Clock,
  Flag,
  MessageSquare,
  PlayCircle,
  Tags,
  Timer,
  User,
  Plus,
} from 'lucide-react';
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
import { SortableChecklistRow } from '@pages/Task/components/SortableChecklistRow.tsx';
import { SortableTaskRow } from '@pages/Task/components/SortableTaskRow.tsx';
import { AddSubtask } from '@pages/Task/components/AddSubtask.tsx';
import { Subtask } from '@pages/Task/components/Subtask.tsx';
import type { Priority, Status, Task as TaskType } from '../types';
import { formatTime } from '@utils/Common.ts';
import { IconButton } from '@/components';
import { Modal } from '@library/components';
import { v4 as uuidv4 } from 'uuid';

export const Task: React.FC = () => {
  const [selectedSubtasks, setSelectedSubtasks] = useState<Set<string>>(
    new Set()
  );
  const [selectedChecklistItems, setSelectedChecklistItems] = useState<
    Set<string>
  >(new Set());
  const [task, setTask] = useState<TaskType>({
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
  const [name, setName] = useState('');
  const [complete, setIsComplete] = useState(false);
  const [priority, setPriority] = useState<Priority>('normal');
  const [status, setStatus] = useState<Status>('todo');
  const [dueDate, setDueDate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const [isAddChecklist, setIsAddChecklist] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const OnHandleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };

  const OnHandleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTask({ ...task, description: e.target.value });
  };

  const OnHandleStatusChange = (status: Status) => {
    setTask({ ...task, status });
  };

  const OnHandlePriorityChange = (priority: Priority) => {
    setTask({ ...task, priority });
  };

  const OnPressAddSubtask = () => {
    setIsAddTask(true);
  };

  const OnHandleChecklistToggle = (itemId: string) => {
    setTask({
      ...task,
      checklist: task.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  const OnHandleSubtaskDragEnd = (event: DragEndEvent) => {
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

  const OnHandleChecklistDragEnd = (event: DragEndEvent) => {
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

  const OnHandleSelectAllSubtasks = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedSubtasks(new Set(task.subtasks.map((st) => st.id)));
    } else {
      setSelectedSubtasks(new Set());
    }
  };

  const OnHandleSelectAllChecklist = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedChecklistItems(new Set(task.checklist.map((item) => item.id)));
    } else {
      setSelectedChecklistItems(new Set());
    }
  };

  const OnHandleSubtaskSelect = (id: string) => {
    const newSelected = new Set(selectedSubtasks);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubtasks(newSelected);
  };

  const OnHandleChecklistSelect = (id: string) => {
    const newSelected = new Set(selectedChecklistItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedChecklistItems(newSelected);
  };

  const OnAddSubtask = () => {
    // Basic validation
    if (!name || !dueDate || !estimatedTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newSubtask = {
      id: uuidv4(),
      title: name,
      priority,
      status,
      dueDate,
      progress: 0,
      estimatedTime: parseFloat(estimatedTime),
    };

    // Update the task's subtasks
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subtasks, newSubtask],
    }));

    // Reset form fields
    setName('');
    setPriority('normal');
    setStatus('todo');
    setDueDate('');
    setEstimatedTime('');

    // Close the modal
    setIsAddTask(false);
  };
  const OnPressAddChecklist = () => {
    setIsAddChecklist(true);
  };

  const OnAddChecklist = () => {
    const newChecklistItem = {
      id: uuidv4(),
      content: name,
      completed: complete,
    };
    setTask((prevTask) => ({
      ...prevTask,
      checklist: [...prevTask.checklist, newChecklistItem],
    }));
    setIsAddChecklist(false);
  };

  return (
    <div className=" w-full  bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {/* Header */}
        <h1 className={'text-4xl font-bold'}>Task View</h1>
        <div className="flex items-center justify-between mt-4 ">
          <input
            type="text"
            value={task.title}
            onChange={OnHandleTitleChange}
            className="text-xl font-semibold w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
          />
        </div>

        {/* Status and Priority */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                className={`px-3 py-1 rounded-full text-white text-sm flex items-center space-x-1 ${
                  statusColors[task.status]
                }`}
              >
                <span className="capitalize">
                  {task.status.replace('_', ' ')}
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Flag
              className={`w-5 h-5 ${task.priority === 'urgent' ? 'text-red-500' : 'text-gray-500'}`}
            />
            <div className="relative">
              <button
                className={`px-3 py-1 rounded-full text-white text-sm flex items-center space-x-1 ${
                  priorityColors[task.priority]
                }`}
              >
                <span className="capitalize">{task.priority}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Time Tracking and Dates */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Estimated</div>
              <div className="font-medium">
                {formatTime(task.estimatedTime)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Time Spent</div>
              <div className="font-medium">{formatTime(task.timeSpent)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PlayCircle className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Start Date</div>
              <div className="font-medium">
                {new Date(task.startDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Due Date</div>
              <div className="font-medium">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Assignees */}
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-500" />
          <div className="flex -space-x-2">
            {task.assignees.map((assignee) => (
              <img
                key={assignee.id}
                src={assignee.avatar}
                alt={assignee.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={assignee.name}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Description</h3>
          <textarea
            value={task.description}
            onChange={OnHandleDescriptionChange}
            className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a description..."
          />
        </div>

        {/* Subtasks */}
        <Subtask
          task={task}
          handleSelectAllSubtasks={OnHandleSelectAllSubtasks}
          selectedSubtasks={selectedSubtasks}
          handleSubtaskDragEnd={OnHandleSubtaskDragEnd}
          onPressAddSubtask={OnPressAddSubtask}
          sensors={sensors}
          handleSubtaskSelect={OnHandleSubtaskSelect}
        />

        {/* Checklist */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm mt-6">
          <div className="flex justify-content-between">
            <h3 className="text-lg font-medium text-gray-900">Checklist</h3>
            <IconButton
              className={'bg-indigo-600 h-6 w-6 rounded-1 mr-1'}
              onClick={OnPressAddChecklist}
            >
              <Plus color={'white'} size={18} />
            </IconButton>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={OnHandleChecklistDragEnd}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={OnHandleSelectAllChecklist}
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
                        onSelect={() => OnHandleChecklistSelect(item.id)}
                        item={item}
                        onToggle={() => OnHandleChecklistToggle(item.id)}
                      />
                    ))}
                  </SortableContext>
                </tbody>
              </table>
            </DndContext>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-2">
          <Tags className="w-5 h-5 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Comments</h3>
          </div>
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.user.name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Comment
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isAddTask}
        onClose={() => setIsAddTask(false)}
        title={'Add new subtask'}
        rightButtonOnClick={OnAddSubtask}
      >
        <AddSubtask
          onAddSubtask={() => {}}
          isOpen={isAddTask}
          name={name}
          setName={setName}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          estimatedTime={estimatedTime}
          setEstimatedTime={setEstimatedTime}
          status={status}
          setStatus={setStatus}
          onClose={() => setIsAddTask(false)}
        />
      </Modal>
      <Modal
        isOpen={isAddChecklist}
        onClose={() => setIsAddChecklist(false)}
        title={'Add Checklist Item'}
        rightButtonOnClick={OnAddChecklist}
      >
        <div className="flex items-center justify-between p-3  bg-white">
          <div className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={complete}
              onChange={() => setIsComplete(!complete)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <input
              id="checklistItemName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter checklist item description"
              required
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
