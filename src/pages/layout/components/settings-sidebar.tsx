'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/utils.ts';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/shadcn-ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { NavGroup } from '@/components/layout/nav-group';
import {
  workspaceSettingsNav,
  personalSettingsNav,
} from '@/lib/constants/sidebarConstants.ts';

export const SettingsSidebar = (
  props: React.ComponentProps<typeof Sidebar>
) => {
  const navigate = useNavigate();

  return (
    <Sidebar
      collapsible={'none'}
      className={cn('h-[calc(100%-45px)] border-r-[2px]')}
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
        <SidebarGroup>
          <NavGroup {...workspaceSettingsNav} />
          <SidebarSeparator />
          <NavGroup {...personalSettingsNav} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Optional: footer actions, such as user profile or logout */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
