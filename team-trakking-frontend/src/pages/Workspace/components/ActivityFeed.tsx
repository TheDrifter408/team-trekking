import { ArrowUpRight, Clock } from 'lucide-react';

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
}

export const ActivityFeed = ({ activities, onViewAll }: ActivityFeedProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center mb-1">
          <Clock className="mr-2 h-5 w-5 text-blue-500" />
          <h3 className="text-lg text-text-primary font-medium">
            Recent Activity
          </h3>
        </div>
        <p className="text-sm text-text-muted">
          Latest actions in this workspace
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-3 border-b border-gray-100"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={'https://i.pravatar.cc/200'}
                  alt={activity.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium text-text-light">
                    {activity.userName}{' '}
                  </span>
                  <span className="text-text-muted text-sm">
                    {activity.action}{' '}
                  </span>
                  <span className="text-text-light text-sm">
                    {activity.itemName}
                  </span>
                </p>
                <p className="text-xs text-text-muted">{activity.timestamp}</p>
              </div>
            </div>
          ))}
          <div
            className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer"
            onClick={onViewAll}
          >
            <span>View all activity</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
