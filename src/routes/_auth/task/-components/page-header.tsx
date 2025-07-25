import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/shadcn-ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  ChevronUp,
  ChevronDown,
  Slash,
  Lock,
  LogOut,
  Plus,
  X,
  Ellipsis,
  SidebarIcon,
  Star,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { ShareTask } from '@/components/features/share-task.tsx';
import MoveTask from '@/components/common/move-task.tsx';
import { useNavigate } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/shadcn-ui/dropdown-menu';

export const PageHeader = ({
  onToggleSidebarOpen,
}: {
  onToggleSidebarOpen: () => void;
}) => {
  const [openShareTask, setOpenShareTask] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickClose = () => {
    navigate({ to: '/home' });
  };

  return (
    <div className="py-2 bg-sidebar w-full flex items-center sticky top-0 justify-between px-4">
      <TooltipProvider>
        <div className="relative flex items-center justify-between">
          <Button onClick={onToggleSidebarOpen} variant={'ghost'}>
            <SidebarIcon />
          </Button>
          <Button size="icon_sm" variant="ghost">
            <ChevronUp size={12} />
          </Button>
          <Button size="icon_sm" variant="ghost">
            <ChevronDown />
          </Button>
          <Breadcrumb className="pl-2">
            <BreadcrumbList className="flex-nowrap overflow-hidden text-nowrap">
              <BreadcrumbItem className="space-x-1">
                <div className="h-[16px] w-[16px] bg-blue-700 text-primary-foreground font-medium flex items-center justify-center rounded">
                  S
                </div>
                <Lock
                  size={12}
                  className="text-primary font-medium text-base"
                />
                <BreadcrumbLink
                  href="/folder"
                  className="text-primary font-medium p-0 md:p-1 rounded-md hover:bg-accent"
                >
                  Space Shuttle
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Slash size={11} className="transform -rotate-[20deg]" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/folder"
                  className="text-primary font-medium p-0 md:p-1 rounded-md hover:bg-accent"
                >
                  Steps List
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="w-[1px] h-[16px] mx-2 md:mx-4 bg-border" />
          <ToolTipContainer text="Move to parent task">
            <MoveTask
              child={
                <Button size="icon_sm" variant="ghost">
                  <LogOut />
                </Button>
              }
            />
          </ToolTipContainer>
          <ToolTipContainer text="Add subtask to another list">
            <Button size="icon_sm" variant="ghost">
              <Plus />
            </Button>
          </ToolTipContainer>
        </div>
        <div className="flex space-x-1 md:space-x-3 items-center justify-between">
          <div className="invisible lg:visible">
            <span className="text-sm text-pretty mr-2">Created on Mar 2</span>
            <Button
              onClick={() => setOpenShareTask(true)}
              size={'sm'}
              className="text-base"
            >
              Share
            </Button>
          </div>
          <div className="w-[1px] h-[18px] bg-border" />
          <div className="flex gap-1">
            <ToolTipContainer text="Task settings">
              <Button size="icon" variant="ghost">
                <Ellipsis className="size-5 text-primary" />
              </Button>
            </ToolTipContainer>
            <ToolTipContainer text="Add to favorites">
              <Button variant="ghost">
                <Star className="size-5 text-primary  hover:bg-slate-200" />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="size-5 border-l text-primary hover:bg-slate-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    className="-translate-x-10"
                  >
                    <DropdownMenuItem>Favorites</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ArrowUp /> Top
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDown /> Down
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Another List</DropdownMenuItem>
                    <DropdownMenuItem>Personal Priorities</DropdownMenuItem>
                    <DropdownMenuItem>Personal List</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            </ToolTipContainer>
            <ToolTipContainer text="Close window" side={'left'}>
              <Button size="icon" variant="ghost" onClick={onClickClose}>
                <X className="size-5 text-primary" />
              </Button>
            </ToolTipContainer>
          </div>
        </div>
      </TooltipProvider>
      <ShareTask
        open={openShareTask}
        onOpenChange={() => setOpenShareTask(!openShareTask)}
      />
    </div>
  );
};

const ToolTipContainer = ({
  children,
  text,
  side = 'bottom',
}: {
  children: React.ReactNode;
  text: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
