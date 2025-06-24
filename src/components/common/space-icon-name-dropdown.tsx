import React, { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn-ui/input.tsx';
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

  // Handle search input change
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchAvatar(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className={`rounded-lg items-center text-center flex ${selectedColor.bgClass} border-0`}
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
        <DropdownMenuContent
          align="start"
          side="bottom"
          className="w-[300px] max-h-[400px] overflow-y-auto"
          sideOffset={4}
        >
          <p className="text-sm mt-1 px-4 font-medium text-muted-foreground">
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
          <Separator className="my-3" />
          {/* Search and upload avatar */}
          <div className="flex px-2 gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-theme-main" />
              <Input
                placeholder="Search avatar"
                value={searchAvatar}
                onChange={onSearchChange}
                className="pl-[30px] h-[26px] rounded-full"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-theme-main font-normal h-[26px] hover:bg-theme-main hover:text-primary-foreground"
            >
              + Upload
            </Button>
          </div>
          {/* Avatar list */}
          <div className="my-2 px-2 flex flex-wrap gap-2 max-h-[170px] overflow-y-auto">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { DropDownContent };
