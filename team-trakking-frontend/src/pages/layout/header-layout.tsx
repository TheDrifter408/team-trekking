import React from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TaskSidebar } from './components/task-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header.tsx';
import { PageHeader } from '@/pages/task/components/page-header';

export const HeaderLayout: React.FC = () => {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';
  const sidebarStyle = {
    '--sidebar-width': '480px',
  } as React.CSSProperties & { [key: string]: string };
  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={sidebarStyle}
        className="flex flex-col h-full"
      >
        <AppHeader />
        <PageHeader />
        <div className="flex flex-1  overflow-hidden">
          <SidebarInset className="flex-1 overflow-auto">
            <Outlet />
          </SidebarInset>
          <TaskSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
};
