import { SpaceItem } from '@/types/ApiResponse.ts';
import { Folder, FolderPlus, ListPlus, MoreVertical } from 'lucide-react';
import { useState } from 'react';


interface SidebarSpaceItemProps {
  spaces: SpaceItem[];
  sidebarOpen: boolean;
}


const SidebarSpaceItem = ({spaces,sidebarOpen} : SidebarSpaceItemProps) => {
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<string | null>(null);

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
    <div className="items-center space-y-2" key={spaces?.[0].workspaceName ?? 'Dashboard'}>
      {spaces && spaces.map((space) => (
        <div className={'flex flex-col'} key={space.id} >
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
                  <div className="relative mt-1">
                    <MoreVertical
                      size={15}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePopup(space.id);
                      }}
                    />
                    {activePopup === space.id && (
                      <div
                        className="absolute  top-6 z-50 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        <button className="w-full px-4 py-2 text-left text-text-inverted hover:bg-gray-50">
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
                      <div
                        className={'flex cursor-pointer flex-col  '}
                        onClick={() => toggleFolder(folder.id)}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <FolderPlus size={17} /> {folder.name}
                        </div>
                        <div className={''}>
                          {expandedFolders.includes(folder.id) && (
                            <div
                              className={
                                'flex flex-col justify-center  space-y-2'
                              }
                            >
                              {folder.lists.map((item) => (
                                <div
                                  className={
                                    'ml-4 mt-1 flex flex-row items-center gap-2'
                                  }
                                >
                                  <ListPlus size={16} /> {item}
                                </div>
                              ))}
                            </div>
                          )}
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

  )
}

export default SidebarSpaceItem;