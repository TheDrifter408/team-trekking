import { useNavigate } from 'react-router-dom';
import { statusColors, priorityColors } from '@/mock';

const getRandomKey = (obj: Record<string, string>) => {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
};

const TaskTable = ({ tasks }) => {
  const navigate = useNavigate();
  const onHandleTaskClick = (task: Task) => {
    navigate(`/Task/${task.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
      <table className="w-full border-collapse shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Task Name</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Assignees</th>
            <th className="p-3 text-left">Progress</th>
            <th className="p-3 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              const randomStatus = getRandomKey(statusColors);
              const randomPriority = getRandomKey(priorityColors);
              return (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-50"
                  onClick={() => onHandleTaskClick(task)}
                >
                  <td className="p-3">{task.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-gray-200 rounded-full text-xs font-semibold ${statusColors[randomStatus]}`}
                    >
                      {randomStatus
                        .replace('_', ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-gray-200 rounded-full text-xs font-semibold ${priorityColors[randomPriority]}`}
                    >
                      {randomPriority.replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                      )}
                    </span>
                  </td>

                  <td className="p-3">
                    {task.assignees?.map((assignee) => (
                      <span
                        key={assignee.id}
                        className="inline-flex items-center space-x-2"
                      >
                        <img
                          src={`https://ui-avatars.com/api/?name=${assignee.name}&background=random`}
                          alt={assignee.name}
                          className="w-6 h-6 rounded-full inline-block"
                        />
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
                  <td className="p-3">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-b hover:bg-gray-50">
              <td colSpan={6} className="p-3 font-medium">
                No Tasks in this List
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
