import React, { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import {
  Activity,
  ActivityItemProps,
  ActivitySearchProps,
  StatusBadgeProps,
} from '@/types/interfaces/activitySearch';
import { activitySearchData } from '@/mock/activitySearchData.ts';
import { LABEL } from '@/lib/constants';
import { Comment } from '@/routes/_auth/task/-components/Comment';

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'sprint backlog':
        return 'bg-yellow-500';
      case 'in progress':
        return 'bg-green-500';
      case 'completed':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded-sm ${getStatusColor(status)}`}></span>
      <span className="text-gray-600 text-sm">{status}</span>
    </span>
  );
};

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  return (
    <div className="flex items-start gap-3 py-2 px-1 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0 w-1 h-1 bg-gray-400 rounded-full mt-2"></div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <span className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{activity.user}</span>{' '}
              <span>{activity.action}</span>
              {activity.fromStatus && activity.toStatus && (
                <span className="ml-1">
                  <StatusBadge status={activity.fromStatus} />
                  <span className="text-gray-600 mx-1">to</span>
                  <StatusBadge status={activity.toStatus} />
                </span>
              )}
              {activity.target && !activity.fromStatus && (
                <span className="font-medium text-gray-900 ml-1">
                  {activity.target}
                </span>
              )}
            </span>
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
            {activity.timestamp}
          </span>
        </div>

        {activity.hasAttachment && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded border flex items-center justify-center">
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                image.png
              </span>
            </div>
          </div>
        )}

        {activity.hasMultipleAttachments && (
          <div className="mt-2 flex gap-2">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded border flex items-center justify-center">
                  <FileText className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs text-gray-700">File 1</span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded border flex items-center justify-center">
                  <FileText className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs text-gray-700">File 2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TaskActivitySearch: React.FC<ActivitySearchProps> = ({ showSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredActivities = useMemo<Activity[]>(() => {
    if (!searchQuery.trim()) return activitySearchData;

    return activitySearchData.filter((activity) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        activity.user.toLowerCase().includes(searchLower) ||
        activity.action.toLowerCase().includes(searchLower) ||
        activity.target?.toLowerCase().includes(searchLower) ||
        activity.fromStatus?.toLowerCase().includes(searchLower) ||
        activity.toStatus?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Search Bar */}
      {showSearch && (
        <div className="sticky top-0 px-4 py-2 bg-white">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={LABEL.SEARCH}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-8 pr-4 py-2 border-2 border-blue-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div className="px-4 pb-2">
        <div className="space-y-1">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => {
              return activity.isComment && activity.comment ? (
                <Comment comment={activity.comment} />
              ) : (
                <ActivityItem key={activity.id} activity={activity} />
              )
            })
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {LABEL.NO_ACTIVITIES_FOUND}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {LABEL.TRY_ADJUSTING_YOUR_SEARCH_TERMS}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskActivitySearch;
