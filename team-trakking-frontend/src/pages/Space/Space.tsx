import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSpaceQuery,
  useGetWorkspaceQuery,
} from '@store/services/main.ts';
import { useStore } from '@store/zustand';
import { Breadcrumbs } from '@/components';
import { SpaceHeader } from './components/SpaceHeader';
import { SpaceOverviewHeader } from '@pages/Space/components/SpaceOverviewHeader.tsx';
import { statuses } from '@/data/mockData.ts';

export const Space = () => {
  const params = useParams();
  const { spaceId } = params;
  const { currentWorkspace, setWorkspaceData } = useStore();
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
      setWorkspaceData(transformedData);
    }
  }, [workspaceDetails]);

  // Calculate folder statistics
  const folderStats = useMemo(() => {
    if (!spaceDetails?.folders) return [];

    return spaceDetails.folders.map((folder) => {
      const color = statuses.find((item) => item.id === folder.folderStatusId);
      const totalTasks = Math.floor(Math.random() * 100);
      const completedTasks = Math.floor(Math.random() * totalTasks);
      const completionPercentage =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const highPriorityTasks = Math.floor(Math.random() * totalTasks);
      const averageProgress =
        totalTasks > 0 ? Math.round(Math.random() * 100) : 0;
      const tasksDueToday = Math.floor(Math.random() * totalTasks);
      const listCount = Math.floor(Math.random() * 10) + 1;
      const status = statuses.find((item) => item.id === folder.folderStatusId);

      return {
        id: folder.id,
        name: folder.name,
        status: status.name,
        statusColor: color,
        totalTasks,
        completedTasks,
        completionPercentage,
        highPriorityTasks,
        averageProgress,
        tasksDueToday,
        listCount: listCount,
      };
    });
  }, [spaceDetails]);

  // Calculate list statistics
  const generateRandomListStats = () => {
    const totalTasks = Math.floor(Math.random() * 100);
    const completedTasks = Math.floor(Math.random() * totalTasks);
    const inProgressTasks = Math.floor(
      Math.random() * (totalTasks - completedTasks)
    );
    const notStartedTasks = totalTasks - completedTasks - inProgressTasks;
    const totalEstimatedHours = Math.floor(Math.random() * 200);

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
      completionPercentage:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalEstimatedHours,
    };
  };

  const listStats = Array.from({ length: 7 }, (_, id) => ({
    id,
    name: `List ${id + 1}`,
    statusColor: statuses[Math.floor(Math.random() * statuses.length)].color,
    ...generateRandomListStats(),
  }));

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
