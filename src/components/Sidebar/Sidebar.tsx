import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid2x2,
  Layers,
  ChevronRight,
  Home,
  Users,
  Settings,
  LayoutDashboard,
  Bell,
  Folder,
  Plus,
  ListPlus,
  FolderPlus,
  ChevronDown,
  List,
  MoreVertical,
} from 'lucide-react';
import { Text } from '@nabhan/view-module';
import { getInitials } from '@utils/Common';
import { SidebarProps } from '@/types/Props.ts';

interface SpaceItem {
  id: string;
  name: string;
  folders: {
    id: string;
    name: string;
    lists: string[];
  }[];
}

const spaces: SpaceItem[] = [
  {
    id: '1',
    name: 'Personal Space',
    folders: [
      {
        id: '11',
        name: 'Work Projects',
        lists: ['To-Do', 'In Progress', 'Done'],
      },
      {
        id: '12',
        name: 'Personal Tasks',
        lists: ['Shopping', 'Errands', 'Ideas'],
      },
    ],
  },
  {
    id: '2',
    name: 'Team Space',
    folders: [
      {
        id: '21',
        name: 'Development',
        lists: ['Backlog', 'Sprint Tasks', 'Completed'],
      },
    ],
  },
];

export const Sidebar: FC<SidebarProps> = ({ sidebarOpen, name }) => {
  const secondarySidebarOpen = false;

  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<string | null>(null);

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
          className={`${sidebarOpen ? 'px-4' : 'px-0'} flex items-center justify-center py-4`}
        >
          {!sidebarOpen ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
              {getInitials(name)}
            </div>
          ) : (
            <div className="truncate text-lg font-bold">{name}</div>
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

            <div className="items-center space-y-2">
              {spaces.map((space) => (
                <div className={'flex flex-col'}>
                  <div
                    className={` ${sidebarOpen ? `flex flex-row space-x-2 px-4 py-2 text-sm` : `flex w-full justify-center`}`}
                  >
                    <Folder size={18} />{' '}
                    {sidebarOpen && (
                      <div
                        className={
                          'justify-content-between relative flex w-full flex-col'
                        }
                      >
                        <div
                          onClick={() => toggleSpace(space.id)}
                          className="justify-content-between relative flex w-full cursor-pointer flex-row "
                        >
                          <span className={'truncate'}>{space.name}</span>
                          <div className="relative">
                            <MoreVertical
                              size={18}
                              onClick={() => togglePopup(space.id)}
                            />
                            {activePopup === space.id && (
                              <div className="absolute  top-6 z-50 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                                  Rename Space
                                </button>
                                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50">
                                  Delete Space
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {expandedSpaces.includes(space.id) && sidebarOpen && (
                          <div className={'ml-4 mt-1 flex flex-col space-y-2 '}>
                            {space.folders.map((folder) => (
                              <div className={'flex flex-col cursor-pointer  '} onClick={() => toggleFolder(folder.id)}>
                                <div className="flex flex-row gap-2 items-center"><FolderPlus size={17}/> {folder.name}</div>
                                <div className={''}>
                                  {
                                    expandedFolders.includes(folder.id) && (
                                      <div className={'flex flex-col space-y-2  justify-center'}>
                                        {folder.lists.map((item) => (
                                          <div className={'flex flex-row ml-4 mt-1 items-center gap-2'}>
                                           <ListPlus size={16}/> {item}
                                          </div>
                                        ))}
                                      </div>
                                    )
                                  }
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
