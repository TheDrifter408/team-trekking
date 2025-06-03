import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  assignee: string;
  enterAssignee?: boolean;
  onRemove: (id: number) => void;
}

export const AssigneeAvatar = ({
  assignee,
  enterAssignee,
  onRemove,
}: Props) => {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group relative z-0 hover:z-10 transition-all duration-200">
            <Avatar className="h-6 w-6 border-2 border-white group-hover:ring-2 group-hover:ring-purple-300 transition-all">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${getSeed(assignee)}`}
                alt={assignee}
              />
              <AvatarFallback className="bg-accent text-xs">
                {getInitials(assignee)}
              </AvatarFallback>
            </Avatar>
            {enterAssignee && (
              <Button
                size="icon"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(Number(assignee));
                }}
                className={cn(
                  'absolute -top-2 -right-2 h-4 w-4 p-0 rounded-full',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'flex items-center justify-center shadow-md',
                  'focus:outline-none focus:ring-2 focus:ring-offset-1'
                )}
              >
                <IconX size={10} className="text-white" />
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{assignee}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
