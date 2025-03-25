interface FolderListProps {
  listStatistics: any;
}
export const FolderList = ({ listStatistics }: FolderListProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left">List Name</th>
            <th className="p-3 text-center">Total Tasks</th>
            <th className="p-3 text-center">Completed Tasks</th>
            <th className="p-3 text-center">In Progress</th>
            <th className="p-3 text-center">Pending Tasks</th>
            <th className="p-3 text-center">High Priority</th>
          </tr>
        </thead>
        <tbody>
          {listStatistics.map((list: any) => (
            <tr key={list.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{list.name}</td>
              <td className="p-3 text-center">{list.totalTasks}</td>
              <td className="p-3 text-center text-green-600">
                {list.completedTasks}
              </td>
              <td className="p-3 text-center text-yellow-600">
                {list.inProgressTasks}
              </td>
              <td className="p-3 text-center text-gray-500">
                {list.pendingTasks}
              </td>
              <td className="p-3 text-center text-red-600">
                {list.highPriorityTasks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
