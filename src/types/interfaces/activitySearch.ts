import { LucideIcon } from 'lucide-react';

export interface Activity {
  id: number;
  type: string;
  user: string;
  action: string;
  target?: string;
  timestamp: string;
  icon: LucideIcon;
  hasAttachment?: boolean;
  hasMultipleAttachments?: boolean;
  fromStatus?: string;
  toStatus?: string;
}

export interface StatusBadgeProps {
  status: string;
}

export interface ActivityItemProps {
  activity: Activity;
}

export interface ActivitySearchProps {
  showSearch: boolean;
}
