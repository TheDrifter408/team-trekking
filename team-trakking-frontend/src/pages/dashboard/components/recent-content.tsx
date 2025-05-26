import { FC } from 'react';
import { recentData } from '@/mock';
import { Circle, List } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { HoverableCard } from './hoverable-card';
import { cn } from '@/lib/utils';

interface Props {
  expanded: boolean;
  onExpand: (cardTitle: string) => void;
  cardTitle: string;
}

export const RecentContent = ({ expanded, onExpand, cardTitle }: Props) => (
  <Recents isExpanded={expanded} onExpand={onExpand} cardTitle={cardTitle} />
);

interface RecentsProps {
  isExpanded: boolean;
  onExpand: (title: string) => void;
  cardTitle: string;
}

const Recents: FC<RecentsProps> = ({ isExpanded, onExpand, cardTitle }) => (
  <HoverableCard
    isExpanded={isExpanded}
    title={cardTitle}
    onExpand={() => onExpand(cardTitle)}
  >
    <CardContent
      className={cn(
        'overflow-y-auto flex-grow !px-[10px]',
        isExpanded && 'pb-[90px]'
      )}
    >
      <Content className={isExpanded ? 'flex-grow' : ''} />
    </CardContent>
  </HoverableCard>
);

interface ContentProps {
  className?: string;
}

const Content: FC<ContentProps> = ({ className }) => (
  <div className={cn('space-y-1', className)}>
    {recentData.map((item, index) => {
      const Icon = item.type === 'List' ? List : Circle;
      return (
        <div
          key={index}
          className="flex items-center space-x-3 hover:bg-accent py-1 rounded"
        >
          <div className="w-[20px]">
            <Icon size={15} className={'text-muted-foreground'} />
          </div>
          <div className="relative w-[45%] shrink-0">
            <span className="block text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
              {item.name}
            </span>
          </div>
          <span className="text-muted-foreground w-[45%] text-base truncate">
            {item.location}
          </span>
        </div>
      );
    })}
  </div>
);
