import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFolderQuery } from '@store/services/main.ts';
import { FolderHeader } from './components/FolderHeader';
import { FolderOverview } from './components/FolderOverview';
import { FolderList } from './components/FolderList';
import { Breadcrumbs } from '@/components';

export const Folder = () => {
  const params = useParams();
  const { data: folderDetails } = useGetFolderQuery(Number(params.folderId));

  // Compute statistics for summary cards
  const folderStats = useMemo(() => {
    if (!folderDetails)
      return {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        highPriorityTasks: 0,
      };

    const totalTasks = folderDetails.tasks.length;
    const completedTasks = folderDetails.tasks.filter(
      (task) => task.progress === 100
    ).length;
    const inProgressTasks = folderDetails.tasks.filter(
      (task) => task.progress && task.progress > 0 && task.progress < 100
    ).length;
    const highPriorityTasks = folderDetails.tasks.filter(
      (task) => task.priorityType === 'high'
    ).length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      highPriorityTasks,
    };
  }, [folderDetails]);

  // Compute list statistics
  const listStatistics = useMemo(() => {
    if (!folderDetails) return [];

    return folderDetails.lists.map((list) => {
      const listTasks = folderDetails.tasks.filter(
        (task) => task.listId === list.id
      );

      return {
        ...list,
        totalTasks: listTasks.length,
        completedTasks: listTasks.filter((task) => task.progress === 100)
          .length,
        inProgressTasks: listTasks.filter(
          (task) => task.progress && task.progress > 0 && task.progress < 100
        ).length,
        pendingTasks: listTasks.filter((task) => task.progress === 0).length,
        highPriorityTasks: listTasks.filter(
          (task) => task.priorityType === 'high'
        ).length,
      };
    });
  }, [folderDetails]);

  // Render loading or empty state if no data
  if (!folderDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading folder details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary-light">
      <Breadcrumbs
        workspaceId={'1'}
        workspaceName={'Apptitive'}
        spaceId={1}
        spaceName={'Cappybara App'}
        folderId={1}
        folderName={'Going Moon'}
      />
      <FolderHeader />

      {/* Summary Cards */}
      <div className="px-6 flex-grow">
        <FolderOverview
          folderDetails={folderDetails}
          folderStats={folderStats}
        />
        <FolderList listStatistics={listStatistics} />
      </div>
    </div>
  );
};
