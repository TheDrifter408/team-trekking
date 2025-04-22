('use client');

import { PageHeaderContainer } from '@/components/layout/page-header-container.tsx';
import { WorkspaceHeader } from '@/pages/dashboard/components/workspace-header.tsx';
import { usePageHeader } from '@/lib/context/page-header-context';

export const PageHeaderRenderer = () => {
  const { header } = usePageHeader();

  // Return null if no header data
  if (!header) return null;

  return <WorkspaceHeader />;
};
