import { cn } from '@/lib/utils.ts';
import { Bell, BellOff, Search, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { DropdownMenuSeparator } from '@/components/shadcn-ui/dropdown-menu.tsx';
import { TaskActivityNotificationsProps } from '@/types/props/Common';
import { LABEL } from '@/lib/constants';
import { Input } from '@/components/shadcn-ui/input.tsx';

export const TaskActivityNotifications = ({
  watching,
  setWatching,
  taskNotificationUsers,
  markNotificationAsRead,
}: TaskActivityNotificationsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return taskNotificationUsers;

    return taskNotificationUsers.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [taskNotificationUsers, searchTerm]);

  return (
    <div className="w-fit p-2 space-y-2">
      {/* Watch/Unwatch Section */}
      <div className="space-y-2">
        <div
          className={cn(
            'border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors',
            !watching && 'border-blue-200 bg-blue-50'
          )}
          onClick={() => setWatching(false)}
        >
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-gray-600" />
            <div className="flex-1">
              <div className="text-lg text-gray-900">Watch</div>
              <div className="text-sm text-gray-500 mt-1">
                {LABEL.NOTIFY_ME_ON_ALL_ACTIVITY_FOR_THIS_TASK}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'border rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors',
            watching && 'border-blue-200 bg-blue-50'
          )}
          onClick={() => setWatching(true)}
        >
          <div className="flex items-center gap-3">
            <BellOff size={16} className="text-blue-600" />
            <div className="flex-1">
              <div className="text-lg text-blue-600 flex items-center gap-2">
                {LABEL.UN_WATCH}
                {watching && <Check size={16} className="text-blue-600" />}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {LABEL.NOTIFY_ME_ONLY_ON_MENTIONS_OR_ASSIGNMENT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DropdownMenuSeparator />

      {/* Search Watchers */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
          type="text"
          placeholder={LABEL.SEARCH_WATCHER}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
        />
      </div>

      {/* Watchers Count */}
      <div className="text-sm text-gray-400 font-medium">
        {filteredUsers.length} people watching
        {searchTerm &&
          filteredUsers.length !== taskNotificationUsers.length && (
            <span className="ml-1">
              (filtered from {taskNotificationUsers.length})
            </span>
          )}
      </div>

      {/* Watchers List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-1 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={notification.avatar}
                  alt={notification.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <div className="text-sm text-gray-900 truncate">
                    {notification.userName}
                  </div>
                  {notification.isWatching && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </div>
                {notification.lastActivity && (
                  <div className="text-xs text-gray-500">
                    {notification.lastActivity}
                  </div>
                )}
              </div>
              {notification.userName === 'Me' && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {LABEL.YOU}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            {searchTerm
              ? `${LABEL.NO_WATCHERS_FOUND_MATCHING} "${searchTerm}"`
              : LABEL.NO_WATCHERS_YET}
          </div>
        )}
      </div>
    </div>
  );
};
