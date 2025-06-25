'use client';

import * as React from 'react';
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
  SidebarSeparator,
} from '@/components/shadcn-ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SettingsIcon } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { useTMTStore } from '@/stores/zustand';
// @/data/settingsNav.ts
import {
  UsersIcon,
  UserCogIcon,
  BellIcon,
  Share2Icon,
  FolderKanbanIcon,
} from 'lucide-react';
import { NavGroup } from '@/components/layout/nav-group';
import { NavGroup as Nav } from '@/types/props/Layout';

const workspaceSettingsNav: Nav = {
  title: 'Workspace Settings',
  items: [
    {
      title: 'People',
      url: '/settings/people',
      icon: UsersIcon,
    },
    {
      title: 'Settings',
      url: '/settings/general',
      icon: SettingsIcon,
    },
  ],
};

const personalSettingsNav: Nav = {
  title: 'Personal Settings',
  items: [
    {
      title: 'My Settings',
      url: '/settings/profile',
      icon: UserCogIcon,
    },
    {
      title: 'Workspaces',
      url: '/settings/workspaces',
      icon: FolderKanbanIcon,
    },
    {
      title: 'Notifications',
      url: '/settings/notifications',
      icon: BellIcon,
    },
    {
      title: 'Referrals',
      url: '/settings/referrals',
      icon: Share2Icon,
    },
  ],
};

export const SettingsSidebar = (
  props: React.ComponentProps<typeof Sidebar>
) => {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const { user } = useTMTStore();
  const isOpen = state !== 'collapsed';

  const fullName = user?.userData.fullName ?? 'Jawahiir Nabhan';

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        'h-[calc(100%-45px)] border-r-[2px] mt-[44px] ',
        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]'
      )}
      {...props}
    >
      <SidebarHeader className="border-b !px-0">
        <div
          onClick={() => navigate('/home')}
          className="space-x-3 flex items-center m-1 p-1.5 rounded-lg hover:bg-gray-200/60 cursor-pointer"
        >
          <ArrowLeftIcon className={'size-4'} />{' '}
          <span className={'font-normal text-base'}>
            {LABEL.BACK_TO_WORKSPACE}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {isOpen ? (
          <SidebarGroup>
            <NavGroup {...workspaceSettingsNav} />
            <SidebarSeparator />
            <NavGroup {...personalSettingsNav} />
          </SidebarGroup>
        ) : (
          <SidebarGroup className="justify-center flex items-center">
            {/* You can show an icon here for collapsed state */}
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {/* Optional: footer actions, such as user profile or logout */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
