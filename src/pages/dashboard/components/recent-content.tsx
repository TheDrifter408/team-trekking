import { FC } from 'react';
import { List, Folder } from 'lucide-react';
import { CardContent } from '@/components/shadcn-ui/card';
import { HoverableCard } from './hoverable-card';
import { cn } from '@/lib/utils/utils.ts';
import { WorkSpaceRecent } from '@/types/request-response/workspace/ApiResponse.ts';

interface Props {
  data: WorkSpaceRecent[];
  isExpanded: boolean;
  onExpand: (cardTitle: string) => void;
  cardTitle: string;
}

const RecentContent = ({ data, isExpanded, onExpand, cardTitle }: Props) => (
  <Recents
    data={data}
    isExpanded={isExpanded}
    onExpand={onExpand}
    cardTitle={cardTitle}
  />
);

const Recents: FC<Props> = ({ data, isExpanded, onExpand, cardTitle }) => (
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
      <Content data={data} className={isExpanded ? 'flex-grow' : ''} />
    </CardContent>
  </HoverableCard>
);

interface ContentProps {
  data: WorkSpaceRecent[];
  className?: string;
}

const Content: FC<ContentProps> = ({ data, className }) => (
  <div className={cn('space-y-1', className)}>
    {data.map((item, index) => {
      const Icon = item.type === 'List' ? List : Folder;
      return (
        <div
          key={index}
          className="flex items-center cursor-default space-x-3 hover:bg-accent py-1 rounded"
        >
          <div className="flex items-center space-x-3 hover:bg-accent py-1 rounded">
            <div className="w-[20px] shrink-0">
              <Icon size={15} className="text-muted-foreground" />
            </div>
            <div className="flex min-w-0 items-center space-x-4">
              <span className="truncate text-base font-normal ">
                {item.name}
              </span>
              <span className="truncate text-muted-foreground text-base ">
                {item.location.name}
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
export { RecentContent, Content };
