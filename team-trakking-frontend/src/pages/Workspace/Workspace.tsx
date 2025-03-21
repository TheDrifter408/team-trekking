import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '@store/services/main.ts';
import { WorkspaceHeader } from './components/WorkspaceHeader.tsx';
import { Breadcrumbs } from '@/components';
import { useStore } from '@store/zustand/index';

export const WorkspacePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setWorkspaceName } = useStore();
  const { workspaceId } = params;
  const { data: workspaceDetails } = useGetWorkspaceQuery(Number(workspaceId));
  console.log(workspaceDetails);
  useEffect(() => {
    setWorkspaceName(workspaceDetails?.name ?? '');
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
