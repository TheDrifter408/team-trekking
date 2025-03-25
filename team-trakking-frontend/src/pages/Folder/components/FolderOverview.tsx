import { AlertTriangle, CheckCircle2, Clock, LayoutGrid } from 'lucide-react';
import { FolderDetails } from '@/types/ApiResponse.ts';

interface FolderOverviewProps {
  folderDetails: FolderDetails;
  folderStats: any;
}

export const FolderOverview = ({
  folderDetails,
  folderStats,
}: FolderOverviewProps) => {
  return (
    <>
      <div className="space-header mt-6 mb-8 ">
        <h1 className="text-2xl font-bold">
          {folderDetails?.name || 'Space Overview'}
        </h1>
        <p className="text-gray-muted text-sm">Workspace: Apptitive</p>
        <p className="text-gray-muted text-sm">Space: Cappybara App</p>
      </div>
      <div className="summary-stats grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <LayoutGrid className="mr-3 text-blue-500" />
          <div>
            <p className="text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold">{folderStats.totalTasks}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <CheckCircle2 className="mr-3 text-green-500" />
          <div>
            <p className="text-gray-500">Completed Tasks</p>
            <p className="text-2xl font-bold">{folderStats.completedTasks}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <Clock className="mr-3 text-yellow-500" />
          <div>
            <p className="text-gray-500">In Progress</p>
            <p className="text-2xl font-bold">{folderStats.inProgressTasks}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <AlertTriangle className="mr-3 text-red-500" />
          <div>
            <p className="text-gray-500">High Priority</p>
            <p className="text-2xl font-bold">
              {folderStats.highPriorityTasks}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
