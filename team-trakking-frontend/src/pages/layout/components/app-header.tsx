'use client';

import { SidebarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input.tsx';
import { PlusCircle } from 'lucide-react';
import { ThemeSwitch } from '@/components/theme-switch.tsx';
import { ProfileDropdown } from '@/components/profile.dropdown.tsx';
import { UserResponse } from '@/types/props/ApiResponse.ts';

interface Props {
  user: UserResponse | null;
}
export function AppHeader({ user }: Props) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex flex-col sticky w-full z-50 items-center bg-theme-dark">
      <div className="flex  w-full items-center gap-2 px-4 h-[40px]">
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
          <div className="flex">
            <Input
              type="text"
              placeholder="Search"
              className="w-60 font-medium text-base bg-theme-secondary-dark opacity-90 border-theme-dark placeholder:text-gray-400 placeholder:font-medium placeholder:text-base rounded-l-md"
            />
          </div>
          <Button
            size={'sm'}
            className="bg-theme-secondary-dark hover:bg-theme-main-dark hover:opacity-30 hover:text-gray-900 h-[26px] px-3 rounded-md text-gray-400 font-medium text-base"
          >
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
