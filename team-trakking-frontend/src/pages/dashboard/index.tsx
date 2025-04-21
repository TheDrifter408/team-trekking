'use client';

import { useEffect } from 'react';
import { useTMTStore } from '@/stores/zustand';
import { useBreadcrumbNavigation } from '@/lib/hooks/use-breadcrumb';
import { usePageHeader } from '@/lib/context/page-header-context';
import { Main } from '@/components/layout/main.tsx';
import { PageHeader } from '@/components/layout/page-header.tsx';
import { Folder, List, Users } from 'lucide-react';
import { TaskStatusTable } from '@/pages/dashboard/components/task-table.tsx';
import { mockActivities, spaceData, myTasks } from '@/mock';
import { ActivityFeed } from '@/pages/dashboard/components/activity-feed.tsx';

export const Dashboard = () => {
  const { setCurrentView } = usePageHeader();
  const { setCurrentPage } = useTMTStore();

  // Set up breadcrumbs for this page
  useBreadcrumbNavigation({
    currentTitle: 'My Workspace',
    workspace: { label: 'Workspace', href: '/home' },
  });

  useEffect(() => {
    setCurrentView('overview');
    setCurrentPage('Home');
  }, []);

  const spacesData: any[] = [],
    foldersData: any[] = [],
    listsData: any[] = [];

  let spaceCount = 0,
    folderCount = 0,
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
    ++spaceCount;
  }

  const handleViewAllSpaces = () => {
    // Implement navigation or modal to view all spaces
    console.log('View all spaces clicked');
  };

  const handleViewAllFolders = () => {
    // Implement navigation or modal to view all folders
    console.log('View all folders clicked');
  };

  const handleViewAllLists = () => {
    // Implement navigation or modal to view all lists
    console.log('View all lists clicked');
  };

  return (
    <Main>
      <div className="px-6 pt-4 flex-grow">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Spaces Card */}
          <PageHeader
            icon={<Users />}
            title="Spaces"
            description="Departments or teams in this workspace"
            count={spaceCount}
            countLabel="Total Spaces"
            items={spacesData}
            itemLabelKey="name"
            color="blue"
            viewAllLabel="View all spaces"
            onViewAll={handleViewAllSpaces}
          />

          {/* Folders Card */}
          <PageHeader
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
          <PageHeader
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
      <div className="overflow-x-auto w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 ">
            <TaskStatusTable tasks={myTasks} />
          </div>
          <div className={'h-[320px]'}>
            <ActivityFeed activities={mockActivities} onViewAll={() => {}} />
          </div>
        </div>
      </div>
    </Main>
  );
};
