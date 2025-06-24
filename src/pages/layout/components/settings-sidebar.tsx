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
} from '@/components/shadcn-ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SettingsIcon } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { useTMTStore } from '@/stores/zustand';

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
          className="space-x-3 flex items-center m-1 rounded-lg hover:bg-content-secondary cursor-pointer"
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
            <SidebarGroupLabel className="text-sm  font-medium tracking-wider">
              <span className="capitalize">
                {fullName.toUpperCase()} {LABEL.WORKSPACE.toUpperCase()}
              </span>
            </SidebarGroupLabel>
            <div className={'flex flex-col space-y-3'}>
              <div className="flex items-center p-1 gap-x-3 rounded-lg text-base text-theme-main-dark bg-theme-main-light font-medium">
                <SettingsIcon className={'size-4'} /> {LABEL.SETTINGS}
              </div>
            </div>
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
