'use client';

import { Main } from '@/components/layout/main.tsx';
import { OverviewCard } from '@/pages/dashboard/components/overview-card.tsx';
import { Folder, List } from 'lucide-react';
import { TaskStatusTable } from '@/pages/dashboard/components/task-table.tsx';
import { mockActivities, myTasks, spaceData } from '@/mock';
import { PageHeader } from '@/components/layout/page-header';
import { ActivityFeed } from '@/pages/dashboard/components/activity-feed.tsx';
import { HeaderType } from '@/types/props/common.ts';

export const Dashboard = () => {
  const currentPage = {
    type: 'HOME' as HeaderType,
    label: 'Apptitive',
    link: '/home',
  };

  const spacesData: any[] = [],
    foldersData: any[] = [],
    listsData: any[] = [];

  let folderCount = 0,
    listCount = 0;

  for (const space of spaceData) {
    let _listCount = 0;
    for (const folder of space.folders) {
      listCount += folder.lists.length;
      _listCount += folder.lists.length;
      const _folder = {
        id: folder.id,
        name: folder.name,
        listCount: folder.lists.length,
      };
      foldersData.push(_folder);
      for (const list of folder.lists) {
        listsData.push(list);
      }
    }
    folderCount += space.folders.length;
    const _space = {
      id: space.id,
      name: space.name,
      folderCount: space.folders.length,
      listCount: space.lists.length + _listCount,
    };
    spacesData.push(_space);
    for (const list of space.lists) {
      listsData.push(list);
    }
  }

  const handleViewAllFolders = () => {};

  const handleViewAllLists = () => {};

  return (
    <div>
      <PageHeader currentPage={currentPage} />
      <Main>
        <div className="px-4 flex-grow">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Folders Card */}
            <OverviewCard
              icon={<Folder />}
              title="Folders"
              description="Projects organized in this workspace"
              count={folderCount}
              countLabel="Total Folders"
              items={foldersData}
              itemLabelKey="name"
              color="green"
              viewAllLabel="View all folders"
              onViewAll={handleViewAllFolders}
            />

            {/* Lists Card */}
            <OverviewCard
              icon={<List />}
              title="Task Lists"
              description="Organized task collections"
              count={listCount}
              countLabel="Total Lists"
              items={listsData}
              itemLabelKey="containerName"
              color="purple"
              viewAllLabel="View all lists"
              onViewAll={handleViewAllLists}
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 ">
              <TaskStatusTable tasks={myTasks} />
            </div>
            <div className={'h-[500px]'}>
              <ActivityFeed activities={mockActivities} onViewAll={() => {}} />
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};
