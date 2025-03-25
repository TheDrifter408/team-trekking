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
  CheckSquare,
  Clock,
  Flag,
  MessageSquare,
  PlayCircle,
  Tags,
  Timer,
  User,
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
import type { Priority, Status, Task as TaskType } from '../types';
import { formatTime } from '@utils/Common.ts';

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleStatusChange = (status: Status) => {
    setTask({ ...task, status });
  };

  const handlePriorityChange = (priority: Priority) => {
    setTask({ ...task, priority });
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

  return (
    <div className=" w-full  bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {/* Header */}
        <h1 className={'text-4xl font-bold'}>Task View</h1>
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            value={task.title}
            onChange={handleTitleChange}
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
            onChange={handleDescriptionChange}
            className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a description..."
          />
        </div>

        {/* Subtasks */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Subtasks</h3>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSubtaskDragEnd}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky left-0 bg-gray-50 px-6 py-3 text-left z-10 border-r">
                      <input
                        type="checkbox"
                        onChange={handleSelectAllSubtasks}
                        checked={selectedSubtasks.size === task.subtasks.length}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="sticky left-[68px] bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider z-10 border-r">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Est. Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <SortableContext
                    items={task.subtasks.map((st) => st.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {task.subtasks.map((subtask) => (
                      <SortableTaskRow
                        key={subtask.id}
                        id={subtask.id}
                        selected={selectedSubtasks.has(subtask.id)}
                        onSelect={() => handleSubtaskSelect(subtask.id)}
                        subtask={subtask}
                      />
                    ))}
                  </SortableContext>
                </tbody>
              </table>
            </DndContext>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Checklist</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
    </div>
  );
};
