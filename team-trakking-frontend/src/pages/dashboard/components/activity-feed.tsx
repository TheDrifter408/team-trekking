import { ArrowUpRight, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Define Activity interface
interface Activity {
  id: number;
  userName: string;
  userAvatar: string;
  action: string;
  itemName: string;
  itemType: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  onViewAll?: () => void;
  className?: string;
}

export const ActivityFeed = ({
  activities,
  onViewAll,
  className = '',
}: ActivityFeedProps) => {
  return (
    <Card className={`shadow-sm flex flex-col h-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions in this workspace</CardDescription>
        </div>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow overflow-auto py-0">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={activity.userAvatar}
                  alt={activity.userName}
                />
                <AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.userName}</span>{' '}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>{' '}
                  <span className="font-medium">{activity.itemName}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Button
        variant="ghost"
        size={'sm'}
        onClick={onViewAll}
        className="text-sm justify-center items-center text-blue-600 hover:text-blue-800  font-medium"
      >
        View all activity
        <ArrowUpRight className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
};
