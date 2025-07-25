'use client';

import { useState, ComponentProps } from 'react';
import { CompassIcon, Plus, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils/utils.ts';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/shadcn-ui/sidebar';
import { sidebarData } from '@/mock';
import { CreateSpace } from '@/components/features/create-space.tsx';
import { NavGroup } from '@/components/layout/nav-group.tsx';
import { Collapsible } from '@/components/shadcn-ui/collapsible.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { SidebarSpaceItems } from '@/components/layout/sidebar-space-items.tsx';
import { SidebarFolderItems } from '@/components/layout/sidebar-folder-items.tsx';
import { SidebarListItems } from '@/components/layout/sidebar-list-items.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip.tsx';
import { InviteUser } from '@/components/features/invite-user.tsx';
import { NavUser } from '@/components/layout/nav-user.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { ContextMenu } from '@/components/common/context-menu.tsx';
import { spacesMenuConfig } from '@/lib/constants/staticData.ts';
import { WorkspaceSwitcher } from '@/components/layout/workspace-switcher.tsx';
import {
  Folder,
  List,
  Space,
  WorkSpaceResponse,
  WorkspaceSpaceFolderList,
} from '@/types/request-response/workspace/ApiResponse';

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  workSpaces: WorkSpaceResponse[] | undefined;
  refetchWorkspaces: () => void;
  isFetching: boolean;
  spacesFolderList: WorkspaceSpaceFolderList | undefined;
  refetchSpaces: () => void;
}

export const AppSidebar = ({
  workSpaces,
  refetchWorkspaces,
  refetchSpaces,
  isFetching,
  spacesFolderList,
  ...props
}: AppSidebarProps) => {
  const { state } = useSidebar();
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const isOpen = state !== 'collapsed';

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        'h-[calc(100%-45px)] border-r',
        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
        'mt-[46px]'
      )}
      {...props}
    >
      <SidebarHeader className="border-b py-0">
        <WorkspaceSwitcher
          workspaces={workSpaces ?? []}
          onCreatedWorkspace={refetchWorkspaces}
          onWorkspaceChange={refetchSpaces}
        />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}

        {isOpen ? (
          <Collapsible className="group/collapsible">
            <SidebarGroup className="gap-1">
              <div className="flex justify-between items-center">
                <SidebarGroupLabel className="text-xs font-medium tracking-wider">
                  {LABEL.SPACES}
                </SidebarGroupLabel>
                <div className="flex gap-2">
                  <ContextMenu
                    trigger={
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5 pl-2"
                      >
                        <Icon name="menu03" />
                      </Button>
                    }
                    sections={spacesMenuConfig}
                    width="w-64"
                    onItemClick={() => {}}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5"
                    onClick={() => setInviteUserOpen(true)}
                  >
                    <Icon name="useradd" />
                  </Button>
                  <Button
                    size="icon_sm"
                    className="h-6 w-6 bg-theme-main"
                    onClick={() => setIsCreateSpaceOpen(true)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-2 font-normal text-base hover:bg-muted"
              >
                <Icon name="menu02" className="w-4 h-4 mr-2" />
                {LABEL.EVERYTHING}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 font-normal text-base hover:bg-muted"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {LABEL.SHARED_WITH_ME}
              </Button>

              {isFetching || spacesFolderList === undefined ? (
                <SidebarSpaceSkeleton />
              ) : (
                spacesFolderList?.spaces.map((space: Space) => (
                  <SidebarSpaceItems
                    key={space.id}
                    space={space}
                    onCreatedChildren={refetchSpaces}
                  >
                    {space.folders.map((folder: Folder) => (
                      <SidebarFolderItems
                        key={folder.id}
                        name={folder.name}
                        folder={folder}
                        onItemClick={() => {}}
                        onCreatedChildren={refetchSpaces}
                      />
                    ))}
                    {space.lists.map((list: List) => (
                      <SidebarListItems key={list.id} listItem={list} />
                    ))}
                  </SidebarSpaceItems>
                ))
              )}
              <Button
                onClick={() => setIsCreateSpaceOpen(true)}
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-content-default font-normal hover:bg-muted rounded-lg text-base"
              >
                <Plus className="h-4 w-4 mr-2" />
                {LABEL.CREATE_SPACE}
              </Button>
            </SidebarGroup>
          </Collapsible>
        ) : (
          <SidebarGroup className="justify-center flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CompassIcon className="text-indigo-600" size={20} />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  Spaces
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
      <CreateSpace
        createSpaceOpen={isCreateSpaceOpen}
        setCreateSpaceOpen={setIsCreateSpaceOpen}
        onCreatedSpace={refetchSpaces}
      />
      <InviteUser
        inviteUserOpen={inviteUserOpen}
        setInviteUserOpen={setInviteUserOpen}
        onInvite={() => {}}
        maxInvites={10}
      />
    </Sidebar>
  );
};

const SidebarSpaceSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2 px-2">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="ml-4 space-y-1">
            {[...Array(2)].map((_, subIdx) => (
              <div key={subIdx} className="h-3 w-2/3 bg-gray-200 roudned" />
            ))}
            {[...Array(2)].map((_, subIdx) => (
              <div key={subIdx} className="h-3 w-1/3 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
