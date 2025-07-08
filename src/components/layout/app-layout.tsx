import { useEffect } from 'react';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { AppSidebar } from '@/components/layout/app-sidebar.tsx';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { useTMTStore } from '@/stores/zustand';
import { AppContextProvider } from '@/lib/context/app-layout-context.tsx';
import { useSpaceGlobalApiQuery } from '@/service/rtkQueries/spaceQuery.ts';
import {
  useGetAllWorkSpacesQuery,
  useGetWorkspaceSpaceFolderListQuery,
  useLazyGetWorkspaceMemberQuery,
} from '@/service/rtkQueries/workspaceQuery';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store';
import { SettingsSidebar } from './settings-sidebar';
import { TaskDialogOverlay } from '@/routes/_auth/task/-components/task-dialog-overlay';
import { handleMutation } from '@/lib/utils/utils.ts';
import { Member } from '@/types/request-response/workspace/ApiResponse';

const AppLayout = () => {
  const { user } = useTMTStore();
  const {
    currentWorkspace,
    setSpaceFolderList,
    setSpaces,
    clearWorkspace,
    setCurrentWorkspace,
    setMembers,
  } = useWorkspaceStore();

  const { data: spaceGlobalData } = useSpaceGlobalApiQuery();
  const [fetchWorkspaceMembers] = useLazyGetWorkspaceMemberQuery();
  const { data: workSpaces, refetch: refetchWorkspaces } =
    useGetAllWorkSpacesQuery();

  const workspaceId = currentWorkspace?.id;

  const {
    data: spacesFolderList,
    isFetching,
    refetch: refetchSpaces,
  } = useGetWorkspaceSpaceFolderListQuery(
    { id: workspaceId! },
    {
      skip: !workspaceId, // Correct: skip query until workspaceId is ready
    }
  );

  const router = useRouterState();
  const pathname = router.location.pathname;
  const isSettingsRoute = pathname.startsWith('/settings');
  const isTaskRoute = pathname.startsWith('/task');

  const shouldShowSidebar = useShouldShowSidebar(isTaskRoute);

  useEffect(() => {
    if (spacesFolderList) {
      setSpaceFolderList(spacesFolderList);
      setSpaces(spacesFolderList.spaces);
    }
    if (!currentWorkspace && workSpaces && workSpaces.length > 0) {
      clearWorkspace();
      setCurrentWorkspace(workSpaces[0].workspace);
    }
  }, [spacesFolderList, workSpaces]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (workspaceId) {
        const { data } = await handleMutation<Array<Member>>(
          fetchWorkspaceMembers,
          workspaceId
        );
        if (data) {
          setMembers(data);
        }
      }
    };
    fetchMembers();
  }, [workspaceId]);
  return (
    <AppContextProvider spaceGlobal={spaceGlobalData ?? null}>
      <div className="flex flex-col h-screen">
        <SidebarProvider className="flex flex-col h-full">
          <AppHeader user={user} />
          <div className="flex flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {shouldShowSidebar && (
                <motion.div
                  key={isSettingsRoute ? 'settings' : 'app'}
                  initial={{ x: -280, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -280, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.25, 0, 1],
                  }}
                >
                  {isSettingsRoute ? (
                    <SettingsSidebar />
                  ) : (
                    <AppSidebar
                      workSpaces={workSpaces}
                      refetchWorkspaces={refetchWorkspaces}
                      refetchSpaces={refetchSpaces}
                      isFetching={isFetching}
                      spacesFolderList={spacesFolderList}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
