import { createFileRoute } from '@tanstack/react-router';
import { Main } from '@/components/layout/main.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { Folder as LucideFolder, List as LucideList } from 'lucide-react';
import { SpaceOverview } from './-components/space-overview';
import { OverviewCard } from '@/routes/_auth/home/-components/overview-card';
import { HeaderType } from '@/types/props/Common.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store';
import { Folder, List } from '@/types/request-response/workspace/ApiResponse';
import { useEffect, useState } from 'react';

const Space = () => {
  const { spaceId } = Route.useParams();

  const { spaces, setCurrentSpace } = useWorkspaceStore();

  const currentSpace = spaces?.find((s) => s.id.toString() === spaceId);

  const currentPage = {
    type: 'SPACE' as HeaderType,
    label: currentSpace?.name || '',
  };

  const [folders, setFolders] = useState<Folder[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    if (currentSpace) {
      setFolders(currentSpace.folders);
      setCurrentSpace(currentSpace);
      const totalLists = [...currentSpace.lists];
      for (const folder of currentSpace.folders) {
        totalLists.push(...folder.lists);
      }
      setLists(totalLists);
    }
  }, [currentSpace]);

  return (
    <div className={''}>
      <PageHeader currentPage={currentPage} />
      <Main>
        <div className="flex-grow px-4 grid grid-cols-1 md:grid-cols-2 pt-6 gap-4 mb-6">
          {/* Folders Card */}
          <OverviewCard
            icon={<LucideFolder />}
            title="Folders"
            description="Projects organized in this workspace"
            count={folders.length}
            countLabel="Total Folders"
            items={folders}
            itemLabelKey="name"
            color="green"
            viewAllLabel="View all folders"
            onViewAll={() => {}}
          />
          {/* Lists Card */}
          <OverviewCard
            icon={<LucideList />}
            title="Task Lists"
            description="Organized task collections"
            count={lists.length}
            countLabel="Total Lists"
            items={lists}
            itemLabelKey="containerName"
            color="purple"
            viewAllLabel="View all lists"
            onViewAll={() => {}}
          />
        </div>
        <div className="px-4">
          <SpaceOverview foldersData={folders} />
        </div>
      </Main>
    </div>
  );
};

export const Route = createFileRoute('/_auth/space/$spaceId')({
  component: Space,
});
