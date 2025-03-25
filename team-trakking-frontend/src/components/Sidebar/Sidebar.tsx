import { FC, useCallback, useState } from 'react';
import { HomeIcon, LayoutDashboard } from 'lucide-react';
import { SidebarProps } from '@/types/Props';
import SidebarSpaceItem from '@components/Sidebar/SidebarSpaceItem.tsx';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store/zustand';

export const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const { workspaceData, currentWorkspaceId } = useStore();
  const [isActivePopup, setIsActivePopup] = useState<number | null>(null);

  const handleSpaceNavigate = (id: number) => {
    navigate(`/space/${id}`, {
      state: { spaceId: id },
    });
  };
  // Close popup when clicking outside
  const handleClosePopup = useCallback(() => {
    setIsActivePopup(null);
  }, []);

  return (
    <>
      <div className="flex h-full flex-col overflow-y-auto scrollbar-none bg-header-primary">
        <div
          className={`${sidebarOpen ? 'px-3' : 'flex px-0'} items-center justify-center pt-3`}
        >
          {!sidebarOpen ? (
            <div className="flex items-center justify-center rounded-full">
              <LayoutDashboard
                size={20}
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/home')}
              />{' '}
            </div>
          ) : (
            <div
              className="truncate text-md font-semibold text-text-primary flex items-center gap-2 cursor-pointer hover:text-text-hover"
              onClick={() => navigate('/home')}
            >
              <LayoutDashboard size={18} className="text-blue-600 " /> Dashboard
            </div>
          )}
        </div>

        <div
          className={`${sidebarOpen ? 'px-3' : 'flex px-0'} items-center justify-center pt-2 pb-2 `}
        >
          {!sidebarOpen ? (
            <div className="flex items-center justify-center rounded-full">
              <HomeIcon
                size={20}
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/home')}
              />
            </div>
          ) : (
            <div
              className="truncate text-md font-semibold text-text-primary flex items-center gap-2 cursor-pointer hover:text-text-hover"
              onClick={() => navigate('/home')}
            >
              <HomeIcon size={18} className="text-blue-600" /> Home
            </div>
          )}
        </div>

        <div className="mt-2 flex">
          <div className="space-y-1 w-full ">
            {sidebarOpen &&
              workspaceData.map(({ space }) => {
                if (!space) return null;
                return (
                  <SidebarSpaceItem
                    currentWorkspaceId={currentWorkspaceId}
                    space={space}
                    handleSpaceNavigate={handleSpaceNavigate}
                  />
                );
              })}
          </div>
        </div>

        {/* Backdrop to close popup when clicking outside */}
        {isActivePopup !== null && (
          <div className="fixed inset-0 z-0" onClick={handleClosePopup}></div>
        )}
      </div>
    </>
  );
};
