'use client';

import {
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import { Bell, MessageSquare, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/shadcn-ui/sidebar.tsx';
import { Textarea } from '@/components/shadcn-ui/textarea.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { TaskActivityNotifications } from '@/routes/_authNoLayout/task/-components/task-activity-notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { filterOptions, taskNotificationUsers } from '@/mock';
import { TaskActivityFilters } from '@/routes/_authNoLayout/task/-components/task-activity-filters.tsx';
import { ButtonProps } from '@headlessui/react';
import TaskActivitySearch from '@/routes/_authNoLayout/task/-components/task-activity-search.tsx';

type SidebarTriggerProps = PropsWithChildren<ButtonProps>;

export const ActivitySidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ children, className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn(className, 'items-center justify-center h-auto')}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

ActivitySidebarTrigger.displayName = 'ActivitySidebarTrigger';

export const TaskSidebar = ({ ...props }) => {
  const [comment, setComment] = useState('');
  const [watching, setWatching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState(filterOptions);
  const [notifications, setNotifications] = useState(taskNotificationUsers);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onhandleSendComment = () => {
    if (comment.trim()) {
      setComment('');
    }
  };

  const onUnselectAll = () => {
    const allUnselected = filters.map((fil) => {
      fil.checked = false;
      return fil;
    });
    setFilters([...allUnselected]);
  };

  const onToggleSearch = (e: MouseEvent) => {
    e.stopPropagation();
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      // Focus the search input when it appears
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  const onToggleFilter = (id: string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sidebar
      collapsible="icon"
      side={'right'}
      className="top-[99px] !z-30 !h-[calc(100svh-110px)] border-l overflow-hidden [&>[data-sidebar=sidebar]]:flex-row-reverse"
      {...props}
    >
      {/* Mini sidebar with icons */}
      <Sidebar
        collapsible="none"
        side={'right'}
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-l"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {/* Activity/Chat icon with text below */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: 'Activity & Chat',
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2 flex flex-col items-center"
                  >
                    <ActivitySidebarTrigger className={'flex flex-col'}>
                      <MessageSquare className="mb-1" />
                    </ActivitySidebarTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Expanded sidebar content */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-2xl font-medium text-foreground">Activity</div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="w-[30px] ring-none"
                onClick={onToggleSearch}
                data-search-btn
              >
                <Search />
              </Button>
              {/* Notification Bell Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-[30px] relative"
                  >
                    <Bell />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <TaskActivityNotifications
                    watching={watching}
                    setWatching={setWatching}
                    taskNotificationUsers={taskNotificationUsers}
                    markNotificationAsRead={markNotificationAsRead}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <TaskActivityFilters
                toggleFilter={onToggleFilter}
                filters={filters}
                onUnSelectAll={onUnselectAll}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex flex-col flex-1 bg-background">
          {/* Activity feed section */}
          <SidebarGroup className="px-0 flex-1 overflow-y-auto">
            <SidebarGroupContent>
              <TaskActivitySearch showSearch={showSearch} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Row-based Comment input section at the bottom */}
        <SidebarFooter className="border-t p-4 bg-white">
          <div className="flex items-center border rounded-xl overflow-hidden px-2 ">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-10 text-base border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 py-2 px-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="outline"
              className="p-4 bg-theme-main-dark text-white"
              onClick={onhandleSendComment}
              disabled={!comment.trim()}
            >
              <span>Send</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
};
