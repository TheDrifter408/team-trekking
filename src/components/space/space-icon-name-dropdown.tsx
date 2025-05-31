import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContentOnly,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { DropDownProps } from '@/types/props/Common.ts';

function DropDownContent({
  selectedColor,
  selectedIcon,
  initials,
  onSelectColor,
  onSelectIcon,
  clearIcon,
  searchAvatar,
  setSearchAvatar,
  iconOptions,
  colorOptions,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClickDropdownButton = () => {
    setIsOpen(!isOpen);
  };

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!searchAvatar.trim()) {
      return iconOptions;
    }

    const searchTerm = searchAvatar.toLowerCase();
    return iconOptions.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm)
    );
  }, [searchAvatar]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If dropdown is open and click is outside dropdown and not inside an input
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLInputElement)
      ) {
        setIsOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle search input change
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchAvatar(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger>
          <Button
            variant="default"
            size="icon_sm"
            className={`rounded-lg items-center text-center flex ${selectedColor.bgClass} border-0`}
            onClick={onClickDropdownButton}
          >
            {selectedIcon ? (
              <div className={`${selectedColor.textClass}`}>
                <selectedIcon.icon size={18} />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center ${selectedColor.textClass} font-medium`}
              >
                {initials}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        {isOpen && (
          <div ref={dropdownRef} className="absolute top-full left-0 mt-1 z-50">
            <DropdownMenuContentOnly
              align="start"
              side={'bottom'}
              className="w-[300px] max-h-screen"
            >
              <p
                className={
                  'text-sm mt-1 px-4 font-medium text-muted-foreground'
                }
              >
                Space color
              </p>
              <div className="flex px-4 flex-wrap mt-2 gap-2">
                {colorOptions.map((color, i) => (
                  <div
                    key={i}
                    className={`h-5 w-5 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center 
                            ${color.bgClass} 
                            ${selectedColor.name === color.name ? 'ring-2 ring-offset-2' : ''}`}
                    onClick={() => onSelectColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
              <Separator className={'my-3'} />
              {/* Search and upload avatar */}
              <div className="flex px-2 gap-3">
                <Search
                  className={'absolute w-3 h-3 mt-2 ml-2 text-theme-main'}
                />
                <Input
                  placeholder={'Search avatar'}
                  value={searchAvatar}
                  onChange={onSearchChange}
                  className={'pl-[30px] h-[26px] rounded-full'}
                />
                <Button
                  variant={'outline'}
                  size={'sm'}
                  className={
                    'rounded-full text-theme-main font-normal h-[26px] hover:bg-theme-main hover:text-primary-foreground'
                  }
                >
                  + Upload
                </Button>
              </div>
              {/*  Avatar list */}
              <div className="my-2 overflow-y-scroll max-h-[170px] px-2 flex flex-wrap gap-2">
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedIcon?.name === item.name;
                    return (
                      <div
                        key={item.name}
                        onClick={() => onSelectIcon(item)}
                        className={`cursor-pointer p-1 rounded-lg ${
                          isSelected ? selectedColor.bgClass : 'hover:bg-accent'
                        } ${isSelected && selectedColor.textClass}`}
                      >
                        <Icon size={18} />
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full text-center py-4 text-muted-foreground">
                    No icons match your search
                  </div>
                )}
              </div>
              {selectedIcon && (
                <div className="px-4 pb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearIcon}
                    className="w-full mt-2"
                  >
                    Clear Icon
                  </Button>
                </div>
              )}
            </DropdownMenuContentOnly>
          </div>
        )}
      </DropdownMenu>
    </div>
  );
}

export { DropDownContent };
