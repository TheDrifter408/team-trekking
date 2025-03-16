import { FC, useState } from 'react';
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
  List, MoreVertical,
} from 'lucide-react';
import { Text } from '@nabhan/view-module';
import { getInitials } from '@utils/Common';
import { SidebarProps } from '@/types/Props.ts';

interface SpaceItem {
  name: string;
  folders: {
    name: string;
    lists: string[];
  }[];
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  hasMenu?: boolean;
  isSpace?: boolean;
}


export const Sidebar: FC<SidebarProps> = ({ sidebarOpen, name }) => {
  const secondarySidebarOpen = false;


  // const toggleSecondarySidebar = () => {
  //   setSecondarySidebarOpen(!secondarySidebarOpen);
  // };
  const [showSpacesMenu, setShowSpacesMenu] = useState(false);
  const [expandedSpaces, setExpandedSpaces] = useState<Record<string, boolean>>({});
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [showSpaceItems, setShowSpaceItems] = useState(false);

  const spaces: SpaceItem[] = [
    {
      name: 'Personal Space',
      folders: [
        {
          name: 'Work Projects',
          lists: ['To-Do', 'In Progress', 'Done'],
        },
        {
          name: 'Personal Tasks',
          lists: ['Shopping', 'Errands', 'Ideas'],
        },
      ],
    },
    {
      name: 'Team Space',
      folders: [
        {
          name: 'Development',
          lists: ['Backlog', 'Sprint Tasks', 'Completed'],
        },
      ],
    },
  ];

  const navItems: NavItem[] = [
    { icon: <Folder className="w-5 h-5" />, label: 'Spaces', hasMenu: true, isSpace: true }
  ];

  const menuOptions = [
    { icon: <ListPlus className="w-4 h-4" />, label: 'Add Task' },
    { icon: <FolderPlus className="w-4 h-4" />, label: 'Add Space' },
    { icon: <Plus className="w-4 h-4" />, label: 'Add Project' },
  ];

  const toggleSpace = (spaceName: string) => {
    setExpandedSpaces(prev => ({
      ...prev,
      [spaceName]: !prev[spaceName]
    }));
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  };

  const renderSpaceContent = () => {
    if (sidebarOpen || !showSpaceItems) return null;

    return spaces.map((space) => (
      <div key={space.name} className="ml-8">
        <button
          className="w-full flex items-center px-2 py-2 hover:bg-gray-100 text-sm"
          onClick={() => toggleSpace(space.name)}
        >
          <ChevronDown
            className={`w-4 h-4 mr-2 transition-transform ${
              expandedSpaces[space.name] ? 'transform rotate-0' : 'transform -rotate-90'
            }`}
          />
          <span>{space.name}</span>
        </button>
        {expandedSpaces[space.name] && (
          <div className="ml-4">
            {space.folders.map((folder) => (
              <div key={folder.name}>
                <button
                  className="w-full flex items-center px-2 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => toggleFolder(`${space.name}-${folder.name}`)}
                >
                  <ChevronDown
                    className={`w-4 h-4 mr-2 transition-transform ${
                      expandedFolders[`${space.name}-${folder.name}`]
                        ? 'transform rotate-0'
                        : 'transform -rotate-90'
                    }`}
                  />
                  <Folder className="w-4 h-4 mr-2" />
                  <span>{folder.name}</span>
                </button>
                {expandedFolders[`${space.name}-${folder.name}`] && (
                  <div className="ml-8">
                    {folder.lists.map((list) => (
                      <button
                        key={list}
                        className="w-full flex items-center px-2 py-2 hover:bg-gray-100 text-sm"
                      >
                        <List className="w-4 h-4 mr-2" />
                        <span>{list}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Main Sidebar Content */}
      <div className="flex flex-col h-full ">
        {/* Sidebar Header */}
        <div className={`${sidebarOpen ? 'px-4' : 'px-0'} py-4 flex items-center justify-center`}>
          {!sidebarOpen ? (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              {getInitials(name)}
            </div>
          ) : (
            <div className="text-lg font-bold truncate">{name}</div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-2 flex-grow">
          <div className="px-4 mb-2">
            {sidebarOpen ? <Text className="text-sm text-gray-400">Spaces</Text> : ''}
          </div>

          <div className="space-y-1">
            <Link
              to="/home"
              className={`flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                sidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              {sidebarOpen ? (
                <>
                  <Grid2x2 className="mr-3 flex-shrink-0" size={18} />
                  <span className="truncate">Dashboard</span>
                </>
              ) : (
                <div className="flex justify-center w-full">
                  <Grid2x2 size={18} />
                </div>
              )}
            </Link>

            <div className="">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className={`w-full flex items-center px-4 py-3  ${
                      !sidebarOpen ? 'justify-center' : 'justify-between'
                    }`}
                    onClick={() => {
                      if (sidebarOpen) {
                        // setShowSecondarySidebar(!showSecondarySidebar);
                      } else if (item.isSpace) {
                        setShowSpaceItems(!showSpaceItems);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {sidebarOpen && <span className="ml-4">{item.label}</span>}
                    </div>
                    {sidebarOpen && item.hasMenu && (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSpacesMenu(!showSpacesMenu);
                          }}
                          className="hover:bg-gray-200 p-1 rounded-full"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {showSpacesMenu && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1">
                            {menuOptions.map((option, optionIndex) => (
                              <button
                                key={optionIndex}
                                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowSpacesMenu(false);
                                }}
                              >
                                {option.icon}
                                <span className="ml-3 text-white">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                  {item.isSpace && renderSpaceContent()}
                </div>
              ))}
            </div>
            <Link to="/workspaces" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
              {sidebarOpen ? (
                <>
                  <Layers className="mr-3 flex-shrink-0" size={18} />
                  <span className="truncate">Workspaces</span>
                </>
              ) : (
                <div className="flex justify-center w-full">
                  <Layers size={18} />
                </div>
              )}
            </Link>

            {renderSpaceContent()}
          </div>
        </div>

        {/* Additional Icon for Secondary Sidebar (Only visible when collapsed) */}
        {!sidebarOpen && (
          <div
            className="py-4 w-full flex justify-center cursor-pointer hover:text-blue-400 transition-colors"
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
            className={`fixed top-16 h-[calc(100vh-4rem)] w-64 bg-gray-700 text-white shadow-lg z-20 transition-transform duration-300 ease-in-out`}
            style={{
              transform: secondarySidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}
          >
            <div className="p-4 border-b border-gray-600 flex justify-between items-center">
              <h2 className="text-lg font-medium">Secondary Menu</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {/* Secondary sidebar content goes here */}
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 1</div>
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 2</div>
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 3</div>
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 4</div>
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 5</div>
                <div className="p-2 hover:bg-gray-600 rounded cursor-pointer transition-colors">Item 6</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};