import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Icon } from '@/assets/icon-path.tsx';
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
import { CreateWorkspace } from '@/components/features/create-workspace';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { LABEL } from '@/lib/constants';
import { WorkSpaceResponse } from '@/types/request-response/workspace/ApiResponse.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';

export function WorkspaceSwitcher({
  workspaces,
  onCreatedWorkspace,
}: {
  workspaces: WorkSpaceResponse[];
  onCreatedWorkspace: () => void;
}) {
  const { setCurrentWorkspace } = useWorkspaceStore();
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] =
    useState<WorkSpaceResponse | null>(
      workspaces.length > 0 ? workspaces[0] : null
    );
  const [showSearch, setShowSearch] = useState(false);
  const [searchWorkspace, setSearchWorkspace] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    setActiveWorkspace(workspaces[0]);
  }, [workspaces]);

  const onOpenDialog = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 10);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className={'h-12 items-center flex'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-10 w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:ml-0 data-[state=closed]:ml-1"
            >
              <div
                className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground"
                style={{
                  backgroundColor: activeWorkspace?.workspace?.color
                    ? activeWorkspace?.workspace?.color
                    : undefined,
                }}
              >
                {activeWorkspace?.workspace.iconUrl ? (
                  <img
                    src={activeWorkspace?.workspace?.iconUrl}
                    alt={activeWorkspace?.workspace?.name}
                    className="size-4 shrink-0 object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div className="text-center">
                    {activeWorkspace?.workspace?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="grid flex-1 text-sm text-left leading-tight">
                <span className="truncate font-semibold">
                  {activeWorkspace?.workspace?.name}
                </span>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg h-min no-scrollbar"
            align="start"
            side={isMobile ? 'bottom' : 'bottom'}
            sideOffset={4}
          >
            <div className="flex items-center gap-2 px-2 py-3 w-full">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground"
                style={{
                  backgroundColor: activeWorkspace?.workspace?.color
                    ? activeWorkspace?.workspace?.color
                    : undefined,
                }}
              >
                {activeWorkspace?.workspace?.iconUrl ? (
                  <img
                    src={activeWorkspace?.workspace?.iconUrl}
                    alt={activeWorkspace?.workspace?.name}
                    className="size-4 shrink-0 object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div>
                    {activeWorkspace?.workspace?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="grid leading-tight">
                <span className="truncate text-[14px]">
                  {activeWorkspace?.workspace?.name}
                </span>
                <span className="truncate font-normal text-sm text-gray-500">
                  {activeWorkspace?.workspace?.plan} .{' '}
                  {activeWorkspace?.workspace?.members} {LABEL.MEMBERS}
                </span>
              </div>
            </div>
            <div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'setting'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.SETTINGS}
                </span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'setting'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.UPGRADE}
                </span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'users'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.MANAGE_USERS}
                </span>
              </div>
            </div>
            <div className="">
              <DropdownMenuSeparator />
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'setting'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.APP_CENTER}
                </span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'setting'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.TEMPLATE_CENTER}
                </span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'fieldscreate'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.CUSTOM_FIELD_MANAGER}
                </span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                <Icon name={'thunder'}></Icon>
                <span className="truncate text-base font-normal text-gray-900">
                  {LABEL.AUTOMATIONS_MANAGER}
                </span>
              </div>
            </div>
            <div className="bg-workspace-popover">
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  {!showSearch && (
                    <div className={'text-base'}>{LABEL.SWITCH_WORKSPACE}</div>
                  )}
                  {showSearch && (
                    <div className="flex items-center border border-gray-900 rounded-md px-2 py-1 w-full shadow-sm gap-1">
                      <Icon name={'search'}></Icon>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search Workspaces..."
                        value={searchWorkspace}
                        onChange={(e) => setSearchWorkspace(e.target.value)}
                        className="outline-none flex-1 text-sm bg-transparent text-gray-900"
                      />
                      <button onClick={() => setShowSearch(false)}>
                        <Icon name={'close'} className="text-gray-900"></Icon>
                      </button>
                    </div>
                  )}

                  {!showSearch && (
                    <div
                      className="hover:bg-gray-200 curser-pointer p-2 rounded-md"
                      onClick={() => setShowSearch(true)}
                    >
                      <Icon name={'search'} className="size-3"></Icon>
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <div
                className={`max-h-[250px] ${workspaces.length >= 5 ? 'overflow-y-auto' : ''}`}
              >
                {workspaces.map(
                  (workspace) =>
                    workspace.id !== activeWorkspace?.id && (
                      <DropdownMenuItem
                        key={workspace.workspace?.id}
                        onClick={() => {
                          setActiveWorkspace(workspace);
                          setCurrentWorkspace({
                            id: workspace.workspace.id,
                            name: workspace.workspace.name,
                          });
                        }}
                        className="gap-2 p-2 hover:!bg-gray-200 focus:!outline-none"
                      >
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center gap-2 cursor-pointer">
                                {workspace.workspace?.iconUrl ? (
                                  <div className="flex size-8 items-center justify-center rounded-sm">
                                    <img
                                      src={workspace.workspace?.iconUrl}
                                      alt={workspace.workspace?.name}
                                      className="size-4 shrink-0 object-cover w-full h-full rounded-sm"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-md font-semibold text-sidebar-primary-foreground"
                                    style={{
                                      backgroundColor:
                                        workspace.workspace?.color,
                                    }}
                                  >
                                    {workspace.workspace?.name
                                      ?.charAt(0)
                                      .toUpperCase()}
                                  </div>
                                )}
                                <div className="grid flex-1">
                                  <span className="truncate text-base font-medium text-gray-900">
                                    {workspace.workspace?.name}
                                  </span>
                                  <span className="truncate text-xs text-gray-600">
                                    {workspace.workspace?.plan}
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
                                {workspace.workspace?.members} {LABEL.MEMBERS}
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
                  {LABEL.CREATE_WORKSPACE}
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateWorkspace
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onOpenDialog={onOpenDialog}
          onCreatedWorkspace={onCreatedWorkspace}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
