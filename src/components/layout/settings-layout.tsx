import { Outlet } from '@tanstack/react-router';
import { SettingsSidebar } from '@/components/layout/settings-sidebar.tsx';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { useTMTStore } from '@/stores/zustand';

const SettingsLayout = () => {
  const { user } = useTMTStore();
  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider className="flex flex-col h-full">
        <AppHeader user={user} />
        <div className="flex flex-1 overflow-hidden">
          <SettingsSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
export default SettingsLayout;
