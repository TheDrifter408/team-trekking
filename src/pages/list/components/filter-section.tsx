import { useState } from 'react';
import { Icon } from '@/assets/icon-path';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { useComponentStore } from '@/stores/zustand/component-state-store.ts';

interface FilterButtonConfig {
  label: string;
  icon: string;
  onClick?: () => void;
}

export const FilterSection = () => {
  const openDrawer = useComponentStore((s) => s.openDrawer);
  const [searchTerm, setSearchTerm] = useState('');

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

  const renderFilterButtons = (items: FilterButtonConfig[]) =>
    items.map(({ label, icon, onClick }) => (
      <Button
        key={label}
        onClick={onClick}
        variant="outline"
        className="gap-x-1 rounded-full px-2 h-[30px] text-base text-gray-600 font-medium border-border/500 hover:bg-secondary/50"
      >
        <Icon name={icon as never} className="text-gray-600" />
        <span className="hidden md:inline">{label}</span>
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
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px] h-[30px]"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};
