import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid2x2,
  Layers,
  Layers2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Text} from '@nabhan/view-module'
import {getInitials} from '@utils/Common'
import { data } from '@utils/data';
import { Workspace } from '@/types/Workspace';
import SpaceItem from '../ListComponents/SpaceItem';
import { Space } from '@/types/Space';


const ExpandableButton:FC<Workspace & SidebarProps> = ({ id, name, spaces, sidebarOpen }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    if (sidebarOpen === false) {
      return;
    }
    setIsOpen(!isOpen);
  }

  return (
    <div className="overflow-visible">
      <div className={`flex items-center justify-between w-full gap-1`}>
        <button onClick={onToggle} className="flex items-center px-2 py-1 gap-2 hover:bg-bg-secondary rounded-lg">
          {
            isOpen ? 
            <Layers2 className="h-4 w-4" /> :
            <Layers className="h-4 w-4" />
          }
          <Link to={`/workspace/${id}`} className={`mt-1`}>
            <Text variant={'body-small'} weight={'semibold'} className={`flex items-center space-x-2 text-nowrap dark:text-white`}>
              {sidebarOpen ? name : <></>}
            </Text>
        </Link>
        </button>
      </div>
      <motion.ul 
      animate={{ height: isOpen ? 100 : 0}} 
      className="rounded-lg h-full overflow-hidden">
        {spaces.map((space) => (
          <li key={space.id} className="space-x-2 px-2 rounded-lg">
            <Link to={`/workspace/${id}`} className='flex items-center space-x-2 hover:bg-bg-secondary p-2 rounded-lg'>
              <Grid2x2 className='h-5 w-5' />
              <Text variant={'body-small'} weight={'normal'} className="dark:text-white text-nowrap">
                {space.name}
              </Text>
            </Link>
            {
              spaces.map((space:Space) => (
                <SpaceItem key={space.id} space={space} workspaceId={id} />
              ))
            }
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
      <aside className="flex h-full flex-col overflow-visible">
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
        <nav className="flex-1 space-y-2 p-4 overflow-visible">
          <motion.div className=''>
          <Text variant='h3' weight='semibold' className='flex items-center dark:text-white'>
            { sidebarOpen ? 'Spaces' : '' }
          </Text>
          </motion.div>
          <motion.ul animate={{ x: sidebarOpen ? 0 : -10 }} transition={{ duration: 0.3 }} className='overflow-visible'>
          {
            data.map((workspace:Workspace) => (
              <ExpandableButton key={workspace.id} {...workspace} sidebarOpen={sidebarOpen} />
            ))
          }
          </motion.ul>
        </nav>
      </aside>
    </>
  );
};
