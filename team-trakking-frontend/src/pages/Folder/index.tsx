import { useBreadcrumbNavigation } from '@/lib/hooks/use-breadcrumb.tsx';
import { Main } from '@/components/layout/main.tsx';
import { List } from 'lucide-react';
import { usePageHeader } from '@/lib/context/page-header-context';
import { WorkspaceOverviewCard } from '@/pages/dashboard/components/WorkspaceOverviewCard.tsx';
import { spaceData } from '@/mock';

export const Folder = () => {
  const { setCurrentView } = usePageHeader();

  setCurrentView('folder');

  useBreadcrumbNavigation({
    currentTitle: 'ProjecX Moon',
    workspace: { label: 'Apptitive', href: '/home' },
    space: { label: 'ProjecX Moon', href: '/space' },
    folder: { label: 'Space Shuttle', href: '/folder' },
  });

  const listsData: any[] = [];

  let listCount = 0;

  for (const space of spaceData) {
    if (space.name !== 'ProjecX Moon') continue;
    for (const folder of space.folders) {
      if (folder.name !== 'Space shuttle') continue;
      listCount += folder.lists.length;

      for (const list of folder.lists) {
        listsData.push(list);
      }
    }
  }

  return (
    <Main>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-1 pt-6 gap-4 mb-6">
        {/* Lists Card */}
        <WorkspaceOverviewCard
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
        />{' '}
      </div>
    </Main>
  );
};
