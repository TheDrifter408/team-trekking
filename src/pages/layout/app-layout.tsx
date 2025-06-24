import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/pages/layout/components/app-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header';
import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { useTMTStore } from '@/stores/zustand';
import { AppContextProvider } from '@/lib/context/app-layout-context.tsx';
import { useSpaceGlobalApiQuery } from '@/service/rtkQueries/spaceQuery.ts';

const AppLayout = () => {
  const { user } = useTMTStore();
  const { data: spaceGlobalData } = useSpaceGlobalApiQuery();
  return (
    <AppContextProvider spaceGlobal={spaceGlobalData ?? null}>
      <div className="flex flex-col h-screen">
        <SidebarProvider className="flex flex-col h-full">
          <AppHeader user={user} />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex-1 overflow-auto">
              <Outlet />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </AppContextProvider>
  );
};
export default AppLayout;
