import { Task } from '@/types/ApiResponse';
import { FC } from 'react';

const TaskTable:FC<{ tasks: Task[] | undefined }> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Task Name</th>
            <th className="p-3 text-left">List</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Assignees</th>
            <th className="p-3 text-left">Progress</th>
            <th className="p-3 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
          { tasks !== undefined ? tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{task.name}</td>
              <td className="p-3 font-medium">{task.name}</td>
              <td className="p-3">{task.statusId}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.priorityType === 'high'
                      ? 'bg-red-200 text-red-700'
                      : task.priorityType === 'medium'
                      ? 'bg-yellow-200 text-yellow-700'
                      : 'bg-green-200 text-green-700'
                  }`}
                >
                  {task.priorityType}
                </span>
              </td>
              <td className="p-3">
                {task.assignees?.map((assignee) => (
                  <span key={assignee.id} className="inline-flex items-center space-x-2">
                    <img
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-6 h-6 rounded-full inline-block"
                    />
                    <span>{assignee.name}</span>
                  </span>
                ))}
              </td>
              <td className="p-3">
                <div className="relative w-full bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: `${task.progress ?? 0}%` }}
                  ></div>
                </div>
                <span className="text-sm">{task.progress ?? 0}%</span>
              </td>
              <td className="p-3">{new Date(task.dueDate).toLocaleDateString()}</td>
            </tr>
          )) : 
          <tr>
            <td>No Tasks in this List</td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
