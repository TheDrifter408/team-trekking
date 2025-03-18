import { Space } from '@/types/Space';
import { Text } from '@nabhan/view-module';
import { Ellipsis, Grid2x2 } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router';
import OptionsMenu from './OptionsMenu';
import { Folder } from '@/types/Folder';
import { List } from '@/types/List';
import FolderItem from './FolderItem';
import ListItem from './ListItem';
import { motion } from 'framer-motion';

interface SpaceItemProps {
  space: Space;
  workspaceId: string;
}
const SpaceItem: FC<SpaceItemProps> = ({ space, workspaceId }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <li key={workspaceId} className="ml-3 space-x-2 rounded-lg px-2">
      <div className="flex items-center justify-between">
        <Link
          to={`/workspace/${workspaceId}`}
          className="flex items-center space-x-2 rounded-lg p-2 hover:bg-bg-secondary"
        >
          <Grid2x2 className="h-5 w-5" />
          <Text
            variant="body-small"
            weight="normal"
            className="text-nowrap dark:text-white"
          >
            {space.name}
          </Text>
        </Link>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setOptionsOpen((prev) => !prev)}
            className="rounded-lg px-2 py-1 hover:bg-bg-secondary"
          >
            <Ellipsis className="h-5 w-5" />
          </button>
          <OptionsMenu
            isOpen={optionsOpen}
            setIsOpen={setOptionsOpen}
            buttonRef={buttonRef}
          />
        </div>
      </div>
      <motion.ul className="">
        {space.folders.map((folder: Folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </motion.ul>
      <motion.ul className="">
        {
          // space.lists.map((list: List) => (
          //     <ListItem key={list.id} list={list} />
          // ))
        }
      </motion.ul>
    </li>
  );
};

export default SpaceItem;
