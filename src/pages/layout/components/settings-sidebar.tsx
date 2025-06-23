'use client';

import * as React from 'react';
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
} from '@/components/shadcn-ui/sidebar';

export const SettingsSidebar = (
  props: React.ComponentProps<typeof Sidebar>
) => {
  const { state } = useSidebar();
  const isOpen = state !== 'collapsed';

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
      <SidebarHeader className="border-b py-0">
        {/* You can place your Settings title or branding here */}
      </SidebarHeader>

      <SidebarContent>
        {isOpen ? (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium tracking-wider">
              Settings
            </SidebarGroupLabel>
            {/* Add your settings navigation items here */}
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
