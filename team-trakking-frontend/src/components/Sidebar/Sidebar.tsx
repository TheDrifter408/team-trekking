import React, { useCallback, useState } from 'react';
import { LayoutDashboard, PlusCircleIcon, SidebarIcon } from 'lucide-react';
import SidebarSpaceItem from '@components/Sidebar/SidebarSpaceItem.tsx';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store/zustand';
import { IconButton } from '@/components';
import { useSidebarContext } from '@/context/SidebarContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { sidebarOpen } = useSidebarContext();

  const { workspaceData, currentWorkspaceId, setIsCreateSpace } = useStore();
  const [isActivePopup, setIsActivePopup] = useState<number | null>(null);

  const onHandleSpaceNavigate = (id: number) => {
    navigate(`/space/${id}`, {
      state: { spaceId: id },
    });
  };

  const onPressFolder = (id: number) => {
    navigate(`/folder/${id}`);
  };

  const onPressList = (id: number) => {
    navigate(`/list/${id}`);
  };

  // Close popup when clicking outside
  const onHandleClosePopup = useCallback(() => {
    setIsActivePopup(null);
  }, []);

  return (
    <>
      <div className="flex h-full flex-col overflow-y-auto scrollbar-none bg-sidebar">
        <div
          className={`${sidebarOpen ? 'px-3' : 'flex px-0'} items-center justify-center pt-3 pb-5`}
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
        <div className=" mx-2 flex justify-between">
          <h1 className={'text-text-primary font-semibold mt-1'}>Spaces</h1>
          <IconButton size={'sm'} onClick={() => setIsCreateSpace(true)}>
            <PlusCircleIcon className="w-4 h-4 hover:scale-105 text-text-secondary hover:text-tertiary" />
          </IconButton>
        </div>
        <div className="mt-2 flex pb-4">
          <div className="space-y-1 w-full ">
            {sidebarOpen &&
              workspaceData.map(({ space }) => {
                if (!space) return null;
                return (
                  <SidebarSpaceItem
                    currentWorkspaceId={currentWorkspaceId}
                    space={space}
                    handleSpaceNavigate={onHandleSpaceNavigate}
                    onPressFolder={onPressFolder}
                    onPressList={onPressList}
                  />
                );
              })}
          </div>
        </div>

        {/* Backdrop to close popup when clicking outside */}
        {isActivePopup !== null && (
          <div className="fixed inset-0 z-0" onClick={onHandleClosePopup}></div>
        )}
      </div>
    </>
  );
};

interface SidebarToggleButtonProps {
  className?: string;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  className,
}) => {
  const { toggleSidebar } = useSidebarContext();

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-gray-100 focus:outline-none ${className}`}
      aria-label="Toggle Sidebar"
    >
      <SidebarIcon size={20} />
    </button>
  );
};

export { Sidebar, SidebarToggleButton };
