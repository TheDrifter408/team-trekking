import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '@store/services/main.ts';
import { WorkspaceHeader } from './components/WorkspaceHeader.tsx';
import { Breadcrumbs } from '@/components';
import { useStore } from '@store/zustand/index';
import { useWorkspace } from '@/context/LayoutContext.tsx';
import { ArrowUpRight, Clock, Folder, List, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Define Activity interface
interface Activity {
  id: number;
  userName: string;
  userAvatar: string;
  action: string;
  itemName: string;
  itemType: string;
  timestamp: string;
}

// Mock activities data
const mockActivities: Activity[] = [
  {
    id: 1,
    userName: 'Jane Cooper',
    userAvatar: '/api/placeholder/24/24',
    action: 'created',
    itemName: 'Marketing Campaign',
    itemType: 'task',
    timestamp: '10 minutes ago',
  },
  {
    id: 2,
    userName: 'Robert Fox',
    userAvatar: '/api/placeholder/24/24',
    action: 'completed',
    itemName: 'Website Redesign',
    itemType: 'task',
    timestamp: '45 minutes ago',
  },
  {
    id: 3,
    userName: 'Esther Howard',
    userAvatar: '/api/placeholder/24/24',
    action: 'added',
    itemName: 'New Product Launch',
    itemType: 'folder',
    timestamp: '2 hours ago',
  },
  {
    id: 4,
    userName: 'Leslie Alexander',
    userAvatar: '/api/placeholder/24/24',
    action: 'assigned',
    itemName: 'Budget Review',
    itemType: 'task',
    timestamp: '3 hours ago',
  },
];

// Mock stats data
const taskCompletionData = [
  { name: 'Mon', completed: 5, total: 8 },
  { name: 'Tue', completed: 7, total: 10 },
  { name: 'Wed', completed: 4, total: 6 },
  { name: 'Thu', completed: 8, total: 12 },
  { name: 'Fri', completed: 6, total: 8 },
  { name: 'Sat', completed: 3, total: 5 },
  { name: 'Sun', completed: 2, total: 3 },
];

const workloadData = [
  { name: 'Marketing', tasks: 24 },
  { name: 'Development', tasks: 35 },
  { name: 'Design', tasks: 18 },
  { name: 'Operations', tasks: 29 },
];

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

  return (
    <div className="flex flex-col min-h-screen">
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
          <div className="bg-white rounded-lg shadow border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-1">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="text-lg text-text-inverted font-medium">
                  Spaces
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Departments or teams in this workspace
              </p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl text-text-inverted  font-bold">
                  {spaceCount}
                </span>
                <span className="text-text-muted text-sm">Total Spaces</span>
              </div>
              <div className="space-y-3 mt-4">
                {workspaceDetails?.spaces?.slice(0, 5).map((space) => (
                  <div
                    key={space.id}
                    className="flex items-center justify-between py-1 border-b border-gray-100"
                  >
                    <span className="font-medium text-text-inverted ">
                      {space.name}
                    </span>
                    <span className="text-sm text-text-muted">
                      {space.folders.length} folders
                    </span>
                  </div>
                ))}
                {(workspaceDetails?.spaces?.length || 0) > 5 && (
                  <div className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer">
                    <span>View all spaces</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Folders Card */}
          <div className="bg-white rounded-lg shadow border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-1">
                <Folder className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="text-lg text-text-inverted font-medium">
                  Folders
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Projects organized in this workspace
              </p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl text-text-inverted  font-bold">
                  {folderCount}
                </span>
                <span className="text-text-muted text-sm">Total Projects</span>
              </div>
              <div className="space-y-3 mt-4">
                {workspaceDetails?.spaces
                  ?.flatMap((space) =>
                    space.folders.map((folder) => ({
                      ...folder,
                      spaceName: space.name,
                    }))
                  )
                  ?.slice(0, 5)
                  .map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center justify-between py-1 border-b border-gray-100"
                    >
                      <span className="font-medium text-text-inverted ">
                        {folder.name}
                      </span>
                      <span className="text-sm text-text-muted">
                        {folder.spaceName}
                      </span>
                    </div>
                  ))}
                {folderCount > 5 && (
                  <div className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer">
                    <span>View all folders</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lists Card */}
          <div className="bg-white rounded-lg shadow border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-1">
                <List className="mr-2 h-5 w-5 text-purple-500" />
                <h3 className="text-lg text-text-inverted font-medium">
                  Task Lists
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Organized task collections
              </p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl text-text-inverted  font-bold">
                  {listCount}
                </span>
                <span className="text-text-muted text-sm">Total Lists</span>
              </div>
              <div className="space-y-3 mt-4">
                {workspaceDetails?.spaces
                  ?.flatMap((space) => [
                    ...(space.lists || []).map((list) => ({
                      ...list,
                      containerName: space.name,
                      containerType: 'space',
                    })),
                    ...space.folders.flatMap((folder) =>
                      (folder.lists || []).map((list) => ({
                        ...list,
                        containerName: folder.name,
                        containerType: 'folder',
                      }))
                    ),
                  ])
                  ?.slice(0, 5)
                  .map((list, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 border-b border-gray-100"
                    >
                      <span className="font-medium text-text-inverted ">
                        {list.containerName}
                      </span>
                      <span className="text-sm text-text-muted">
                        {list.status?.name}
                      </span>
                    </div>
                  ))}
                {listCount > 5 && (
                  <div className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer">
                    <span>View all lists</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics and Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Statistics Section - takes 2/3 width */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg text-text-inverted font-medium">
                  Workspace Statistics
                </h3>
                <p className="text-sm text-gray-500">
                  Task completion and workload distribution
                </p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Task Completion Chart */}
                  <div>
                    <h3 className="text-sm text-text-inverted font-medium mb-2">
                      Weekly Task Completion
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={taskCompletionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="completed"
                            stroke="#8884d8"
                            name="Completed Tasks"
                          />
                          <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#82ca9d"
                            name="Total Tasks"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Department Workload Chart */}
                  <div>
                    <h3 className="text-sm text-text-inverted font-medium mb-2">
                      Department Workload
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workloadData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="tasks"
                            fill="#3b82f6"
                            name="Active Tasks"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Total Tasks</div>
                    <div className="text-2xl text-text-inverted font-bold">
                      {taskCount}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Completed</div>
                    <div className="text-2xl text-text-inverted font-bold">
                      {Math.floor(taskCount * 0.65)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">In Progress</div>
                    <div className="text-2xl text-text-inverted font-bold">
                      {Math.floor(taskCount * 0.25)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Overdue</div>
                    <div className="text-2xl text-text-inverted font-bold text-red-500">
                      {Math.floor(taskCount * 0.1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed - takes 1/3 width */}
          <div className="bg-white rounded-lg shadow border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center mb-1">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="text-lg text-text-inverted font-medium">
                  Recent Activity
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Latest actions in this workspace
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 pb-3 border-b border-gray-100"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={'https://i.pravatar.cc/200'}
                        alt={activity.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium text-text-inverted">
                          {activity.userName}
                        </span>{' '}
                        <span className="text-gray-600">{activity.action}</span>{' '}
                        <span className="font-medium text-text-inverted">
                          {activity.itemName}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer">
                  <span>View all activity</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
