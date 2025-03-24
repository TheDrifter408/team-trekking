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
    <div className="py-1 h-full  items-center  px-6 bg-header-secondary">
      <Link
        to={`/workspace/${workspaceId}`}
        className="text-sm ml-1 text-text-primary hover:text-text-hover"
      >
        {workspaceName}
      </Link>
    </div>
  );
};
