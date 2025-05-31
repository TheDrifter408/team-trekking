import { useEffect } from 'react';
import { usePageHeader } from '@/lib/context/page-header-context';

// Define types for breadcrumb items
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbData = {
  workspace?: BreadcrumbItem;
  space?: BreadcrumbItem;
  folder?: BreadcrumbItem;
  list?: BreadcrumbItem;
  task?: BreadcrumbItem;
  subtask?: BreadcrumbItem;
  currentTitle: string;
};

export const useBreadcrumbNavigation = (data: BreadcrumbData) => {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    // Build breadcrumbs array based on available hierarchy data
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always add home
    breadcrumbs.push({ label: 'Home', href: '/' });

    // Add each level that exists
    if (data.workspace) breadcrumbs.push(data.workspace);
    if (data.space) breadcrumbs.push(data.space);
    if (data.folder) breadcrumbs.push(data.folder);
    if (data.list) breadcrumbs.push(data.list);
    if (data.task) breadcrumbs.push(data.task);
    if (data.subtask) breadcrumbs.push(data.subtask);

    // Set the page header with the title and breadcrumbs
    setHeader({
      title: data.currentTitle,
      breadcrumbs,
    });

    // Cleanup when component unmounts
    return () => {
      setHeader(null);
    };
  }, [
    data.currentTitle,
    data.workspace?.label,
    data.workspace?.href,
    data.space?.label,
    data.space?.href,
    data.folder?.label,
    data.folder?.href,
    data.list?.label,
    data.list?.href,
    data.task?.label,
    data.task?.href,
    data.subtask?.label,
    data.subtask?.href,
    setHeader,
  ]); // Use specific properties instead of the whole object
};
