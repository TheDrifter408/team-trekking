import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import { IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils/utils.ts';
import { Assignee } from '@/types/props/Common';
import { RefreshCw } from 'lucide-react';

export interface AssigneeProps {
  assignee: Assignee;
  enterAssignee?: boolean;
  displayName: boolean;
  onRemove: () => void;
  className?: string;
  isSelected?: boolean;
  showAvatarRing?: boolean;
  showButtons?: boolean;
}

export const AssigneeAvatar = ({
  assignee,
  enterAssignee,
  onRemove,
  displayName,
  className,
  isSelected,
  showAvatarRing = false,
  showButtons = false,
}: AssigneeProps) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate a deterministic seed for consistent avatar images
  const getSeed = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash).toString();
  };

  return (
    <div
      className={cn(
        'group relative transition-all duration-200 flex items-center gap-2',
        className ? className : '',
        showButtons ? 'w-full' : 'w-min'
      )}
    >
      <div className="flex items-center gap-2 w-min">
        <Avatar className="h-5 w-5 border-2 border-white transition-all overflow-visible">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${getSeed(assignee.name)}`}
            alt={assignee.name}
            className={cn(
              'ring-2 rounded-full',
              showAvatarRing ? 'ring-purple-400' : 'ring-white'
            )}
          />
          <AvatarFallback className="bg-red-200 text-xs mx-auto p-1">
            {getInitials(assignee.name)}
          </AvatarFallback>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onRemove()}
            className={cn(
              'absolute -top-2 z-50 -right-2 h-4 w-4 p-0 rounded-full',
              enterAssignee && isSelected ? 'visible' : 'invisible',
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'flex items-center justify-center shadow-md',
              'focus:outline-none focus:ring-2 focus:ring-offset-1'
            )}
          >
            <IconX size={10} className="text-white" />
          </Button>
        </Avatar>
        <p
          className={cn(
            'text-nowrap text-black pr-3 bg-inherit',
            displayName ? 'block' : 'hidden'
          )}
        >
          {assignee.name}
        </p>
      </div>
      <div
        className={cn(
          'items-center self-end gap-1',
          showButtons ? 'flex' : 'hidden'
        )}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              asChild className={cn(
                'bg-white h-min p-1 rounded-sm text-muted-foreground invisible group-hover:visible'
              )}
            >
              <a>Profile
            </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Profile</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className={cn(
                'bg-white h-min p-1 rounded-sm text-muted-foreground invisible group-hover:visible'
              )}
            >
              <RefreshCw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove and Reassign</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
