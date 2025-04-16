import { useBreadcrumbNavigation } from '@/lib/hooks/use-breadcrumb.tsx';
import { Main } from '@/components/layout/main.tsx';
import { Folder, List } from 'lucide-react';
import { usePageHeader } from '@/lib/context/page-header-context';
import { SpaceOverview } from './components/space-overview.tsx';
import { PageHeader } from '@/components/layout/page-header.tsx';
import { spaceData } from '@/mock';

export const Space = () => {
  const { setCurrentView } = usePageHeader();

  useBreadcrumbNavigation({
    currentTitle: 'ProjecX Moon',
    workspace: { label: 'Workspace', href: '/home' },
    space: { label: 'Space', href: '/space' },
  });
  setCurrentView('overview');

  const foldersData: any[] = [],
    listsData: any[] = [];

  let folderCount = 0,
    listCount = 0;

  for (const space of spaceData) {
    if (space.name !== 'ProjecX Moon') continue;
    for (const folder of space.folders) {
      listCount += folder.lists.length;
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

    for (const list of space.lists) {
      listsData.push(list);
    }
  }

  return (
    <Main>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 pt-6 gap-4 mb-6">
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
          onViewAll={() => {}}
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
          onViewAll={() => {}}
        />
      </div>
      <div className="">
        <SpaceOverview foldersData={foldersData} />
      </div>
    </Main>
  );
};
