import { List } from "@/types/ApiResponse";

interface FolderListProps {
  listStatistics: any;
  onListClick: (list:List) => void,
}
export const FolderList = ({ listStatistics, onListClick }: FolderListProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">List Name</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Tasks</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Completed Tasks</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">In Progress</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pending Tasks</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">High Priority</th>
          </tr>
        </thead>
        <tbody>
          {listStatistics.map((list: any) => (
            <tr key={list.id} className="border-b hover:bg-gray-50" onClick={() => onListClick(list)}>
              <td className="py-3 px-4">{list.name}</td>
              <td className="py-3 px-4">{list.totalTasks}</td>
              <td className="py-3 px-4 text-green-600">
                {list.completedTasks}
              </td>
              <td className="py-3 px-4 text-yellow-600">
                {list.inProgressTasks}
              </td>
              <td className="py-3 px-4 text-gray-500">
                {list.pendingTasks}
              </td>
              <td className="py-3 px-4 text-red-600">
                {list.highPriorityTasks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
