import { Main } from '@/components/layout/main.tsx';
import { List } from 'lucide-react';
import { OverviewCard } from '@/pages/dashboard/components/overview-card.tsx';
import { spaceData } from '@/mock';
import { PageHeader } from '@/components/layout/page-header.tsx';
import { HeaderType } from '@/types/props/Common.ts';

export const Folder = () => {
  const currentPage = {
    type: 'FOLDER' as HeaderType,
    label: 'space Shuttle',
  };
  const parents = [
    { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
  ];
  const listsData: any[] = [];

  let listCount = 0;

  for (const space of spaceData) {
    if (space.name !== 'ProjecX Moon') continue;
    for (const folder of space.folders) {
      if (folder.name !== 'space shuttle') continue;
      listCount += folder.lists.length;

      for (const list of folder.lists) {
        listsData.push(list);
      }
    }
  }

  return (
    <div>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="flex-grow px-4 grid grid-cols-1 md:grid-cols-1 pt-6 gap-4 mb-6">
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
      </Main>
    </div>
  );
};
