import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header.tsx';
import { Sidebar } from '../Sidebar/Sidebar.tsx';
import { Modal } from '@library/components';
import {
  Button,
  CreateSpace,
  CreateFolder,
  CreateList,
} from '@/components/index';
import { motion } from 'framer-motion';
import { useStore } from '@store/zustand';
import { useData } from '@/hooks/useData';
import { Folder, List } from '@/types/ApiResponse.ts';
import { CreateListItem as ListItem } from '@/types/Props.ts';
import { useSidebarContext } from '@/context/SidebarContext.tsx';

export const Layout = () => {
  const {
    toggleSidebar,
    isCreateSpace,
    setIsCreateSpace,
    createItem,
    setCreateItem,
    spaceName,
    setSpaceName,
    onResetModal,
    currentWorkspaceId,
    workspaceData,
  } = useStore();
  const { handleCreateSpace, handleCreateFolder, handleCreateList } = useData();
  const { sidebarOpen } = useSidebarContext();
  const [folderItem, setFolder] = useState<Folder>({
    id: '0',
    name: '',
    description: '',
    color: '#6366f1', // Default indigo color
    spaceId: 0, // Change spaceId to parentSpaceId to match CreateFolder
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
  });
  const [list, setList] = useState<List>({
    id: '0',
    name: '',
    description: '',
    parentId: 0,
    parentType: 'space',
    items: [] as ListItem[],
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleColorChange = (color: string) => {
    setFolder({ ...folderItem, color });
  };

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsCreateSpace(false);
      }
    };
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsCreateSpace]);

  useEffect(() => {
    if (isMobile) toggleSidebar();
  }, [isMobile, toggleSidebar]);

  const handleConfirm = async () => {
    if (createItem === 'Space') {
      await handleCreateSpace(currentWorkspaceId, spaceName);
      onResetModal();
    } else if (createItem === 'Folder') {
      await handleCreateFolder(
        Number(folderItem.spaceId),
        folderItem.name,
        folderItem.color
      );
      onResetModal();
    } else if (createItem === 'List') {
      await handleCreateList(Number(list.parentId), list.parentType, list.name);
      onResetModal();
      setList({
        id: '0',
        name: '',
        description: '',
        parentId: 1,
        parentType: 'space',
        items: [] as ListItem[],
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary-light">
      <Header />

      {/* Sidebar & Main Content */}
      <div className="flex overflow-x-auto">
        {/* Sidebar */}
        <motion.div
          initial={{ width: '6rem' }}
          animate={{ width: sidebarOpen ? '14rem' : '6rem' }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
          className="z-2 fixed bottom-0 top-12 bg-bg-primary"
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <main
          className={`mt-4   min-h-[calc(100vh-4rem)] flex-1 py-6 transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-24'}`}
        >
          <Modal
            title={`Add New ${createItem}`}
            isOpen={isCreateSpace}
            onClose={onResetModal}
            leftButtonText="Cancel"
            leftButtonVariant="ghost"
            leftButtonOnClick={() => setCreateItem('')}
            rightButtonOnClick={handleConfirm}
            showLeftButton={!!createItem}
            showRightButton={!!createItem}
            maxWidth={900}
          >
            {!createItem ? (
              <div className="flex w-full justify-center gap-2">
                {['Space', 'Folder', 'List'].map((item) => (
                  <Button
                    key={item}
                    className="w-20"
                    variant="outline"
                    onClick={() => setCreateItem(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            ) : (
              <div>
                {createItem === 'Space' && (
                  <CreateSpace
                    setSpaceName={setSpaceName}
                    spaceName={spaceName}
                  />
                )}
                {createItem === 'Folder' && (
                  <CreateFolder
                    onFolderAdd={handleCreateFolder}
                    folder={folderItem}
                    setFolder={setFolder}
                    handleColorChange={handleColorChange}
                    spaces={workspaceData}
                  />
                )}
                {createItem === 'List' && (
                  <CreateList
                    onListAdd={handleCreateList}
                    spaces={workspaceData}
                    list={list}
                    setList={setList}
                  />
                )}
              </div>
            )}
          </Modal>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
