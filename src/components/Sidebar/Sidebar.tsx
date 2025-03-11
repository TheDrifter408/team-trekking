import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {Text} from '@nabhan/view-module'
import {getInitials} from '@utils/Common'

// Types
interface SidebarProps {
  sidebarOpen: boolean;
  name: string;
}
export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, name }) => {



  return (
    <>
      <aside className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b p-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {!sidebarOpen ? (
              <div className="flex-1 h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                <Text variant={'body'} weight={'semibold'}>
                  {getInitials(name)}
                </Text>
              </div>
            ) : (
              <Text variant={'body'} weight={'semibold'}>
                {name}
              </Text>
            )}
          </motion.h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {[
            { to: '/home', icon: <Home className="h-5 w-5" />, label: 'Home' },
            {
              to: '/workspace',
              icon: <Briefcase className="h-5 w-5" />,
              label: 'Workspace',
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center space-x-2 rounded-lg p-2 hover:bg-bg-secondary"
            >
              {item.icon}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: sidebarOpen ? 1 : 0,
                  x: sidebarOpen ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {sidebarOpen && item.label}
              </motion.span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
