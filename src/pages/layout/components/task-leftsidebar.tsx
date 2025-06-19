'use client';
import {
  forwardRef,
  PropsWithChildren,
} from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@/components/shadcn-ui/sidebar.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { ButtonProps } from '@headlessui/react';

type SidebarTriggerProps = PropsWithChildren<ButtonProps>;

export const LeftSidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn(className, 'items-center justify-center h-auto')}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

LeftSidebarTrigger.displayName = 'LeftSidebarTrigger';

export const LeftSidebar = ({ ...props }) => {
  return (
    <Sidebar
      collapsible="offcanvas"
      side={'left'}
      className={cn(
        "absolute !h-[calc(100svh-110px)] border-r overflow-hidden [&>[data-sidebar=sidebar]]:flex-row-reverse")}
      {...props}
    >
      {/* Expanded sidebar content */}
      <Sidebar collapsible="none" className="w-0 hidden flex-1 md:flex ">
        <SidebarHeader className="gap-3.5 border-b p-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-medium text-foreground">Subtasks</div>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex flex-col flex-1 bg-background">
          {/* Activity feed section */}

        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
};
