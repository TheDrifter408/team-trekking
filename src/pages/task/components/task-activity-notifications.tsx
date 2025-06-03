import { cn } from '@/lib/utils.ts';
import { Bell, BellOff } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { TaskActivityNotificationsProps } from '@/types/props/Common';

export const TaskActivityNotifications = ({
  watching,
  setWatching,
  taskNotificationUsers,
  markNotificationAsRead,
}: TaskActivityNotificationsProps) => {
  return (
    <div className=" items-center justify-between px-1 py-2 space-y-2">
      <div
        className={cn(
          'border rounded-lg py-2 px-2 cursor-pointer',
          !watching && 'bg-blue-100'
        )}
        onClick={() => setWatching(false)}
      >
        <div className="flex items-center gap-2">
          <Bell size={14} />
          <span className={'text-base'}>Watch</span>
        </div>
        <div className="">
          <span className="text-xs">
            Notify me on all activity for this task
          </span>
        </div>
      </div>
      <div
        className={cn(
          'border rounded-lg py-2 px-2 cursor-pointer',
          watching && 'bg-blue-100'
        )}
        onClick={() => setWatching(true)}
      >
        <div className="flex items-center gap-2">
          <BellOff size={14} />
          <span className={'text-base'}>Unwatch</span>
        </div>
        <div className="">
          <span className="text-xs">
            Notify me on only @mentions or assignment.
          </span>
        </div>
      </div>
      <DropdownMenuSeparator />

      <div className="space-y-1">
        {taskNotificationUsers.length > 0 ? (
          taskNotificationUsers.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              className="py-1 px-2 cursor-pointer border space-y-2 flex items-center"
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full overflow-hidden',
                  notification.isWatching && 'ring-2 ring-ring'
                )}
              >
                <img
                  src={notification.avatar}
                  alt={notification.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm truncate">{notification.userName}</div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-3 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};
