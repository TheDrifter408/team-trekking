import React from 'react';
import { Grid, LayoutDashboard, List, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { usePageHeader, ViewType } from '@/lib/context/page-header-context.tsx';
import { useNavigate } from 'react-router';
import { SidebarTrigger } from '@/components/ui/sidebar.tsx';

const viewConfig = {
  overview: {
    icon: LayoutDashboard,
    label: 'Overview',
    path: '/home',
  },
  board: {
    icon: Grid,
    label: 'Board View',
    path: '/board',
  },
  list: {
    icon: List,
    label: 'List View',
    path: '/list',
  },
  calendar: {
    icon: Calendar,
    label: 'Calendar',
    path: '/calendar',
  },
};

export const WorkspaceHeader = () => {
  const navigate = useNavigate();
  const { header, currentView } = usePageHeader();

  if (!header) return null;

  // Default available views if not specified
  const availableViews = header.viewType || [
    'overview',
    'board',
    'list',
    'calendar',
  ];

  const onViewChange = (view: ViewType) => {
    // Optional: navigate to the corresponding route
    const path = viewConfig[view as keyof typeof viewConfig]?.path;
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="w-full mt-2 mb-1">
      <div className="flex flex-col">
        <div className="mt-4 mb-1">
          <Breadcrumb>
            <BreadcrumbList>
              <SidebarTrigger
                variant="outline"
                className="scale-125 sm:scale-100"
              />

              {header.breadcrumbs?.map((item, index) => {
                const isLast = index === header.breadcrumbs!.length - 1;

                return (
                  <React.Fragment key={item.label}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href || '#'}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className={'mt-1'} />
        <div className="pt-1 flex justify-between rounded-lg">
          <div className="flex">
            {availableViews.map((view) => {
              const ViewIcon =
                viewConfig[view as keyof typeof viewConfig]?.icon;
              const viewLabel =
                viewConfig[view as keyof typeof viewConfig]?.label || view;

              return (
                <Button
                  key={view}
                  size="sm"
                  variant="ghost"
                  onClick={() => onViewChange(view)}
                  className={`flex items-center px-3 text-sm rounded-md font-medium ${
                    currentView === view ? 'border-b-2 border-primary' : ''
                  }`}
                >
                  {ViewIcon && <ViewIcon className="h-4 w-4 mr-1" />}
                  <span className={'text-xs'}>{viewLabel}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
