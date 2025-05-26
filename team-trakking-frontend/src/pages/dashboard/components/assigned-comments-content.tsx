import { assignedCommentData } from '@/mock';
import { CardContent } from '@/components/ui/card.tsx';
import { HoverableCard } from './hoverable-card.tsx';
import { cn } from '@/lib/utils.ts';
import { AssignedComment } from '@/types/props/common.ts';

interface Props {
  expanded: boolean;
  onExpand: (cardTitle: string) => void;
  cardTitle: string;
}

export const AssignedCommentsContent = ({
  expanded,
  onExpand,
  cardTitle,
}: Props) => {
  return (
    <AssignedComments
      isExpanded={expanded}
      onExpand={onExpand}
      cardTitle={cardTitle}
    />
  );
};

function AssignedComments({
  isExpanded,
  onExpand,
  cardTitle,
}: {
  isExpanded: boolean;
  onExpand: (title: string) => void;
  cardTitle: string;
}) {
  return (
    <HoverableCard
      isExpanded={isExpanded}
      title="Assigned comments"
      onExpand={() => onExpand(cardTitle)}
    >
      <CardContent
        className={cn(
          'overflow-y-auto space-y-3 px-2',
          isExpanded ? 'flex-grow pb-[90px]' : 'max-h-[270px]'
        )}
      >
        <Content
          comments={assignedCommentData}
          className={isExpanded ? 'flex-grow' : ''}
        />
      </CardContent>
    </HoverableCard>
  );
}

function Content({
  comments,
  className,
}: {
  comments: AssignedComment[];
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {comments.map((item) => (
        <AssignedCommentItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function AssignedCommentItem({ item }: { item: AssignedComment }) {
  return (
    <div className="flex w-full items-start hover:bg-accent p-2 rounded-sm cursor-default transition-colors">
      <div className="flex space-x-3 w-full">
        <img
          src={item.imageUrl}
          alt={`Avatar for comment ${item.id}`}
          className="h-6 w-6 rounded-full shrink-0"
        />
        <div className="flex flex-col w-full min-w-0">
          <span className="text-base w-full break-words">{item.comment}</span>
          <div className="flex justify-between w-full mt-1 gap-2">
            <span className="text-xs text-muted-foreground truncate flex-1">
              {item.taskName}
            </span>
            <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
              {item.commentTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
