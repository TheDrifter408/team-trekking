import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '@store/services/main.ts';
import { WorkspaceHeader } from './components/WorkspaceHeader.tsx';
import { Breadcrumbs } from '@/components';
import { useStore } from '@store/zustand/index';
import { useWorkspace } from '@/context/LayoutContext.tsx';

export const WorkspacePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setData } = useWorkspace();
  const { setWorkspaceName } = useStore();
  const { workspaceId } = params;
  const { data: workspaceDetails } = useGetWorkspaceQuery(Number(workspaceId));

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
      <div className="px-6 pt-4 pb-6 flex-grow"></div>
    </div>
  );
};
