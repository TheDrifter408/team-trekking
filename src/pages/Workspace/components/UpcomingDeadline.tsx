// UpcomingDeadline.tsx
import React from 'react';
import { UpcomingDeadlineProps } from '@/types/Props';

const UpcomingDeadline: React.FC<UpcomingDeadlineProps> = ({ tasks }) => {
  // Filter tasks that are still ongoing and have a valid end date
  const upcomingTasks = tasks.filter((task) => task.endDate > new Date());

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Deadlines</h3>
      <div className="space-y-2">
        {upcomingTasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{task.name}</span>
            <span className="text-sm text-gray-500">{task.endDate.toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadline;
