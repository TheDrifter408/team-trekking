import { LinkProps } from '@tanstack/react-router';
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: LinkProps['to'];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
}

export interface ManagePurposeProps {
  workspacePurposeOptions: string[];
  onSelectPurpose: (option: string) => void;
  selectedPurpose: string | '';
}

export interface ManageFeaturesProps {
  onSelectOption: (option: string) => void;
  manageOptions: string[];
  selectedOption: string | '';
}

export interface InvitePeopleProps {
  email: string;
  selectedEmails: string[];
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoveEmail: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  focusInput: () => void;
}

export interface SelectFeaturesProps {
  selectedFeatures: string[];
  onToggleFeature: (option: string) => void;
}

export interface NameWorkspaceProps {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
}

export interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export interface FooterProps {
  step: number;
  prevStep: (e: MouseEvent<HTMLButtonElement>) => void;
  nextStep: (e: MouseEvent<HTMLButtonElement>) => void;
  totalSteps: number;
  onSubmit: () => void;
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
