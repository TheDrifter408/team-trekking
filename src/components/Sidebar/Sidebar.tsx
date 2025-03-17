import  { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Folder,
  FolderPlus,
  Grid2x2,
  Layers,
  ListPlus,
  MoreVertical,
} from 'lucide-react';
import { Text } from '@nabhan/view-module';
import { getInitials } from '@utils/Common';
import { SidebarProps } from '@/types/Props.ts';
import SidebarSpaceItem from './SidebarSpaceItem'

export const Sidebar: FC<SidebarProps> = ({ sidebarOpen, name, spaces }) => {
  const secondarySidebarOpen = false;
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const workspaceName = spaces && spaces.length > 0 ? spaces[0].workspaceName : 'Workspace Dashboard'

  // const toggleSecondarySidebar = () => {
  //   setSecondarySidebarOpen(!secondarySidebarOpen);
  // };

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const togglePopup = (spaceId: string) => {
    setActivePopup(activePopup === spaceId ? null : spaceId);
  };

  return (
    <>
      {/* Main Sidebar Content */}
      <div className="flex h-full flex-col ">
        {/* Sidebar Header */}
        <div
          className={`${sidebarOpen ? 'px-4' : 'px-0 flex'}  items-center justify-center py-4`}
        >
          {!sidebarOpen ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
              {getInitials(name)}
            </div>
          ) : (
            <div className="truncate text-text-primary text-lg font-bold">{workspaceName}</div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-2 flex-grow">
          <div className="mb-2 px-4">
            {sidebarOpen ? (
              <Text className="text-sm text-gray-400">Spaces</Text>
            ) : (
              ''
            )}
          </div>

          <div className="space-y-1">
            <Link
              to="/home"
              className={`flex items-center px-4 py-2 text-sm transition-colors hover:bg-gray-700 ${
                sidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              {sidebarOpen ? (
                <>
                  <Grid2x2 className="mr-3 flex-shrink-0" size={18} />
                  <span className="truncate">Dashboard</span>
                </>
              ) : (
                <div className="flex w-full justify-center">
                  <Grid2x2 size={18} />
                </div>
              )}
            </Link>

            <Link
              to="/workspaces"
              className="flex items-center px-4 py-2 text-sm transition-colors hover:bg-gray-700"
            >
              {sidebarOpen ? (
                <>
                  <Layers className="mr-3 flex-shrink-0" size={18} />
                  <span className="truncate">Workspaces</span>
                </>
              ) : (
                <div className="flex w-full justify-center">
                  <Layers size={18} />
                </div>
              )}
            </Link>

            <SidebarSpaceItem spaces = {spaces} sidebarOpen={sidebarOpen}/>

          </div>
        </div>

        {/* Additional Icon for Secondary Sidebar (Only visible when collapsed) */}
        {!sidebarOpen && (
          <div
            className="flex w-full cursor-pointer justify-center py-4 transition-colors hover:text-blue-400"
            // onClick={toggleSecondarySidebar}
          >
            <ChevronRight
              size={20}
              className={`transform transition-transform ${secondarySidebarOpen ? 'rotate-180' : ''}`}
            />
          </div>
        )}
      </div>

      {/* Secondary Sidebar - Responsive positioning */}
      {!sidebarOpen && secondarySidebarOpen && (
        <>
          <div
            className={`fixed top-16 z-20 h-[calc(100vh-4rem)] w-64 bg-gray-700 text-white shadow-lg transition-transform duration-300 ease-in-out`}
            style={{
              transform: secondarySidebarOpen
                ? 'translateX(0)'
                : 'translateX(-100%)',
            }}
          >
            <div className="flex items-center justify-between border-b border-gray-600 p-4">
              <h2 className="text-lg font-medium">Secondary Menu</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {/* Secondary sidebar content goes here */}
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 1
                </div>
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 2
                </div>
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 3
                </div>
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 4
                </div>
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 5
                </div>
                <div className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-600">
                  Item 6
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
