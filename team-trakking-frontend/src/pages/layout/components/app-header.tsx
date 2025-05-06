'use client';

import { SidebarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input.tsx';
import { PlusCircle } from 'lucide-react';
import { ThemeSwitch } from '@/components/theme-switch.tsx';
import { ProfileDropdown } from '@/components/profile.dropdown.tsx';

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex flex-col sticky w-full z-50 items-center bg-theme-dark">
      <div className="flex  w-full items-center gap-2 px-4 h-[40px]">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <div className="flex space-x-4 justify-center w-full items-center">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search..."
              className="w-60 border rounded-l-md"
            />
          </div>
          <Button size={'sm'} className=" h-6 px-3 rounded-md ">
            <PlusCircle /> New
          </Button>
        </div>
        <div className="flex items-center ">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
