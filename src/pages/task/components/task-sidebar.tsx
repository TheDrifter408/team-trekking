'use client';
import {
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  useMemo,
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
import { cn } from '@/lib/utils.ts';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import { SearchBox } from '@/pages/task/components/search-activity.tsx';
import { TaskActivityNotifications } from '@/pages/task/components/task-activity-notifications.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { filterOptions, taskNotificationUsers } from '@/mock';
import { TaskActivityFilters } from '@/pages/task/components/task-activity-filters.tsx';
import { ButtonProps } from '@headlessui/react';

// This is sample activity data
const activityData: any[] = [];

type SidebarTriggerProps = PropsWithChildren<ButtonProps>;

const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn(className, 'items-center justify-center h-auto')}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

SidebarTrigger.displayName = 'SidebarTrigger';

export function TaskSidebar({ ...props }) {
  const [comment, setComment] = useState('');
  const [watching, setWatching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(filterOptions);
  const [notifications, setNotifications] = useState(taskNotificationUsers);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('Sending comment:', comment);
      setComment('');
    }
  };

  const toggleSearch = (e:MouseEvent) => {
    e.stopPropagation();
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      // Focus the search input when it appears
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    } else {
      // Clear search when closing
      setSearchQuery('');
    }
  };

  const toggleFilter = (id:string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
  };

  const markNotificationAsRead = (id:number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Filter activity data based on search query
  const filteredActivity = useMemo(() => {
    if (!searchQuery.trim()) return activityData;

    return activityData.filter(
      (item) =>
        item.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.action?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sidebar
      collapsible="icon"
      side={'right'}
      className="border-l h-full [&>[data-sidebar=sidebar]]:flex-row-reverse"
      {...props}
    >
      {/* Mini sidebar with icons */}
      <Sidebar
        collapsible="none"
        side={'right'}
        className="border-l"
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
                    <SidebarTrigger className={'flex flex-col'}>
                      <MessageSquare className="mb-1" />
                    </SidebarTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Expanded sidebar content */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3 border-b p-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              Activity
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="w-[30px] ring-none"
                onClick={toggleSearch}
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
                toggleFilter={toggleFilter}
                filters={filters}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex flex-col flex-1 bg-background">
          {/* Activity feed section */}
          <SidebarGroup className="px-0 flex-1 overflow-y-auto">
            <SidebarGroupContent>
              {showSearch && (
                <SearchBox
                  placeHolder="search comments..."
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                />
              )}

              {showSearch && searchQuery && filteredActivity.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  No results found for "{searchQuery}"
                </div>
              ) : filteredActivity.length > 0 ? (
                filteredActivity.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.avatar}
                        alt={item.user}
                        className="rounded-full h-6 w-6"
                      />
                      <span className="font-medium">{item.user}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {item.time}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.action}{' '}
                      {item.content && (
                        <span className="text-foreground">{item.content}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  No activity yet
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Row-based Comment input section at the bottom */}
        <SidebarFooter className="border-t p-4">
          <div className="flex flex-row border rounded-md overflow-hidden">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-12 bg-background text-sm border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 py-3 px-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Separator orientation="vertical" className="h-auto" />
            <Button
              variant="ghost"
              className="px-4 h-auto rounded-none bg-secondary"
              onClick={handleSendComment}
              disabled={!comment.trim()}
            >
              <span>Send</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
