import React from 'react';
import { LinkProps } from '@tanstack/react-router';
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import {
  ConnectedTool,
  InterestedFeature,
  ManageType,
  WorkType,
} from '@/types/request-response/workspace/ApiRessponse.ts';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Workspace {
  id: number;
  name: string;
  logo?: string;
  plan: string;
  color?: string;
  member: number;
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
  workspaces: Workspace[];
  navGroups: NavGroup[];
}

export interface ManagePurposeProps {
  title: string;
  workspacePurposeOptions: WorkType[];
  onSelectPurpose: (option: string) => void;
  selectedPurpose: string | '';
}

export interface ManageFeaturesProps {
  title: string;
  onSelectOption: (option: string) => void;
  manageOptions: ManageType[];
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
  interestedFeature: InterestedFeature[];
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
export interface ManageToolsProps {
  connectedTools: ConnectedTool[];
  selectedTools: string[];
  onToggleTool: (tool: string) => void;
}

export interface List {
  name: string;
  id: number;
  taskNumber: number;
}

export interface Folder {
  id: number;
  name: string;
  lists: List[];
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
