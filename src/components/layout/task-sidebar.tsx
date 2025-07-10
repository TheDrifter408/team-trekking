'use client';

import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Link, MessageSquare, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/shadcn-ui/sidebar.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { TaskActivity } from '@/routes/_auth/task/-components/task-activity';
import { TaskLinkAndRelations } from '@/routes/_auth/task/-components/task-link';

// This can be extended to include as many views as needed;
type SidebarView = 'activity' | 'links' | 'more' | 'none';

interface MiniSidebarProps {
  sidebarView: SidebarView;
  setSidebarView: Dispatch<SetStateAction<SidebarView>>;
}

const MiniSidebar = ({ sidebarView, setSidebarView }: MiniSidebarProps) => {
  const { toggleSidebar } = useSidebar();

  const onSetSidebarView = (
    e: MouseEvent<HTMLButtonElement>,
    view: SidebarView
  ) => {
    e.stopPropagation();
    if (view === 'more') {
      setSidebarView(view);
      return;
    } else if (view === sidebarView) {
      toggleSidebar();
    } else {
      setSidebarView(view);
    }
  };

  return (
    <Sidebar
      collapsible="none"
      side={'right'}
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-l"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {/* Activity/Chat icon with text below */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={{
                    children: 'Activity & Chat',
                    hidden: false,
                  }}
                  className="px-2.5 md:px-2 flex flex-col items-center"
                  onClick={(e) => onSetSidebarView(e, 'activity')}
                >
                  <MessageSquare className="mb-1" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Task Links and Relations */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={{
                    children: 'Links',
                    hidden: false,
                  }}
                  className="px-2.5 md:px-2 flex flex-col items-center"
                  onClick={(e) => onSetSidebarView(e, 'links')}
                >
                  <Link className="mb-1" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
              {/* More */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={{
                    children: 'Add Link',
                    hidden: false,
                  }}
                  className="px-2.5 md:px-2 flex flex-col items-center"
                  onClick={(e) => onSetSidebarView(e, 'more')}
                >
                  <Plus className="mb-1" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export const TaskSidebar = ({ taskId }: { taskId?: number }) => {
  const [sidebarView, setSidebarView] = useState<SidebarView>('activity');
  return (
    <Sidebar
      collapsible="icon"
      side={'right'}
      className={cn(
        'top-[96px] z-30 lg:z-auto h-[calc(100svh-110px)] right-0 lg:right-auto', // responsive classes
        'border-l overflow-hidden [&>[data-sidebar=sidebar]]:flex-row-reverse'
      )}
    >
      <MiniSidebar sidebarView={sidebarView} setSidebarView={setSidebarView} />

      {/* Expanded sidebar content with multiple views */}
      {sidebarView === 'activity' && <TaskActivity taskId={taskId} />}
      {sidebarView === 'more' && <TaskLinkAndRelations taskId={taskId} />}
    </Sidebar>
  );
};
