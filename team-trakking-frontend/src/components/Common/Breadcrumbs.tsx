import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  workspaceId: string;
  workspaceName: string;
}

export const Breadcrumbs = ({
  workspaceId,
  workspaceName,
}: BreadcrumbProps) => {
  return (
    <div className="py-1 h-full  items-center  px-6">
      <Link to={`/workspace/${workspaceId}`} className="text-sm text-tertiary">
        {workspaceName}
      </Link>
    </div>
  );
};
