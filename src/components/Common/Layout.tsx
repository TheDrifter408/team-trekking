import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Header } from '../Header/Header.tsx';
import { Sidebar } from '../Sidebar/Sidebar.tsx';
import { motion } from 'framer-motion';
import { workspaceItems } from '@utils/data2.ts';

export function Layout() {
  let { state } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  state = '1';

  const data = workspaceItems.find((w: any) => w.id === state);

  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="flex min-h-screen flex-col bg-bg-secondary">
      {/* Header */}
      <Header />

      {/* Sidebar & Main Content Container */}
      <div className="flex flex-row">
        {/* Sidebar */}
        <motion.div
          initial={{ width: '6rem' }}
          animate={{ width: sidebarOpen ? '16rem' : '6rem' }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-bg-primary"
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
                className="absolute right-[-12px] top-10 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-tertiary text-white shadow-lg"
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
          className={`mt-16 min-h-[calc(100vh-4rem)] flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
