import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Briefcase, ChevronLeft } from 'lucide-react';
import { Header } from '../Header/Header.tsx';
import {Sidebar} from '../Sidebar/Sidebar';
import {motion} from 'framer-motion'

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-bg-secondary">
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
          <aside className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b p-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold"
              >
                {sidebarOpen && "Dashboard"}
              </motion.h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
              {[
                { to: "/home", icon: <Home className="h-5 w-5" />, label: "Home" },
                { to: "/workspace", icon: <Briefcase className="h-5 w-5" />, label: "Workspace" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-bg-secondary"
                >
                  {item.icon}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {sidebarOpen && item.label}
                  </motion.span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-10 right-[-12px] transform -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-tertiary text-white shadow-lg"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </motion.div>

        {/* Main Content */}
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] p-6 mt-16 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
