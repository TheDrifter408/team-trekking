import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/shadcn-ui/sidebar';
import { Bell, LucideIcon, Search } from 'lucide-react';
import { TaskActivityNotifications } from './task-activity-notifications';
import { TaskActivityFilters } from './task-activity-filters';
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { filterOptions, taskNotificationUsers } from '@/mock';
import TaskActivitySearch from './task-activity-search';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { Assignee } from '@/types/props/Common';

interface TaskActivityHeaderProps {
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  watching: boolean;
  setWatching: Dispatch<SetStateAction<boolean>>;
  filters: {
    id: string;
    icon: LucideIcon;
    label: string;
    checked: boolean;
  }[];
  setFilters: Dispatch<
    SetStateAction<
      {
        id: string;
        icon: LucideIcon;
        label: string;
        checked: boolean;
      }[]
    >
  >;
  notifications: Assignee[];
  setNotifications: Dispatch<SetStateAction<Assignee[]>>;

}

const TaskActivityHeader = ({
  showSearch,
  setShowSearch,
  watching,
  setWatching,
  filters,
  setFilters,
  notifications,
  setNotifications,
}: TaskActivityHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onToggleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      // Focus the search input when it appears
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };
  const onUnselectAll = () => {
    const allUnselected = filters.map((fil) => {
      fil.checked = false;
      return fil;
    });
    setFilters([...allUnselected]);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const onToggleFilter = (id: string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
  };
  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-[30px] relative">
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
                taskNotificationUsers={notifications}
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
  );
};

interface TaskAcitivityFeedProps {
  showSearch: boolean;
}

const TaskActivityFeed = ({ showSearch }: TaskAcitivityFeedProps) => {
  return (
    <SidebarContent className="flex flex-col flex-1 bg-background">
      {/* Activity feed section */}
      <SidebarGroup className="px-0 flex-1 overflow-y-auto">
        <SidebarGroupContent>
          <TaskActivitySearch showSearch={showSearch} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const TaskAcitivityFooter = ({ taskId }: { taskId?: number }) => {
  const [comment, setComment] = useState('');
  const onhandleSendComment = () => {
    if (comment.trim()) {
      setComment('');
    }
  };
  return (
    /* Row-based Comment input section at the bottom */
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
  );
};

export const TaskActivity = ({ taskId }: { taskId?: number }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [watching, setWatching] = useState(false);
  const [notifications, setNotifications] = useState(taskNotificationUsers);
  const [filters, setFilters] = useState(filterOptions);

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <TaskActivityHeader
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        watching={watching}
        setWatching={setWatching}
        filters={filters}
        setFilters={setFilters}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <TaskActivityFeed showSearch={showSearch} />

      {/* Row-based Comment input section at the bottom */}
      <TaskAcitivityFooter taskId={taskId} />
    </Sidebar>
  );
};
