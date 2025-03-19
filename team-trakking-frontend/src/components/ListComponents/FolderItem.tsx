import { Folder } from '@/types/Folder';
import { Text } from '@library/components';
import { Ellipsis, Folder as LucideFolder } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import OptionsMenu from './OptionsMenu';

interface FolderItemProps {
  folder: Folder;
}
const FolderItem: FC<FolderItemProps> = ({ folder }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <li
      key={folder.id}
      className={`flex items-center space-x-2 rounded-lg px-2`}
    >
      <div className="flex items-center justify-between">
        <Text
          variant="body-small"
          weight="normal"
          className="flex items-center gap-1 text-nowrap dark:text-white"
        >
          <LucideFolder className="h-5 w-5" />
          {folder.name}
        </Text>
      </div>
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
    </li>
  );
};

export default FolderItem;
