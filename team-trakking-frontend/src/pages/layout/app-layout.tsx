import React from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header.tsx';
import { HeaderItems } from '@/components/layout/headerItems';
import { PageHeaderRenderer } from '@/components/layout/page-header-renderer.tsx';

export const AppLayout: React.FC = () => {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'transition-[width] duration-200 ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
        )}
      >
        <Header fixed={true}>
          <HeaderItems />
        </Header>
        <PageHeaderRenderer />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};
