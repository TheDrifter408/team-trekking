import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/pages/layout/components/app-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PageHeaderRenderer } from '@/components/layout/page-header-renderer.tsx';

export const AppLayout = () => {
  return (
    <div className="[--header-height:calc(theme(spacing.10))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
