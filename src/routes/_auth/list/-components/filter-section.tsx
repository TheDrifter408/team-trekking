import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/assets/icon-path';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { LABEL } from '@/lib/constants/appStrings';
import { useComponentStore } from '@/stores/zustand/component-state-store.ts';
import { CreateTask } from '@/components/features/create-task.tsx';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface FilterButtonConfig {
  label: string;
  icon: string;
  onClick?: () => void;
}

export const FilterSection = ({ isOpen, setIsOpen }: Props) => {
  const openDrawer = useComponentStore((s) => s.openDrawer);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenTaskCreate, setIsOpenTaskCreate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filtersGroup1: FilterButtonConfig[] = [
    { label: 'Status', icon: 'layer', onClick: () => {} },
    { label: 'Subtask', icon: 'subtask', onClick: () => {} },
    {
      label: 'Columns',
      icon: 'column02',
      onClick: () => openDrawer('list-drawer'),
    },
  ];

  const filtersGroup2: FilterButtonConfig[] = [
    { label: 'Filter', icon: 'filter', onClick: () => {} },
    { label: 'Closed', icon: 'okoutline02', onClick: () => {} },
    {
      label: 'Assignee',
      icon: 'users',
      onClick: () => {},
    },
  ];

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // on clicks outside search container
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isSearchOpen]);

  const onSearchButtonClick = () => {
    setIsSearchOpen(true);
  };

  const renderFilterButtons = (items: FilterButtonConfig[]) =>
    items.map(({ label, icon, onClick }) => (
      <Button
        key={label}
        onClick={onClick}
        variant="outline"
        className="gap-x-1 rounded-full px-2 h-[26px] text-base text-gray-600 font-medium border-border/500 hover:bg-secondary/50"
      >
        <Icon name={icon as never} className="text-gray-600" />
        <span className="hidden xl:inline">{label}</span>
      </Button>
    ));

  return (
    <div className="mt-2 mx-7 flex items-center justify-between flex-wrap gap-4">
      {/* Left group */}
      <div className="flex items-center gap-2">
        {renderFilterButtons(filtersGroup1)}
      </div>

      {/* Right group */}
      <div className="flex items-center gap-2">
        {renderFilterButtons(filtersGroup2)}

        {/* Search button/input container */}
        <div ref={searchContainerRef} className="relative">
          {!isSearchOpen ? (
            <Button
              onClick={onSearchButtonClick}
              variant="outline"
              size={'auto'}
              className="gap-x-1 rounded-md h-[26px] text-base text-gray-600 hover:text-theme-main font-medium border-border/500 hover:bg-secondary/50"
            >
              <Icon
                name="search"
                className="text-gray-600 hover:text-theme-main"
              />
            </Button>
          ) : (
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[180px] h-[26px] !text-base placeholder:text-base transition-all duration-200 ease-in-out"
              placeholder="Search..."
            />
          )}
        </div>
        <CreateTask isOpen={isOpenTaskCreate} setIsOpen={setIsOpenTaskCreate}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-theme-main-dark hover:bg-theme-main text-base text-white px-3 h-[26px] font-medium rounded-md gap-x-1"
          >
            {LABEL.ADD_TASK}
            <Icon name="dropdownarrow" className="text-white w-3 h-3" />
          </Button>
        </CreateTask>
      </div>
    </div>
  );
};
