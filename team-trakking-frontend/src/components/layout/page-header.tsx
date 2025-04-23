import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconHomeFilled,
  IconFolderFilled,
  IconList,
  IconCheckbox,
} from '@tabler/icons-react';
import { getInitials } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HeaderType } from '@/types/props/common.ts';
import { Button } from '@/components/ui/button.tsx';
import { ViewType } from '@/lib/context/page-header-context.tsx';
import { Calendar, Grid, LayoutDashboard, List } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface BreadcrumbItem {
  meta: HeaderType;
  label: string;
  link: string;
}

interface Props {
  // The currentPage determines the last item in the breadcrumb trail
  currentPage: {
    type: HeaderType;
    label: string;
  };
  // Optional parent items (will be constructed automatically when missing)
  parents?: BreadcrumbItem[];
  // Optional available views (defaults to all views)
  availableViews?: Array<ViewType>;
}

interface ViewConfigItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

type ViewConfigType = {
  [key in ViewType]: ViewConfigItem;
};

// Map header types to their respective UI components
const BreadcrumbTypeIcons: Record<HeaderType, React.ReactNode> = {
  HOME: <IconHomeFilled size={14} className="text-gray-600" />,
  SPACE: null, // Space uses initials instead of an icon
  FOLDER: <IconFolderFilled size={16} className="text-gray-600" />,
  LIST: <IconList size={16} className="text-gray-600" />,
  TASK: <IconCheckbox size={16} className="text-gray-600" />,
};

// Component to render the appropriate breadcrumb item based on type
const BreadcrumbTypeContent = ({
  type,
  label,
}: {
  type: HeaderType;
  label: string;
}) => {
  if (type === 'SPACE') {
    return (
      <div className="flex items-center gap-2">
        <div className="px-[5px] py-[2px] flex justify-center rounded bg-yellow-500">
          <span className="text-xs text-white font-medium">
            {getInitials(label)}
          </span>
        </div>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {BreadcrumbTypeIcons[type]}
      <span>{label}</span>
    </div>
  );
};

// Function to build the breadcrumb hierarchy automatically
const buildBreadcrumbHierarchy = (
  currentPage: { type: HeaderType; label: string },
  parents?: BreadcrumbItem[]
): BreadcrumbItem[] => {
  // If parents are provided, use them
  if (parents && parents.length > 0) {
    return [
      ...parents,
      {
        meta: currentPage.type,
        label: currentPage.label,
        link: '#', // Current page has no link
      },
    ];
  }

  const hierarchy: HeaderType[] = ['HOME', 'SPACE', 'FOLDER', 'LIST', 'TASK'];
  const currentIndex = hierarchy.indexOf(currentPage.type);

  if (currentIndex === -1) return [];

  // Create dummy breadcrumbs for parent levels
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always add Home if we're not on the home page
  if (currentPage.type !== 'HOME') {
    breadcrumbs.push({
      meta: 'HOME',
      label: 'Home',
      link: '/home',
    });
  }

  // Add placeholders for other parents if needed
  if (currentIndex > 1) {
    // If we're at FOLDER or deeper
    breadcrumbs.push({
      meta: 'SPACE',
      label: 'Space', // Default value, should be replaced with actual in real usage
      link: '/spaces',
    });
  }

  if (currentIndex > 2) {
    // If we're at LIST or deeper
    breadcrumbs.push({
      meta: 'FOLDER',
      label: 'Folder', // Default value
      link: '/folder',
    });
  }

  if (currentIndex > 3) {
    // If we're at TASK
    breadcrumbs.push({
      meta: 'LIST',
      label: 'List', // Default value
      link: '/list',
    });
  }

  // Add the current page
  breadcrumbs.push({
    meta: currentPage.type,
    label: currentPage.label,
    link: '#', // Current page has no link
  });

  return breadcrumbs;
};

// Define the view configuration with proper typing
const viewConfig: ViewConfigType = {
  overview: {
    icon: LayoutDashboard,
    label: 'Overview',
    path: '/home',
  },
  board: {
    icon: Grid,
    label: 'Board',
    path: '/board',
  },
  list: {
    icon: List,
    label: 'List',
    path: '/list',
  },
  calendar: {
    icon: Calendar,
    label: 'Calendar',
    path: '/calendar',
  },
};

// Default available views
const defaultViews: ViewType[] = ['overview', 'board', 'list', 'calendar'];

export const PageHeader = ({
  currentPage,
  parents,
  availableViews = defaultViews,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = buildBreadcrumbHierarchy(currentPage, parents);

  // Determine current view based on current path
  const getCurrentView = (): ViewType => {
    const path = location.pathname;
    const foundView = Object.entries(viewConfig).find(
      ([_, config]) => config.path === path
    );
    return (foundView?.[0] as ViewType) || 'overview';
  };

  const [currentView, setCurrentView] = useState<ViewType>(getCurrentView());

  // Update the current view when the path changes
  useEffect(() => {
    setCurrentView(getCurrentView());
  }, [location.pathname]);

  // Handle view button click
  const handleViewChange = (view: ViewType) => {
    const viewPath = viewConfig[view].path;
    navigate(viewPath);
    setCurrentView(view);
  };

  return (
    <div className="w-full sticky top-[--header-height] bg-background z-10">
      <div className="px-8 py-[14.7px] border-b border-border">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <BreadcrumbItem key={`${item.meta}-${index}`}>
                  {isLast ? (
                    <BreadcrumbPage className={'font-medium'}>
                      <BreadcrumbTypeContent
                        type={item.meta}
                        label={item.label}
                      />
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className={'font-medium'} href={item.link}>
                      <BreadcrumbTypeContent
                        type={item.meta}
                        label={item.label}
                      />
                    </BreadcrumbLink>
                  )}

                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* View Tabs */}
      <div className="flex pl-4 border-b border-border">
        <div className="flex">
          {availableViews.map((view) => {
            const ViewIcon = viewConfig[view].icon;
            const viewLabel = viewConfig[view].label;
            const isActive = view === currentView;

            return (
              <Button
                key={view}
                variant="ghost"
                onClick={() => handleViewChange(view)}
                className={`relative rounded-none h-10 px-4 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  {ViewIcon && <ViewIcon className="h-4 w-4" />}
                  <span>{viewLabel}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 center w-full h-0.5 bg-primary" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
