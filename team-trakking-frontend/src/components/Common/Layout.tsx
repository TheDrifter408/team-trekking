import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Header } from '../Header/Header.tsx';
import { Sidebar } from '../Sidebar/Sidebar.tsx';
import { Modal } from '@library/components';
import { motion } from 'framer-motion';
import { useWorkspace } from '@/context/LayoutContext.tsx';
import { Button, CreateSpace } from '@/components/index';

export function Layout() {
  const { state } = useLocation();
  const { isCreateSpace, setIsCreateSpace } = useWorkspace();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [createItem, setCreateItem] = useState('');
  const [spaceName, setSpaceName] = useState('');

  // Check if screen size is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleCloseCreateItem = () => {
    setCreateItem('');
    setIsCreateSpace(false);
    setSpaceName('');
  };
  const handleClose = () => {
    handleCloseCreateItem();
    setIsCreateSpace(false);
  };
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <Header />

      {/* Sidebar & Main Content Container */}
      <div className="flex flex-row">
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

          {!isMobile && (
            <>
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute right-[-12px] top-10  flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-tertiary text-white shadow-lg"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </>
          )}
        </motion.div>

        {/* Main Content */}
        <main
          className={`mt-4 min-h-[calc(100vh-4rem)] flex-1 py-6 transition-all duration-300 ${
            sidebarOpen ? 'ml-56' : 'ml-24'
          }`}
        >
          <Modal
            title={`Add New ${createItem}`}
            isOpen={isCreateSpace}
            onClose={handleClose}
            leftButtonText={'Cancel'}
            leftButtonVariant={'ghost'}
            leftButtonOnClick={handleCloseCreateItem}
            showLeftButton={createItem ? true : false}
          >
            {/*  Create a space here */}
            {!createItem && (
              <div className={'w-ful flex justify-evenly'}>
                {['Space', 'Folder', 'List'].map((item, index) => (
                  <Button key={index} onClick={() => setCreateItem(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            )}
            {createItem && createItem === 'Space' && (
              <div>
                <CreateSpace
                  setSpaceName={setSpaceName}
                  spaceName={spaceName}
                />
              </div>
            )}
            {createItem && createItem === 'Folder' && <div> Folder </div>}
            {createItem && createItem === 'List' && <div> List </div>}
          </Modal>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
