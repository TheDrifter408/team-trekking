import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PlusCircle } from 'lucide-react';
import { ThemeSwitch } from '@/components/theme-switch.tsx';
import { ProfileDropdown } from '@/components/profile.dropdown.tsx';
import { SidebarTrigger } from '@/components/ui/sidebar.tsx';

export const HeaderItems = () => {
  return (
    <div className="justify-between w-full flex items-center ">
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
  );
};
