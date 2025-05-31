import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import {
  ContextMenuProps,
  MenuItem,
  MenuSection,
  SubmenuItem,
} from '@/types/interfaces/ContextMenu.ts';
import {LABEL} from "@/lib/constants/strings.ts";

// Updated ContextMenu Component with reduced vertical gaps
export const ContextMenu: React.FC<ContextMenuProps> = ({
  trigger,
  sections = [],
  width = 'w-80',
  align = 'start',
  onItemClick = () => {},
}) => {
  const renderMenuItem = (item: MenuItem, index: number): React.ReactNode => {
    const IconComponent = item.icon;

    if (item.type === 'submenu') {
      return (
        <DropdownMenuSub key={index}>
          <DropdownMenuSubTrigger className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              {IconComponent && (
                <IconComponent className="w-4 h-4 text-gray-600" />
              )}
              <span className="text-gray-900">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            {item.submenu?.map((subItem: SubmenuItem, subIndex: number) => (
              <DropdownMenuItem
                key={subIndex}
                className="px-4 py-1.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
                onClick={() => onItemClick(subItem)}
              >
                {subItem.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    if (item.type === 'button') {
      return (
        <div key={index} className="p-2 pt-1">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
            onClick={() => onItemClick(item)}
          >
            {item.label}
          </Button>
        </div>
      );
    }

    if (item.type === 'toggle') {
      return (
        <DropdownMenuItem
          key={index}
          className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          <div className="flex items-center gap-3">
            {IconComponent && (
              <IconComponent className="w-4 h-4 text-gray-600" />
            )}
            <span className="text-gray-900">{item.label}</span>
          </div>
          <div
            className={`w-10 h-6 rounded-full transition-colors ${item.enabled ? 'bg-blue-600' : 'bg-gray-300'} relative`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.enabled ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </div>
        </DropdownMenuItem>
      );
    }

    if (item.type === LABEL.DESTRUCTIVE) {
      return (
        <DropdownMenuItem
          key={index}
          className="flex items-center gap-3 px-4 py-1.5 text-sm hover:bg-red-50 cursor-pointer text-red-600"
          onClick={() => onItemClick(item)}
        >
          {IconComponent && <IconComponent className="w-4 h-4" />}
          <span>{item.label}</span>
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem
        key={index}
        className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="w-4 h-4 text-gray-600" />}
          <span className="text-gray-900">{item.label}</span>
        </div>
        {item.rightText && (
          <span className="text-xs text-gray-400">{item.rightText}</span>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className={`${width} p-0 bg-white border border-gray-200 rounded-xl shadow-lg`}
        align={align}
      >
        {sections.map((section: MenuSection, sectionIndex: number) => (
          <React.Fragment key={sectionIndex}>
            {section.items.map((item: MenuItem, itemIndex: number) =>
              renderMenuItem(item, itemIndex)
            )}
            {sectionIndex < sections.length - 1 &&
              section.separator !== false && (
                <DropdownMenuSeparator className="my-0.5 bg-gray-100" />
              )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
