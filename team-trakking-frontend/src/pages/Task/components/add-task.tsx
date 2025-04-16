import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { statusColors, priorityColors } from '@/mock';

// Type definitions for subtask
type Priority = 'low' | 'normal' | 'high' | 'urgent';
type Status = 'todo' | 'in_progress' | 'review' | 'done';

interface Subtask {
  id: string;
  name: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  estimatedTime: number;
}

interface AddSubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubtask: (subtask: any) => void;
  name: string;
  status: Status;
  dueDate: string;
  estimatedTime: string;
  priority: Priority;
  setName: (name: string) => void;
  setStatus: (status: Status) => void;
  setDueDate: (dueDate: string) => void;
  setEstimatedTime: (estimatedTime: string) => void;
  setPriority: (priority: Priority) => void;
}

export const AddTask: React.FC<AddSubtaskModalProps> = ({
  isOpen,
  onClose,
  name,
  status,
  dueDate,
  estimatedTime,
  priority,
  setName,
  setStatus,
  setPriority,
  setDueDate,
  setEstimatedTime,
  onAddSubtask,
}) => {
  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !dueDate || !estimatedTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newSubtask: Subtask = {
      id: uuidv4(),
      name,
      priority,
      status,
      dueDate,
      estimatedTime: parseFloat(estimatedTime),
    };

    onAddSubtask(newSubtask);

    // Reset form
    setName('');
    setPriority('normal');
    setStatus('todo');
    setDueDate('');
    setEstimatedTime('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center bg-opacity-50">
      <div className=" w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Subtask</h2>

        <form onSubmit={onHandleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtask Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subtask name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['urgent', 'high', 'normal', 'low'] as Priority[]).map(
                (priorityValue) => (
                  <label
                    key={priorityValue}
                    className={`
                    flex items-center justify-center py-2 rounded-md cursor-pointer
                    ${priorityColors[priorityValue]} 
                    ${
                      priority === priorityValue
                        ? 'ring-2 ring-offset-2 ring-black ring-opacity-50'
                        : 'opacity-70'
                    }
                  `}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priorityValue}
                      checked={priority === priorityValue}
                      onChange={() => setPriority(priorityValue)}
                      className="hidden"
                    />
                    <span className="text-white capitalize">
                      {priorityValue}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['todo', 'in_progress', 'review', 'done'] as Status[]).map(
                (statusValue) => (
                  <label
                    key={statusValue}
                    className={`
                    flex items-center justify-center py-2 rounded-md cursor-pointer
                    ${statusColors[statusValue]} 
                    ${
                      status === statusValue
                        ? 'ring-2 ring-offset-2 ring-black ring-opacity-50'
                        : 'opacity-70'
                    }
                  `}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={statusValue}
                      checked={status === statusValue}
                      onChange={() => setStatus(statusValue)}
                      className="hidden"
                    />
                    <span className="text-white capitalize">
                      {statusValue.replace('_', ' ')}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="estimatedTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estimated Time (hours)
            </label>
            <input
              id="estimatedTime"
              type="number"
              step="0.5"
              min="0"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter estimated hours"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};
