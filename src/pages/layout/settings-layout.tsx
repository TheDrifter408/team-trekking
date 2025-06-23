import Settings from '@/pages/settings';
import { SettingsSidebar } from '@/pages/layout/components/settings-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header';
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
            <Settings />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
export default SettingsLayout;
