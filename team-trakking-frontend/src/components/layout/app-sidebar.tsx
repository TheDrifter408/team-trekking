import React, { useEffect, useState } from 'react';
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
import { Plus, CompassIcon } from 'lucide-react';
import { NavGroup } from '@/components/layout/nav-group';
import { NavUser } from '@/components/layout/nav-user';
import { TeamSwitcher } from '@/components/layout/team-switcher';
import { SidebarSpaceItems } from '@/components/layout/sidebar-space-items';
import { SidebarFolderItems } from '@/components/layout/sidebar-folder-items';
import { sidebarData, spaceData } from '@/mock';
import { Collapsible } from '@/components/ui/collapsible.tsx';
import { Button } from '@/components/ui/button';
import { CreateSpace } from '@/components/create-space.tsx';
import { SidebarListItems } from '@/components/layout/sidebar-list-items.tsx';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  const [createSpaceOpen, setCreateSpaceOpen] = useState(false);
  // Form states
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  const [privateAccess, setPrivateAccess] = useState(false);
  // Derived state
  const [initials, setInitials] = useState('');
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
    // Process the space creation with all form data
    console.log({
      name: spaceName,
      description,
      icon: selectedIcon,
      privateAccess,
    });

    // Reset the form
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setPrivateAccess(false);
    setCreateSpaceOpen(false);
  };

  const isOpen = state !== 'collapsed';

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
        {isOpen ? (
          <Collapsible className="group/collapsible">
            <SidebarGroup className="gap-1">
              <div className="justify-between flex items-center">
                <SidebarGroupLabel className="text-xs font-medium  tracking-wider">
                  Spaces
                </SidebarGroupLabel>
                <Button
                  size={'icon'}
                  onClick={() => setCreateSpaceOpen(true)}
                  className={'h-5 w-5'}
                >
                  <Plus size={14} />
                </Button>
              </div>
              {spaceData.map((space) => (
                <SidebarSpaceItems key={space.id} name={space.name}>
                  {space.folders.map((folder: any) => (
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
            </SidebarGroup>
          </Collapsible>
        ) : (
          <div className={'justify-between w-full flex items-center'}>
            <CompassIcon size={20} />
          </div>
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
    </Sidebar>
  );
}
