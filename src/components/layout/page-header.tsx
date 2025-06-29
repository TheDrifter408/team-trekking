import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  IconHomeFilled,
  IconFolderFilled,
  IconList,
  IconCheckbox,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils/utils.ts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn-ui/breadcrumb';
import { Icon } from '@/assets/icon-path';
import { HeaderType } from '@/types/props/Common.ts';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { ViewType } from '@/lib/context/page-header-context.tsx';
import { Calendar, Grid, LayoutDashboard, List } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { BreadcrumbMenuDropdown } from '@/components/common/breadcrumb-menu-dropdown.tsx';
import { PlaceholderAvatar } from '@/components/common/avatar-generator.tsx';

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

  const onViewChange = (view: ViewType) => {
    const viewPath = viewConfig[view].path;
    navigate(viewPath);
    setCurrentView(view);
  };
  return (
    <div className={cn('sticky top-0 z-20 w-full')}>
      <div className="px-8 h-[50px] flex items-center border-b">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isCurrentPage = item.link === '#';

              return (
                <BreadcrumbItem key={`${item.meta}-${index}`}>
                  {isLast || isCurrentPage ? (
                    <BreadcrumbPage className={'font-medium'}>
                      <BreadcrumbTypeContent
                        type={item.meta}
                        label={item.label}
                      />
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className={'font-medium'} asChild>
                      <ReactRouterBreadcrumbLink to={item.link}>
                        <BreadcrumbTypeContent
                          type={item.meta}
                          label={item.label}
                        />
                      </ReactRouterBreadcrumbLink>
                    </BreadcrumbLink>
                  )}
                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <BreadcrumbMenuDropdown onAction={() => {}}>
          <Button variant={'ghost'} className={'ml-1'}>
            <Icon name={'menu03'} className={'size-5'} />
          </Button>
        </BreadcrumbMenuDropdown>
      </div>

      {/* View Tabs */}
      <div className="flex pl-4 border-r border-b pt-[10px]">
        <div className="flex">
          {availableViews.map((view) => {
            const ViewIcon = viewConfig[view].icon;
            const viewLabel = viewConfig[view].label;
            const isActive = view === currentView;

            return (
              <Button
                key={view}
                variant="ghost"
                onClick={() => onViewChange(view)}
                className={`relative rounded-none h-10 px-4 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  {ViewIcon && <ViewIcon className="h-4 w-4" />}
                  <span>{viewLabel}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Map header types to their respective UI components
const BreadcrumbTypeIcons: Record<HeaderType, React.ReactNode> = {
  HOME: <IconHomeFilled size={14} className="text-content-tertiary" />,
  SPACE: null, // space uses initials instead of an icon
  FOLDER: <IconFolderFilled size={16} className="text-content-tertiary" />,
  LIST: <IconList size={16} className="text-content-tertiary" />,
  TASK: <IconCheckbox size={16} className="text-content-tertiary" />,
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
        <PlaceholderAvatar
          className={'size-[22px] rounded-sm'}
          seed={label}
          variant={'initials'}
        />
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

// Custom BreadcrumbLink component that uses React Router Link
const ReactRouterBreadcrumbLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'transition-colors hover:text-foreground text-muted-foreground',
        className
      )}
    >
      {children}
    </Link>
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
