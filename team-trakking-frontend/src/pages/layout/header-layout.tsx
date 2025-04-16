import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header.tsx';
import { HeaderItems } from '@/components/layout/header-items.tsx';
import { TaskSidebar } from './task-sidebar';

// Create a wrapper component that handles the layout adjustments
const SidebarAwareContent = () => {
  const { open } = useSidebar();

  // Save sidebar state to cookies when it changes
  useEffect(() => {
    Cookies.set('sidebar:state', open.toString());
  }, [open]);

  return (
    <>
      <Header fixed={true}>
        <HeaderItems />
      </Header>
      <SidebarInset className={`transition-all mt-5 duration-300 ease-in-out}`}>
        <Outlet />
      </SidebarInset>
    </>
  );
};

export const HeaderLayout: React.FC = () => {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';

  return (
    <div className="[--header-height:2rem] [--sidebar-width-icon:3rem] h-screen">
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            '--sidebar-width': '350px',
          } as React.CSSProperties
        }
      >
        <SidebarAwareContent />
        <TaskSidebar />
      </SidebarProvider>
    </div>
  );
};
