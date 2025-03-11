import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Folder,
  FolderOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Text} from '@nabhan/view-module'
import {getInitials} from '@utils/Common'
import { data } from '@utils/data';
import { Workspace } from '@/types/Workspace';


const ExpandableButton:FC<Workspace & SidebarProps> = ({ id, name, spaces, sidebarOpen }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    if (sidebarOpen === false) {
      return;
    }
    setIsOpen(!isOpen);
  }

  return (
    <div className="rounded-lg p-2 hover:bg-bg-secondary">
      <div className={`flex items-center gap-1`}>
        <button onClick={onToggle} className="flex items-center p-0">
          {
            isOpen ? 
            <FolderOpen className="h-4 w-4" /> :
            <Folder className="h-4 w-4" />
          }
        </button>
        <Link to={`/workspace/${id}`} className={`mt-1`}>
            <Text variant={'body-small'} weight={'semibold'} className={`flex items-center space-x-2 text-nowrap dark:text-white`}>
              {sidebarOpen ? name : <></>}
            </Text>
        </Link>
      </div>
      <motion.ul animate={{ height: isOpen ? 'auto' : 0}} className="overflow-hidden">
        {spaces.map((space) => (
          <li key={space.id} className="flex items-center space-x-2 p-2 hover:bg-bg-secondary ml-6">
            <Link to={`/workspace/${id}`} className='flex items-center space-x-2'>
              <FolderOpen className='h-5 w-5' />
              <Text variant={'body-small'} weight={'normal'} className="dark:text-white">
                {space.name}
              </Text>
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}


// Types
interface SidebarProps {
  sidebarOpen: boolean;
  name: string;
}

export const Sidebar: FC<SidebarProps> = ({ sidebarOpen, name }) => {

  return (
    <>
      <aside className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b p-4">
          <motion.h2
            initial={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {!sidebarOpen ? (
              <div className="flex-1 h-10 w-10 items-center justify-center rounded-md text-white shadow-md">
                <Text variant={'body'} weight={'semibold'} className="text-center pt-2 dark:text-white">
                  {getInitials(name)}
                </Text>
              </div>
            ) : (
              <Text variant={'body'} weight={'semibold'} className="text-nowrap rounded-md shadow-md p-2 dark:text-white">
                {name}
              </Text>
            )}
          </motion.h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <motion.div>
          <Text variant='h3' weight='semibold' className='flex items-center dark:text-white'>
            { sidebarOpen ? 'Spaces' : '' }
          </Text>
          </motion.div>
          <motion.div animate={{ x: sidebarOpen ? 0 : -10 }} transition={{ duration: 0.3 }}>
          {
            data.map((workspace:Workspace) => (
              <ExpandableButton key={workspace.id} {...workspace} sidebarOpen={sidebarOpen} />
            ))
          }
          </motion.div>
        </nav>
      </aside>
    </>
  );
};
