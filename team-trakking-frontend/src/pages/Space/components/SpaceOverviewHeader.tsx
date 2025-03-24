import React from 'react';
import { StatCard } from '@pages/Space/components/StatCard.tsx';
import { FolderCard } from '@pages/Space/components/FolderCard.tsx';
import { ListTable } from '@pages/Space/components/ListTable';
import { SpaceDetails } from '@/types/ApiResponse.ts';

interface SpaceOverviewHeaderProps {
  spaceDetails: SpaceDetails | null | undefined;
  currentWorkspace: string;
  folderStats: any;
  listStats: any;
}

export const SpaceOverviewHeader = ({
  spaceDetails,
  currentWorkspace,
  folderStats,
  listStats,
}: SpaceOverviewHeaderProps) => {
  return (
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
            (sum: number, folder) => sum + folder.totalTasks,
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
  );
};
