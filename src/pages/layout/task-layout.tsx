import { FC, CSSProperties, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Icon } from '@/assets/icon-path.tsx';
import { SidebarProvider, SidebarInset } from '@/components/shadcn-ui/sidebar';
import { TaskSidebar } from './components/task-sidebar.tsx';
import { AppHeader } from '@/pages/layout/components/app-header.tsx';
import { PageHeader } from '@/pages/task/components/page-header';
import { Sheet, SheetContent } from '@/components/shadcn-ui/sheet.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { TaskList } from '@/pages/layout/components/task-leftsidebar.tsx';

const TaskLayout: FC = () => {
  const defaultOpenRight = Cookies.get('right-sidebar:state') !== 'false';
  const sidebarStyle = {
    '--sidebar-width': '480px',
  } as CSSProperties & { [key: string]: string };
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const onToggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider
        defaultOpen={defaultOpenRight}
        style={sidebarStyle}
        className="flex flex-col h-full"
      >
        <AppHeader user={null} />
        <PageHeader onToggleSidebarOpen={onToggleLeftSidebar} />
        <div className="relative flex flex-1 overflow-hidden">
          <SidebarInset className="flex-1 overflow-auto">
            <Sheet open={isLeftSidebarOpen} onOpenChange={onToggleLeftSidebar}>
              <SheetContent
                side="left"
                hasCloseIcon={false}
                className="w-[300px] !gap-0 bg-gray-100 border-r shadow-lg top-[98px] overflow-y-scroll h-[calc(100%-98px)] no-scrollbar"
                overlay={false}
              >
                <div className="h-[60px] gap-2 font-medium sticky bg-white flex items-center px-3 shadow-sm">
                  <Icon
                    name={'subtask'}
                    className={'text-content-default size-4'}
                  />
                  {LABEL.SUBTASK}
                </div>
                <TaskList />
              </SheetContent>
            </Sheet>
            <Outlet />
          </SidebarInset>
          <TaskSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
};
export default TaskLayout;
