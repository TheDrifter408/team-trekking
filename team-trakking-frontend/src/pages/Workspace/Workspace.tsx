import { Navigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '@store/services/main.ts';
import { Card } from '@library/components';

export const WorkspacePage = () => {
  const params = useParams();

  const { workspaceId } = params;
  const { data: workspaceDetails } = useGetWorkspaceQuery(Number(workspaceId));
  console.log(workspaceDetails);

  if (!workspaceId) {
    return <Navigate to="/workspaces" />;
  }

  return (
    <div className="space-y-6">
      {workspaceDetails &&
        workspaceDetails.spaces.map((space) => <Card>{space.name}</Card>)}
    </div>
  );
};
