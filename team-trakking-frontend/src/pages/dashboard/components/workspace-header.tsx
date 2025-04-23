import React from 'react';
import { Grid, LayoutDashboard, List, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
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
    <div className="w-[inherit] sticky top-[--header-height] bg-background ">
      <div className="flex flex-col">
        <div className="py-2.5  border border-gray-200  mb-1 px-2">
          <Breadcrumb>
            <BreadcrumbList>
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
        <div className="pt-2 flex justify-between rounded-lg px-2">
          <div className="flex gap-2">
            {availableViews.map((view) => {
              const ViewIcon =
                viewConfig[view as keyof typeof viewConfig]?.icon;
              const viewLabel =
                viewConfig[view as keyof typeof viewConfig]?.label || view;
              const isActive = view === currentView;

              return (
                <Button
                  key={view}
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange(view as ViewType)}
                  className={`relative ${isActive ? 'text-primary' : ''}`}
                >
                  {ViewIcon && <ViewIcon className=" h-4 w-4" />}
                  {viewLabel}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
