import {
  ChevronDownCircleIcon,
  ChevronRightCircleIcon,
  Edit,
  FolderIcon,
  ListIcon,
  MoreVertical,
  PlusCircleIcon,
  Settings,
  Trash,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { useWorkspace } from '@/context/LayoutContext.tsx';

interface List {
  id: number;
  name: string;
}

interface Folder {
  id: number;
  name: string;
  color: string;
  lists?: List[];
}

interface Space {
  id: number;
  name: string;
  color: string;
  lists?: List[];
  folders?: Folder[];
}

interface SidebarSpaceItemProps {
  space: Space;
  handleSpaceNavigate: (id: number) => void;
}

const SidebarSpaceItem = ({
  space,
  handleSpaceNavigate,
}: SidebarSpaceItemProps) => {
  const navigate = useNavigate();
  const { isCreateSpace, setIsCreateSpace } = useWorkspace();
  const [expandedSpaceId, setExpandedSpaceId] = useState<number | null>(null);
  const [expandedFolderId, setExpandedFolderId] = useState<number | null>(null);
  const [isActivePopup, setIsActivePopup] = useState<number | null>(null);

  const handleSpaceExpand = useCallback((id: number) => {
    setExpandedSpaceId((prevId) => (prevId === id ? null : id));
    setExpandedFolderId(null);
  }, []);

  const handleFolderExpand = useCallback((id: number) => {
    setExpandedFolderId((prevId) => (prevId === id ? null : id));
  }, []);

  // Fixed event handling
  const handlePopup = useCallback(
    (spaceId: number, event: React.MouseEvent) => {
      event.stopPropagation();
      setIsActivePopup((prevState) => (prevState === spaceId ? null : spaceId));
    },
    [] // No dependencies needed when using functional updates
  );

  const { id, name, lists, folders } = space;
  const isExpanded = expandedSpaceId === id;

  return (
    <div className="w-full">
      <div key={id} className="relative">
        <Button
          className="ml-2 w-[94%] flex justify-between bg-bg-secondary"
          variant="outline"
          leftIcons={[
            {
              icon: !isExpanded ? (
                <ChevronRightCircleIcon
                  size={14}
                  onClick={() => handleSpaceExpand(id)}
                  className={'hover:scale-105 hover:text-tertiary'}
                />
              ) : (
                <ChevronDownCircleIcon
                  size={14}
                  onClick={() => handleSpaceExpand(id)}
                />
              ),
            },
          ]}
          rightIcons={[
            {
              icon: (
                <PlusCircleIcon
                  size={14}
                  className="mt-1 -ml-4"
                  onClick={() => setIsCreateSpace(!isCreateSpace)}
                />
              ),
            },
            {
              icon: (
                <span
                  onClick={(e) => handlePopup(id, e)}
                  className="flex items-center justify-center cursor-pointer focus:outline-none"
                >
                  <MoreVertical size={14} className="mt-1 mr-2" />
                </span>
              ),
            },
          ]}
        >
          <span
            onClick={() => handleSpaceNavigate(id)}
            className="text-sm truncate text-text-primary flex text-left -pr-2"
          >
            {name}
          </span>
        </Button>

        {/* Popup Menu */}
        {isActivePopup === id && (
          <div className="absolute right-2 mt-1 w-36 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
            <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
              <Edit size={14} className="mr-2" />
              Edit
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 flex items-center cursor-pointer">
              <Settings size={14} className="mr-2" />
              Settings
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-600 transition-colors duration-150 flex items-center cursor-pointer">
              <Trash size={14} className="mr-2" />
              Delete
            </div>
          </div>
        )}

        {isExpanded && (lists || folders) && (
          <div className="ml-6 space-y-1 mt-1">
            {folders?.map((folder) => {
              const { name, id: folderId } = folder;
              const isFolderExpanded = expandedFolderId === folderId;
              return (
                <div key={folderId}>
                  <Button
                    className="ml-4 flex justify-between w-[90%] bg-bg-secondary"
                    variant="outline"
                    leftIcons={[
                      {
                        icon: (
                          <FolderIcon
                            size={14}
                            onClick={() => handleFolderExpand(folderId)}
                          />
                        ),
                      },
                    ]}
                  >
                    <span className="text-sm truncate">{name}</span>
                  </Button>
                  {isFolderExpanded &&
                    lists?.map((list) => {
                      const { id, name } = list;
                      return (
                        <Button
                          key={id}
                          className="ml-7 w-[84%] mt-1 flex justify-between bg-bg-secondary"
                          variant="outline"
                          leftIcons={[
                            {
                              icon: <ListIcon size={14} />,
                            },
                          ]}
                        >
                          <span className="text-sm truncate">{name}</span>
                        </Button>
                      );
                    })}
                </div>
              );
            })}
            {lists?.map((list) => {
              const { id, name } = list;
              return (
                <Button
                  key={id}
                  className="ml-4 w-[90%] flex justify-between bg-bg-secondary"
                  variant="outline"
                  leftIcons={[
                    {
                      icon: <ListIcon size={14} />,
                    },
                  ]}
                >
                  <span className="text-sm">{name}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSpaceItem;
