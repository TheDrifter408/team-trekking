import { Folder, FolderPlus, ListPlus, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Modal  } from '@nabhan/view-module';
import {SidebarSpaceItemProps} from '@/types/Props.ts';


const SidebarSpaceItem = ({ spaces, sidebarOpen }: SidebarSpaceItemProps) => {
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [taskTypes, setTaskTypes] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleViewSpace = (space: any) => {
    console.log('view space', space);
    setTaskTypes(space.statusType);
    setOpen(true);
  };

  return (
    <div
      className="items-center space-y-2"
      key={spaces?.[0].workspaceName ?? 'Dashboard'}
    >
      {spaces &&
        spaces.map((space) => (
          <div className={'flex flex-col'} key={space.id}>
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
                        <div className="absolute  top-6 z-50 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                          <button className="w-full px-4 py-2 text-left text-text-inverted hover:bg-gray-50">
                            Rename Space
                          </button>
                          <button
                            onClick={() => handleViewSpace(space)}
                            className="w-full px-4 py-2 text-left text-text-inverted hover:bg-gray-50"
                          >
                            Status types
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
      <Modal
        title={'Status Types'}
        isOpen={open}
        onClose={() => setOpen(false)}
        maxWidth={700}
      >
        <div className="flex flex-row" style={{height: 180, marginBottom: 20}}>
          <div className="w-1/2"></div>

          <div className="w-1/2  space-y-2">
            {taskTypes &&
              taskTypes.length > 0 &&
              taskTypes.map((task: any) => (
                <div
                  key={task.id}
                  className={`rounded-lg  px-2  py-1 shadow-md bg-gray-50`}
                >
                  <div className="flex flex-row w-full items-center space-x-4 py-1">
                    <div className="">
                      <button
                        className={'rounded-lg w-4 h-4'}
                        style={{background: `${task.color}`}}
                      >
                      </button>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold`}>{task.name}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SidebarSpaceItem;

