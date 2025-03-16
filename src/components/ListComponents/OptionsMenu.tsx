import { FC, RefObject, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightFromLine, Copy, Pencil, Trash } from 'lucide-react';
import { Text } from '@nabhan/view-module';

const options = [
  {
    id: 1,
    name: 'Rename',
    lucideIcon: <Pencil className="h-5 w-5" />,
  },
  {
    id: 2,
    name: 'Delete',
    lucideIcon: <Trash className="h-5 w-5" />,
  },
  {
    id: 3,
    name: 'Duplicate',
    lucideIcon: <Copy className="h-5 w-5" />,
  },
  {
    id: 4,
    name: 'Export',
    lucideIcon: <ArrowRightFromLine className="h-5 w-5" />,
  },
];

interface OptionsMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

const OptionsMenu: FC<OptionsMenuProps> = ({
  isOpen,
  setIsOpen,
  buttonRef,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  // This function checks whether the next click event is from the motion.ul component and if its from the button component
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (buttonRef.current && menuRef.current) {
        if (
          !buttonRef.current.contains(e.target as Node) &&
          !menuRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, handleClick]);

  return (
    <motion.ul
      ref={menuRef}
      animate={{ height: isOpen ? 'auto' : 0, zIndex: 999 }}
      className="absolute left-1 top-5 z-50 overflow-hidden rounded-lg bg-bg-secondary"
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((option) => (
        <li
          key={option.id}
          className="flex items-center space-x-2 rounded-lg p-2 hover:bg-bg-primary"
        >
          {option.lucideIcon}
          <Text
            variant={'body-small'}
            weight={'normal'}
            className="dark:text-white"
          >
            {option.name}
          </Text>
        </li>
      ))}
    </motion.ul>
  );
};

export default OptionsMenu;
