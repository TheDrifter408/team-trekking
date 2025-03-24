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
import { SpaceOverviewHeader } from '@pages/Space/components/SpaceOverviewHeader.tsx';

export const Space = () => {
  const params = useParams();
  const { spaceId } = params;
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
      <SpaceOverviewHeader
        spaceDetails={spaceDetails}
        currentWorkspace={currentWorkspace}
        folderStats={folderStats}
        listStats={listStats}
      />
    </div>
  );
};
