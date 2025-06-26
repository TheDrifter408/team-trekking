import { FC, CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SidebarProvider, SidebarInset } from '@/components/shadcn-ui/sidebar';
import { TaskSidebar } from './components/task-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header.tsx';
import { PageHeader } from '@/pages/task/components/page-header';

const TaskLayout: FC = () => {
  const defaultOpenRight = Cookies.get('right-sidebar:state') !== 'false';
  const sidebarStyle = {
    '--sidebar-width': '480px',
  } as CSSProperties & { [key: string]: string };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider
        defaultOpen={defaultOpenRight}
        style={sidebarStyle}
        className="flex flex-col h-full"
      >
        <AppHeader user={null} />
        <PageHeader />
        <div className="relative flex flex-1 overflow-hidden">
          <SidebarInset className="flex-1 overflow-auto">
            <Outlet />
          </SidebarInset>
          <TaskSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
};
export default TaskLayout;
