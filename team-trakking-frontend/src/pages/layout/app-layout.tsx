import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/pages/layout/components/app-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider className="flex flex-col h-full">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="overflow-auto w-full">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
