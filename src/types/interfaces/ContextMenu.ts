// Type definitions
import { LucideIcon } from 'lucide-react';
import { ReactNode, MouseEvent } from 'react';

// Base interface
export interface BaseMenuItem {
  icon?: LucideIcon;
  label: string;
  action?: string;
  rightText?: string;
}

// Menu item types
export interface RegularMenuItem extends BaseMenuItem {
  type?: 'regular';
}

export interface SubmenuItem extends BaseMenuItem {
  label: string;
  action: string;
}

export interface SubmenuMenuItem extends BaseMenuItem {
  type: 'submenu';
  submenu: SubmenuItem[];
}

export interface ButtonMenuItem extends BaseMenuItem {
  type: 'button';
}

export interface ToggleMenuItem extends BaseMenuItem {
  type: 'toggle';
  enabled: boolean;
}

export interface DestructiveMenuItem extends BaseMenuItem {
  type: 'destructive';
}

// Union type
export type MenuItem =
  | RegularMenuItem
  | SubmenuMenuItem
  | ButtonMenuItem
  | ToggleMenuItem
  | DestructiveMenuItem;

// Menu section
export interface MenuSection {
  items: MenuItem[];
  separator?: boolean;
}

// Context menu props
export interface ContextMenuProps {
  trigger: ReactNode;
  sections?: MenuSection[];
  width?: string;
  align?: 'start' | 'center' | 'end';
  onItemClick?: (item: MenuItem | SubmenuItem, event?: MouseEvent) => void;
}
