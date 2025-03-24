import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '@store/services/main.ts';
import { WorkspaceHeader } from './components/WorkspaceHeader.tsx';
import { Breadcrumbs } from '@/components';
import { useStore } from '@store/zustand/index';
import { useWorkspace } from '@/context/LayoutContext.tsx';
import {
  mockActivities,
  taskCompletionData,
  workloadData,
} from '@/data/mockData.ts';
import { Folder, List, Users } from 'lucide-react';
import { WorkspaceOverviewCard } from './components/WorkspaceOverviewCard';
import { WorkspaceStatistics } from './components/WorkspaceStatistics';
import { ActivityFeed } from './components/ActivityFeed.tsx';

export const WorkspacePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setData } = useWorkspace();
  const { setWorkspaceName } = useStore();
  const { workspaceId } = params;
  const { data: workspaceDetails } = useGetWorkspaceQuery(Number(workspaceId));
  const [spaceCount, setSpaceCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [listCount, setListCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [spacesData, setSpacesData] = useState([]);
  const [foldersData, setFoldersData] = useState([]);
  const [listsData, setListsData] = useState([]);

  useEffect(() => {
    if (workspaceDetails) {
      setWorkspaceName(workspaceDetails.name ?? '');

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
      setData(transformedData);

      // Calculate counts for overview metrics
      const spaces = workspaceDetails.spaces || [];
      let folders = 0;
      let lists = 0;
      let tasks = 0;

      // Prepare spaces data for the overview card
      const spacesForOverview = spaces.map((space) => ({
        id: space.id,
        name: space.name,
        folderCount: space.folders?.length || 0,
      }));

      setSpacesData(spacesForOverview);

      // Prepare folders data for the overview card
      const foldersForOverview = spaces.flatMap((space) =>
        space.folders.map((folder) => ({
          id: folder.id,
          name: folder.name,
          spaceName: space.name,
        }))
      );

      setFoldersData(foldersForOverview);

      // Prepare lists data for the overview card
      const listsForOverview = spaces.flatMap((space) => [
        ...(space.lists || []).map((list) => ({
          id: list.id,
          containerName: space.name,
          status: list.status?.name,
        })),
        ...space.folders.flatMap((folder) =>
          (folder.lists || []).map((list) => ({
            id: list.id,
            containerName: folder.name,
            status: list.status?.name,
          }))
        ),
      ]);

      setListsData(listsForOverview);

      spaces.forEach((space) => {
        folders += space.folders?.length || 0;

        // Count lists directly in spaces
        const spaceLists = space.lists?.length || 0;
        lists += spaceLists;

        // Count lists in folders
        space.folders?.forEach((folder) => {
          lists += folder.lists?.length || 0;

          // Count tasks in folder lists
          folder.lists?.forEach((list) => {
            tasks += list.tasks?.length || 0;
          });
        });

        // Count tasks in space lists
        space.lists?.forEach((list) => {
          tasks += list.tasks?.length || 0;
        });
      });

      setSpaceCount(spaces.length);
      setFolderCount(folders);
      setListCount(lists);
      setTaskCount(tasks);
    }
  }, [workspaceDetails]);

  if (!workspaceId) navigate('/home');

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

  const handleViewAllActivity = () => {
    // Implement navigation or modal to view all activity
    console.log('View all activity clicked');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary-light">
      {/* Sticky Secondary Header */}
      <Breadcrumbs
        workspaceId={workspaceId ?? ''}
        workspaceName={workspaceDetails?.name ?? ''}
      />
      <WorkspaceHeader />

      {/* Content */}
      <div className="px-6 pt-4 pb-6 flex-grow">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Spaces Card */}
          <WorkspaceOverviewCard
            icon={<Users />}
            title="Spaces"
            description="Departments or teams in this workspace"
            count={spaceCount}
            countLabel="Total Spaces"
            items={spacesData}
            itemLabelKey="name"
            itemValueKey="folderCount"
            color="blue"
            viewAllLabel="View all spaces"
            onViewAll={handleViewAllSpaces}
          />

          {/* Folders Card */}
          <WorkspaceOverviewCard
            icon={<Folder />}
            title="Folders"
            description="Projects organized in this workspace"
            count={folderCount}
            countLabel="Total Projects"
            items={foldersData}
            itemLabelKey="name"
            itemValueKey="spaceName"
            color="green"
            viewAllLabel="View all folders"
            onViewAll={handleViewAllFolders}
          />

          {/* Lists Card */}
          <WorkspaceOverviewCard
            icon={<List />}
            title="Task Lists"
            description="Organized task collections"
            count={listCount}
            countLabel="Total Lists"
            items={listsData}
            itemLabelKey="containerName"
            itemValueKey="status"
            color="purple"
            viewAllLabel="View all lists"
            onViewAll={handleViewAllLists}
          />
        </div>

        {/* Statistics and Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Statistics Section - takes 2/3 width */}
          <div className="md:col-span-2 space-y-4">
            <WorkspaceStatistics
              taskCompletionData={taskCompletionData}
              workloadData={workloadData}
              taskCount={taskCount}
            />
          </div>

          {/* Activity Feed - takes 1/3 width */}
          <ActivityFeed
            activities={mockActivities}
            onViewAll={handleViewAllActivity}
          />
        </div>
      </div>
    </div>
  );
};
