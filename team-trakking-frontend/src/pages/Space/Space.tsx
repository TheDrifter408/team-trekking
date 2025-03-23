import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSpaceQuery,
  useGetWorkspaceQuery,
} from '@store/services/main.ts';
import { useWorkspace } from '@/context/LayoutContext.tsx';
import { useStore } from '@store/zustand';
import { Breadcrumbs } from '@/components';
import { SpaceHeader } from './components/SpaceHeader';

export const Space = () => {
  const state = useParams();
  const { spaceId } = state || '1';
  const { setData } = useWorkspace();
  const { currentWorkspace } = useStore();
  const { data: spaceDetails } = useGetSpaceQuery(Number(spaceId));
  const workspaceId = spaceDetails?.workspaceId ?? 0;
  const { data: workspaceDetails } = useGetWorkspaceQuery(Number(workspaceId));

  useEffect(() => {
    if (workspaceDetails) {
      // Transform the API data to match the WorkspaceData structure
      const transformedData = workspaceDetails.spaces.map((space) => {
        return {
          space: {
            id: space.id,
            name: space.name,
            color: '', // Add a default color or extract from somewhere if available
            lists:
              space.lists?.map((list) => ({
                id: list.id,
                name: list.status?.name || '',
              })) || [],
            folders:
              space.folders?.map((folder) => ({
                id: folder.id,
                name: folder.name,
                color: folder.status?.color || '',
                lists: folder.lists || [],
              })) || [],
          },
        };
      });

      // Set the transformed data to the context
      setData(transformedData);
    }
  }, [workspaceDetails]);

  // Calculate folder statistics
  const folderStats = useMemo(() => {
    if (!spaceDetails?.folders) return [];

    return spaceDetails.folders.map((folder) => {
      // Count tasks in all lists within the folder
      const tasks = folder.lists?.flatMap((list) => list.tasks || []) || [];
      const totalTasks = tasks.length;

      // Count completed tasks (progress 100 or close to it)
      const completedTasks = tasks.filter((task) => task.progress >= 90).length;

      // Calculate completion percentage
      const completionPercentage =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Count high priority tasks
      const highPriorityTasks = tasks.filter(
        (task) => task.priorityType === 'high'
      ).length;

      // Calculate average progress
      const averageProgress =
        totalTasks > 0
          ? Math.round(
              tasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks
            )
          : 0;

      // Get tasks due today
      const today = new Date().toISOString().split('T')[0];
      const tasksDueToday = tasks.filter(
        (task) => task.dueDate && task.dueDate.split('T')[0] === today
      ).length;

      return {
        id: folder.id,
        name: folder.name,
        status: folder.status?.name || '',
        statusColor: folder.status?.color || '',
        totalTasks,
        completedTasks,
        completionPercentage,
        highPriorityTasks,
        averageProgress,
        tasksDueToday,
        listCount: folder.lists?.length || 0,
      };
    });
  }, [spaceDetails]);

  // Calculate list statistics
  const listStats = useMemo(() => {
    // Collect all lists from folders and direct space lists
    const allLists = [
      ...(spaceDetails?.folders?.flatMap((folder) => folder.lists || []) || []),
      ...(spaceDetails?.lists || []),
    ];

    return allLists.map((list) => {
      const tasks = list.tasks || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task) => task.progress >= 90).length;
      const inProgressTasks = tasks.filter(
        (task) => task.progress > 0 && task.progress < 90
      ).length;
      const notStartedTasks = tasks.filter(
        (task) => task.progress === 0
      ).length;

      // Calculate total estimated time
      const totalEstimatedHours = tasks.reduce((sum, task) => {
        if (!task.estimatedTime) return sum;
        const match = task.estimatedTime.match(/(\d+)/);
        return sum + (match ? parseInt(match[1], 10) : 0);
      }, 0);

      return {
        id: list.id,
        name: list.status?.name || '',
        statusColor: list.status?.color || '',
        totalTasks,
        completedTasks,
        inProgressTasks,
        notStartedTasks,
        completionPercentage:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        totalEstimatedHours,
      };
    });
  }, [spaceDetails]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary-light">
      <Breadcrumbs
        workspaceId={spaceDetails?.workspaceId.toString() ?? '0'}
        workspaceName={currentWorkspace}
        spaceId={Number(spaceId)}
        spaceName={spaceDetails?.name ?? ''}
      />
      <SpaceHeader />

      {/* Space Overview Header */}
      <div className="px-6 flex-grow">
        <div className="space-header mt-6 mb-8 ">
          <h1 className="text-2xl font-bold">
            {spaceDetails?.name || 'Space Overview'}
          </h1>
          <p className="text-gray-600">
            Workspace: {spaceDetails?.workspace?.name || currentWorkspace}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="summary-stats grid grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Folders"
            value={spaceDetails?.folders?.length || 0}
            icon="📁"
          />
          <StatCard
            title="Total Lists"
            value={
              (spaceDetails?.folders?.reduce(
                (sum, folder) => sum + (folder.lists?.length || 0),
                0
              ) || 0) + (spaceDetails?.lists?.length || 0)
            }
            icon="📋"
          />
          <StatCard
            title="Total Tasks"
            value={folderStats.reduce(
              (sum, folder) => sum + folder.totalTasks,
              0
            )}
            icon="✓"
          />
          <StatCard
            title="Average Completion"
            value={`${Math.round(folderStats.reduce((sum, folder) => sum + folder.completionPercentage, 0) / (folderStats.length || 1))}%`}
            icon="📊"
          />
        </div>

        {/* Folder Overview Cards */}
        <h2 className="text-xl font-semibold mb-4">Folder Overview</h2>
        <div className="folder-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {folderStats.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>

        {/* List Overview Table */}
        <h2 className="text-xl font-semibold mb-4">List Overview</h2>
        <div className="list-table-container overflow-x-auto">
          <ListTable lists={listStats} />
        </div>
      </div>
    </div>
  );
};

// Component for stat cards in the summary section
const StatCard = ({ title, value, icon }) => (
  <div className="stat-card bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);

// Component for folder cards
const FolderCard = ({ folder }) => (
  <div className="folder-card bg-white p-5 rounded-lg shadow">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-lg">{folder.name}</h3>
      <span
        className="status-badge px-2 py-1 text-xs rounded"
        style={{
          backgroundColor: folder.statusColor || '#e2e8f0',
          color: '#1a202c',
        }}
      >
        {folder.status}
      </span>
    </div>

    <div className="folder-stats grid grid-cols-2 gap-3 mb-4">
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Tasks</span>
        <p className="font-semibold">{folder.totalTasks}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Lists</span>
        <p className="font-semibold">{folder.listCount}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">High Priority</span>
        <p className="font-semibold">{folder.highPriorityTasks}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Due Today</span>
        <p className="font-semibold">{folder.tasksDueToday}</p>
      </div>
    </div>

    <div className="progress-section mt-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">Progress</span>
        <span className="text-xs font-bold">{folder.averageProgress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${folder.averageProgress}%` }}
        ></div>
      </div>
    </div>

    <div className="completion-section mt-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">Completion</span>
        <span className="text-xs font-bold">
          {folder.completionPercentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${folder.completionPercentage}%` }}
        ></div>
      </div>
    </div>
  </div>
);

// Component for list overview table
const ListTable = ({ lists }) => (
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
