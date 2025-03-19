// PriorityTasks.tsx
import React from 'react';
import { PriorityTasksProps } from '@/types/Props';

const PriorityTasks: React.FC<PriorityTasksProps> = ({ tasks }) => {
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High');

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">High Priority Tasks</h3>
      <div className="space-y-2">
        {highPriorityTasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{task.name}</span>
            <span className="text-sm text-red-500">{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityTasks;
