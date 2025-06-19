import { FC, CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SidebarProvider, SidebarInset } from '@/components/shadcn-ui/sidebar';
import { TaskSidebar } from './components/task-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header.tsx';
import { PageHeader } from '@/pages/task/components/page-header';
import { LeftSidebar } from './components/task-leftsidebar.tsx';
import { LeftSidebarProvider } from '@/lib/context/left-sidebar-context.tsx';

const HeaderLayout: FC = () => {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';
  const sidebarStyle = {
    '--sidebar-width': '480px',
  } as CSSProperties & { [key: string]: string };

  const defaultOpenRight = Cookies.get('left-sidebar:state') !== 'false';

  const leftSidebarStyle = {
    '--left-sidebar-width': '300px',
  } as CSSProperties & { [key: string]: string };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={sidebarStyle}
        className="flex flex-col h-full"
      >
        <AppHeader user={null} />
        <LeftSidebarProvider >
          <PageHeader />
        <div className="relative flex flex-1 overflow-hidden">
          <LeftSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            <Outlet />
          </SidebarInset>
          <TaskSidebar />
        </div>
        </LeftSidebarProvider>
      </SidebarProvider>
    </div>
  );
};
export default HeaderLayout;
