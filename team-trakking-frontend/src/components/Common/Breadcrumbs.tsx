import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  workspaceId: string;
  workspaceName: string;
  spaceName?: string;
  spaceId?: number;
  folderName?: string;
  folderId?: number;
}

export const Breadcrumbs = ({
  workspaceId,
  workspaceName,
  spaceName,
  spaceId,
  folderId,
  folderName,
}: BreadcrumbProps) => {
  return (
    <div className="py-1 h-full flex items-center px-6 bg-accent-header">
      <Link
        to={`/workspace/${workspaceId}`}
        className="text-sm ml-1 text-text-primary hover:text-text-hover"
      >
        {workspaceName}
      </Link>

      {spaceName && spaceId && (
        <>
          <span className="mx-2 text-text-secondary">/</span>
          <Link
            to={`/space/${spaceId}`}
            className="text-sm text-text-primary hover:text-text-hover"
          >
            {spaceName}
          </Link>
        </>
      )}
      {folderName && folderId && (
        <>
          <span className="mx-2 text-text-secondary">/</span>
          <Link
            to={`/folder/${folderId}`}
            className="text-sm text-text-primary hover:text-text-hover"
          >
            {folderName}
          </Link>
        </>
      )}
    </div>
  );
};
