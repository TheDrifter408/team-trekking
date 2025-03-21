import { FC, useCallback, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useWorkspace } from '@/context/LayoutContext';
import { SidebarProps } from '@/types/Props';
import SidebarSpaceItem from '@components/Sidebar/SidebarSpaceItem.tsx';

export const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  const { workspaceData } = useWorkspace();
  const [isActivePopup, setIsActivePopup] = useState<number | null>(null);

  // Close popup when clicking outside
  const handleClosePopup = useCallback(() => {
    setIsActivePopup(null);
  }, []);

  return (
    <>
      <div className="flex h-full flex-col overflow-y-auto scrollbar-none">
        <div
          className={`${sidebarOpen ? 'px-3' : 'flex px-0'} items-center justify-center py-4`}
        >
          {!sidebarOpen ? (
            <div className="flex items-center justify-center rounded-full">
              <LayoutDashboard size={20} className="text-blue-600" />
            </div>
          ) : (
            <div className="truncate text-lg font-semibold text-text-primary">
              Dashboard
            </div>
          )}
        </div>

        <div className="mt-2 flex">
          <div className="space-y-1 w-full mb-5">
            {sidebarOpen &&
              workspaceData.map(({ space }) => {
                if (!space) return null;
                return <SidebarSpaceItem space={space} />;
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
