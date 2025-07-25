import { cn } from '@/lib/utils/utils.ts';
import { Bell, BellOff, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { DropdownMenuSeparator } from '@/components/shadcn-ui/dropdown-menu.tsx';
import { TaskActivityNotificationsProps } from '@/types/props/Common';
import { LABEL } from '@/lib/constants';
import { AssigneeAvatar } from '@/components/common/assignee-avatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';

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
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [taskNotificationUsers, searchTerm]);

  return (
    <div className="p-2 space-y-2">
      {/* Watch/Unwatch Section */}
      <div className="space-y-2">
        <div
          className={cn(
            'rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors',
            watching && 'border-blue-200 bg-blue-50'
          )}
          onClick={() => setWatching(true)}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Bell size={16} className="text-gray-600" />
                <div className="text-sm text-gray-900">{LABEL.WATCH}</div>
              </div>
              {watching && <Check size={16} className="text-blue-600" />}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {LABEL.NOTIFY_ME_ON_ALL_ACTIVITY_FOR_THIS_TASK}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors',
            !watching && 'border-blue-200 bg-blue-50'
          )}
          onClick={() => setWatching(false)}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <BellOff size={16} className="text-blue-600" />
                <div className="text-sm text-blue-600">{LABEL.UN_WATCH}</div>
              </div>
              {!watching && <Check size={16} className="text-blue-600" />}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {LABEL.NOTIFY_ME_ONLY_ON_MENTIONS_OR_ASSIGNMENT}
            </div>
          </div>
        </div>
      </div>

      <DropdownMenuSeparator />

      {/* Search Watchers */}
      <Command className="my-4 [command-input-wrapper]-my-2">
        <CommandInput
          value={searchTerm}
          onValueChange={(searchString) => setSearchTerm(searchString)}
          placeholder={LABEL.SEARCH_WATCHER}
          className="w-full px-1 py-0 rounded-lg text-sm ring-0 focus:outline-0"
        />
        <CommandList>
          <CommandEmpty>
            {`${LABEL.NO_WATCHERS_FOUND_MATCHING} "${searchTerm}"`}
          </CommandEmpty>
          <CommandGroup
            heading={
              <div className="text-xs text-gray-400 ">
                {filteredUsers.length} people watching
                {searchTerm &&
                  filteredUsers.length !== taskNotificationUsers.length && (
                    <span className="ml-1">
                      (filtered from {taskNotificationUsers.length})
                    </span>
                  )}
              </div>
            }
            className="mt-1"
          >
            {/* Watchers List */}
            {filteredUsers.map((notification) => (
              <CommandItem
                key={notification.id}
                onSelect={() => markNotificationAsRead(notification.id)}
              >
                <AssigneeAvatar
                  assignee={notification}
                  displayName={true}
                  onRemove={() => {}}
                  className="justify-between"
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};
