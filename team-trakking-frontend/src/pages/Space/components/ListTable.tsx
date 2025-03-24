interface ListTableProps {
  lists: any;
}
export const ListTable = ({ lists }: ListTableProps) => (
  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
    <thead className="bg-gray-100 border-b">
      <tr>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          List Name
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          Total Tasks
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          Completed
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          In Progress
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          Not Started
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          Est. Hours
        </th>
        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          Progress
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {lists.map((list) => (
        <tr key={list.id}>
          <td className="py-3 px-4">
            <div className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: list.statusColor || '#e2e8f0' }}
              ></span>
              <span className="font-medium">{list.name}</span>
            </div>
          </td>
          <td className="py-3 px-4">{list.totalTasks}</td>
          <td className="py-3 px-4">{list.completedTasks}</td>
          <td className="py-3 px-4">{list.inProgressTasks}</td>
          <td className="py-3 px-4">{list.notStartedTasks}</td>
          <td className="py-3 px-4">{list.totalEstimatedHours}</td>
          <td className="py-3 px-4">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${list.completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">
                {list.completionPercentage}%
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
