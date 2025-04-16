import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface TaskCompletionData {
  name: string;
  completed: number;
  total: number;
}

interface WorkloadData {
  name: string;
  tasks: number;
}

interface WorkspaceStatisticsProps {
  taskCompletionData: TaskCompletionData[];
  workloadData: WorkloadData[];
  taskCount: number;
}

export const WorkspaceStatistics = ({
  taskCompletionData,
  workloadData,
  taskCount,
}: WorkspaceStatisticsProps) => {
  return (
    <div className=" rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg text-text-default font-medium">
          Workspace Statistics
        </h3>
        <p className="text-sm text-text-light">
          Task completion and workload distribution
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Completion Chart */}
          <div>
            <h3 className="text-sm text-text-light font-medium mb-2">
              Weekly Task Completion
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#8884d8"
                    name="Completed Tasks"
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    name="Total Tasks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Workload Chart */}
          <div>
            <h3 className="text-sm text-text-light font-medium mb-2">
              Department Workload
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" name="Active Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-text-default">Total Tasks</div>
            <div className="text-2xl text-text-light font-semibold">
              {taskCount}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-text-default">Completed</div>
            <div className="text-2xl text-text-light font-semibold">
              {Math.floor(taskCount * 0.65)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-text-default">In Progress</div>
            <div className="text-2xl text-text-light font-semibold">
              {Math.floor(taskCount * 0.25)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-text-default">Overdue</div>
            <div className="text-2xl font-semibold text-red-500">
              {Math.floor(taskCount * 0.1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
