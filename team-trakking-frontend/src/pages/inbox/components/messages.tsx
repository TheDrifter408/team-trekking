import {
  Calendar,
  Circle,
  CircleDotDashed,
  MessageSquare,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InboxItem } from '@/types/props/common';

interface Props {
  items: InboxItem[];
}

export const Inbox = ({ items }: Props) => {
  return (
    <div className={'bg-card text-card-foreground rounded-xl border shadow-sm'}>
      {items.map((item, index) => (
        <div
          className={`h-12 flex items-center px-4 ${index !== items.length - 1 ? 'border-b' : ''}`}
          key={item.id}
        >
          <div className="flex items-center gap-2 w-[35%] min-w-[35%] pr-2">
            <Circle
              fill={item.color}
              size={14}
              color={item.color}
              className="flex-shrink-0"
            />
            <span className="text-base font-medium text-gray-500 truncate">
              {item.name}
            </span>
          </div>

          <div className="flex-shrink-0 w-[5%] flex justify-center">
            {item.type === 'Date' && <Calendar size={12} />}
            {item.type === 'Status' && <CircleDotDashed size={12} />}
            {item.type === 'Assign' && <User size={12} />}
            {item.type === 'Comment' && <MessageSquare size={12} />}
          </div>

          <div className="flex min-w-[50%] overflow-hidden relative pr-2">
            <div className="truncate">
              <span className="text-base font-medium">{item.message}</span>
              <span
                className={cn(
                  'text-base font-medium ml-1',
                  item.post_type === 'Success'
                    ? 'text-green-600'
                    : 'text-destructive'
                )}
              >
                {item.post_message}
              </span>
            </div>
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-card pointer-events-none"></div>
          </div>

          <div className="flex-shrink-0 w-[10%] text-right">
            <span className="text-sm font-medium">{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
