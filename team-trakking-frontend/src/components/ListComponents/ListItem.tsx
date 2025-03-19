import { List } from '@/types/List';
import { Text } from '@library/components';
import { Ellipsis, List as LucideList } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import OptionsMenu from './OptionsMenu';

interface ListItemProps {
  list: List;
}
const ListItem: FC<ListItemProps> = ({ list }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <li
      key={list.id}
      className={`flex items-center justify-between rounded-lg p-2`}
    >
      <Text
        variant="body-small"
        weight="normal"
        className="flex items-center text-nowrap dark:text-white"
      >
        <LucideList className="h-5 w-5" />
        {list.name}
      </Text>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setOptionsOpen((prev) => !prev)}
          className="rounded-lg px-2 py-1 hover:bg-bg-secondary"
        >
          <Ellipsis className="W-5 h-5" />
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

export default ListItem;
