'use client';

import { SidebarIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { useSidebar } from '@/components/shadcn-ui/sidebar';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { PlusCircle } from 'lucide-react';
import { ThemeSwitch } from '@/components/common/theme-switch.tsx';
import { ProfileDropdown } from '@/components/common/profile-dropdown.tsx';
import { UserResponse } from '@/types/request-response/ApiResponse.ts';
import { Icon } from '@/assets/icon-path.tsx';
interface Props {
  user: UserResponse | null;
}
export function AppHeader({ user }: Props) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex flex-col sticky w-full z-50 items-center bg-theme-dark">
      <div className="flex  w-full items-center gap-2 px-4 h-[44px]">
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={toggleSidebar}
          className={
            'p-[5px] bg-theme-secondary-dark hover:bg-theme-main-dark hover:opacity-30'
          }
        >
          <SidebarIcon className={'text-gray-100'} />
        </Button>
        <div className="flex space-x-4 justify-center w-full items-center">
          <div className="relative w-full max-w-sm">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-200"
            />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full h-8 pl-8 bg-theme-secondary-dark border-none placeholder:text-gray-200"
            />
          </div>

          <Button className="bg-theme-secondary-dark hover:bg-theme-main-dark hover:opacity-30 px-3 rounded-md text-gray-200  h-8 font-medium text-base">
            <PlusCircle /> New
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
