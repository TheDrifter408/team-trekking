import React, { useState } from 'react';
import { Icon } from '@/assets/icon-path.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { TaskDropdown } from '@/components/common/list-menu-options-dropdown.tsx';

// Main Components
export const OptionsColumn: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <TaskDropdown open={isMenuOpen} setOpen={setIsMenuOpen}>
      <Button className="w-full" variant="ghost">
        <Icon name="menu03" />
      </Button>
    </TaskDropdown>
  );
};
