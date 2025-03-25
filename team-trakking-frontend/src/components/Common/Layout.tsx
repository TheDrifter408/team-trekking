import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../Header/Header.tsx';
import { Sidebar } from '../Sidebar/Sidebar.tsx';
import { Modal } from '@library/components';
import {
  Button,
  CreateSpace,
  CreateFolder,
  CreateList,
} from '@/components/index';
import { useStore } from '@/store/zustand/index';

export const Layout = () => {
  const { state } = useLocation();
  const {
    sidebarOpen,
    toggleSidebar,
    isCreateSpace,
    setIsCreateSpace,
    createItem,
    setCreateItem,
    spaceName,
    setSpaceName,
    onResetModal,
  } = useStore();
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

  return (
    <div className="min-h-screen bg-bg-primary-light">
      <Header />
      <div className="flex">
        <motion.div
          initial={{ width: '6rem' }}
          animate={{ width: sidebarOpen ? '14rem' : '6rem' }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className="fixed top-12 bottom-0 bg-bg-primary z-2"
        >
          <Sidebar
            sidebarOpen={sidebarOpen}
            name={state?.name ?? 'Dashboard'}
          />
        </motion.div>

        <main
          className={`mt-4 min-h-[calc(100vh-4rem)] flex-1 py-6 transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-24'}`}
        >
          <Modal
            title={`Add New ${createItem}`}
            isOpen={isCreateSpace}
            onClose={onResetModal}
            leftButtonText="Cancel"
            leftButtonVariant="ghost"
            leftButtonOnClick={() => setCreateItem('')}
            showLeftButton={!!createItem}
            maxWidth={900}
          >
            {!createItem ? (
              <div className="w-full flex justify-center gap-2">
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
                  <CreateFolder onFolderAdd={() => {}} />
                )}
                {createItem === 'List' && <CreateList onListAdd={() => {}} />}
              </div>
            )}
          </Modal>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
