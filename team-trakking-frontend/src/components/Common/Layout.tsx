import { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header.tsx';
import { Sidebar } from '../Sidebar/Sidebar.tsx';
import { Modal } from '@library/components';
import { motion } from 'framer-motion';
import { useWorkspace } from '@/context/LayoutContext.tsx';
import {
  Button,
  CreateSpace,
  CreateFolder,
  CreateList,
} from '@/components/index';

export const Layout = () => {
  const { state } = useLocation();
  const { isCreateSpace, setIsCreateSpace } = useWorkspace();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [createItem, setCreateItem] = useState('');
  const [spaceName, setSpaceName] = useState('');

  // Function to check screen size
  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleCloseCreateItem = useCallback(() => setCreateItem(''), []);
  const handleClose = useCallback(() => {
    handleCloseCreateItem();
    setIsCreateSpace(false);
  }, [handleCloseCreateItem]);

  return (
    <div className="min-h-screen bg-bg-primary-light">
      <Header />

      {/* Sidebar & Main Content */}
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <main
          className={`mt-4 min-h-[calc(100vh-4rem)] flex-1 py-6 transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-24'}`}
        >
          <Modal
            title={`Add New ${createItem}`}
            isOpen={isCreateSpace}
            onClose={handleClose}
            leftButtonText="Cancel"
            leftButtonVariant="ghost"
            leftButtonOnClick={handleCloseCreateItem}
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
