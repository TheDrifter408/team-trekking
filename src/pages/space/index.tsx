import { Main } from '@/components/layout/main.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { Folder, List } from 'lucide-react';
import { SpaceOverview } from './components/space-overview.tsx';
import { OverviewCard } from '@/pages/dashboard/components/overview-card.tsx';
import { spaceData } from '@/mock';
import { HeaderType } from '@/types/props/Common.ts';

export const Space = () => {
  const currentPage = {
    type: 'SPACE' as HeaderType,
    label: 'ProjecX Moon',
  };

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
    <div className={''}>
      <PageHeader currentPage={currentPage} />
      <Main>
        <div className="flex-grow px-4 grid grid-cols-1 md:grid-cols-2 pt-6 gap-4 mb-6">
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
            onViewAll={() => {}}
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
            onViewAll={() => {}}
          />
        </div>
        <div className="px-4">
          <SpaceOverview foldersData={foldersData} />
        </div>
      </Main>
    </div>
  );
};
export default Space;
