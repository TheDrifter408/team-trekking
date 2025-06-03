import { useState } from 'react';
import { ChevronDown, Icon, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/shadcn-ui/sidebar';
import { CreateWorkspace } from '@/components/create-workspace.tsx';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

export function WorkspaceSwitcher({
  workspaces,
}: {
  workspaces: {
    id: number;
    name: string;
    logo?: string;
    plan: string;
    color?: string;
    member: number;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  const onOpenDialog = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 10);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className={'h-[47px] items-center flex'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-10 w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground"
                style={{
                  backgroundColor:
                    activeWorkspace.logo === undefined
                      ? activeWorkspace.color
                      : undefined,
                }}
              >
                {activeWorkspace.logo ? (
                  <img
                    src={activeWorkspace.logo}
                    alt={activeWorkspace.name}
                    className="size-4 shrink-0 object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div>{activeWorkspace.name?.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">
                  {activeWorkspace.name}
                </span>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'bottom'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <div>Switch Workspace</div>
                <Icon name={'search'} iconNode={[]} />
              </div>
            </DropdownMenuLabel>
            <div
              className={`max-h-[250px] ${workspaces.length >= 5 ? 'overflow-y-auto' : ''}`}
            >
              {workspaces.map(
                (workspace) =>
                  workspace.id !== activeWorkspace.id && (
                    <DropdownMenuItem
                      key={workspace.name}
                      onClick={() => setActiveWorkspace(workspace)}
                      className="gap-2 p-2 hover:!bg-gray-200 focus:!outline-none"
                    >
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                              {workspace.logo ? (
                                <div className="flex size-8 items-center justify-center rounded-sm">
                                  <img
                                    src={workspace.logo}
                                    alt={workspace.name}
                                    className="size-4 shrink-0 object-cover w-full h-full rounded-sm"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="flex aspect-square size-8 items-center justify-center rounded-md font-semibold text-sidebar-primary-foreground"
                                  style={{ backgroundColor: workspace.color }}
                                >
                                  {workspace.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div className="grid flex-1">
                                <span className="truncate text-base font-medium text-gray-900">
                                  {workspace.name}
                                </span>
                                <span className="truncate text-xs text-gray-600">
                                  {workspace.plan}
                                </span>
                              </div>
                            </div>
                          </TooltipTrigger>

                          <TooltipContent
                            className="bg-black text-white shadow-lg px-3 py-2 rounded-md"
                            side="top"
                            sideOffset={4}
                          >
                            <TooltipArrow
                              className="fill-black"
                              style={{
                                width: '10px',
                                height: '5px',
                              }}
                            />
                            <p className="font-medium text-sm">
                              {workspace.member} Members
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DropdownMenuItem>
                  )
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2 hover:!bg-gray-200 focus:!outline-none cursor-pointer"
              onClick={onOpenDialog}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground ">
                Create workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateWorkspace
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onOpenDialog={onOpenDialog}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
