import { PageHeader } from '@/components/layout/pageHeader';
import { WorkspaceHeader } from '@/pages/dashboard/components/WorkspaceHeader';
import { usePageHeader } from '@/lib/context/page-header-context';

export const PageHeaderRenderer = () => {
  const { header } = usePageHeader();

  // Return null if no header data
  if (!header) return null;

  // Render PageHeader with WorkspaceHeader as its child
  return (
    <PageHeader>
      <WorkspaceHeader />
    </PageHeader>
  );
};
