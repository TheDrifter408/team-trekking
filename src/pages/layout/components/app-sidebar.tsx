'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { CompassIcon, Plus, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { sampleProjectsData, sidebarData, spaceData } from '@/mock';
import { NavGroup } from '@/components/layout/nav-group.tsx';
import { Collapsible } from '@/components/ui/collapsible.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SidebarSpaceItems } from '@/components/layout/sidebar-space-items.tsx';
import { SidebarFolderItems } from '@/components/layout/sidebar-folder-items.tsx';
import { SidebarListItems } from '@/components/layout/sidebar-list-items.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { CreateSpace } from '@/components/space/create-space.tsx';
import { InviteUser } from '@/components/invite-user.tsx';
import { NavUser } from '@/components/layout/nav-user.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { LABEL } from '@/lib/constants/strings.ts';
import { ContextMenu } from '@/components/context-menu.tsx';
import { spacesMenuConfig } from '@/lib/constants/staticData.ts';
import TaskDialog from '@/components/task-dialog.tsx';
import { WorkspaceSwitcher } from '@/components/layout/workspace-switcher.tsx';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();

  const [createSpaceOpen, setCreateSpaceOpen] = useState(false);
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  // Form states
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  // const [enterSpaceGroup, setEnterSpaceGroup] = useState<boolean>(false);
  const [privateAccess, setPrivateAccess] = useState(false);
  // Derived state
  const [initials, setInitials] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onHandleDuplicate = (data): void => {
    console.log('Duplicating task with data:', data);
    // Handle the duplication logic here
  };

  const onHandleOpenDialog = (): void => {
    setIsDialogOpen(true);
  };

  const onHandleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  // Generate initials based on space name
  useEffect(() => {
    if (spaceName) {
      const words = spaceName.split(' ');
      let iconValue = '';
      for (const first of words) {
        if (first === '') continue;
        iconValue += first.trim()[0];
      }
      if (iconValue.length > 3)
        setInitials(iconValue[0] + iconValue[iconValue.length - 1]);
      else setInitials(iconValue);
    } else {
      setInitials('');
    }
  }, [spaceName]);

  const onCreateSpace = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setPrivateAccess(false);
    setCreateSpaceOpen(false);
  };

  const onInviteUsers = () => {};

  const isOpen = state !== 'collapsed';
  return (
    <Sidebar
      collapsible={'icon'}
      className={cn(
        'h-[calc(100%-40px)]',
        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
        'mt-[40px]'
      )}
      {...props}
    >
      <SidebarHeader className={'border-b py-0'}>
        <WorkspaceSwitcher workspaces={sidebarData.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
        {isOpen ? (
          <Collapsible className="group/collapsible">
            <SidebarGroup className="gap-1">
              <div
                className="justify-between flex items-center"
                /* onMouseEnter={() => setEnterSpaceGroup(true)}
                 onMouseLeave={() => setEnterSpaceGroup(false)}*/
              >
                <SidebarGroupLabel className="text-xs font-medium  tracking-wider">
                  {LABEL.SPACES}
                </SidebarGroupLabel>
                <div className="flex gap-2">
                  <ContextMenu
                    trigger={
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        className={'h-5 w-5'}
                      >
                        <Icon name={'menu03'} />
                      </Button>
                    }
                    sections={spacesMenuConfig}
                    width="w-64"
                    onItemClick={() => {
                      setTimeout(() => {
                        onHandleOpenDialog();
                      }, 10);
                    }}
                  />
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                    className={'h-5 w-5'}
                    onClick={() => setInviteUserOpen(true)}
                  >
                    <Icon name={'search'} />
                  </Button>
                  <Button
                    size={'icon_sm'}
                    onClick={() => setCreateSpaceOpen(true)}
                    className={'h-6 w-6 bg-theme-main'}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 font-normal text-base hover:bg-muted"
              >
                <Icon name={'menu02'} className="w-4 h-4 mr-2" />
                {LABEL.EVERYTHING}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 font-normal text-base hover:bg-muted"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {LABEL.SHARED_WITH_ME}
              </Button>
              {spaceData.map((space) => (
                <SidebarSpaceItems key={space.id} name={space.name}>
                  {space.folders.map((folder) => (
                    <SidebarFolderItems
                      key={folder.id}
                      name={folder.name}
                      folder={folder}
                    />
                  ))}
                  {space.lists.map((listItem) => (
                    <SidebarListItems listItem={listItem} />
                  ))}
                </SidebarSpaceItems>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-muted-foreground hover:bg-muted rounded-none text-base"
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
                  <CompassIcon className={'text-indigo-600'} size={20} />
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
        createSpaceOpen={createSpaceOpen}
        setCreateSpaceOpen={setCreateSpaceOpen}
        spaceName={spaceName}
        setSpaceName={setSpaceName}
        description={description}
        setDescription={setDescription}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        privateAccess={privateAccess}
        setPrivateAccess={setPrivateAccess}
        initials={initials}
        onCreateSpace={onCreateSpace}
      />
      <InviteUser
        inviteUserOpen={inviteUserOpen}
        setInviteUserOpen={setInviteUserOpen}
        onInvite={onInviteUsers}
        maxInvites={10}
      />
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={onHandleCloseDialog}
        onDuplicate={onHandleDuplicate}
        initialTaskName="02.1 Creating Folder"
        projects={sampleProjectsData}
        defaultProject="final-initiative"
      />
    </Sidebar>
  );
};
