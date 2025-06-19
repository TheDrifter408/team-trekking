import { LucideIcon } from 'lucide-react';
import { Assignee } from '../props/Common';

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
  isComment: boolean;
  comment?: Comment
}
export interface Comment {
  assignee: Assignee,
  date:string,
  content: string,
  reply?: {
    count: number,
    author: Assignee
  }
}
export interface CommentProps {
  comment: Comment
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
