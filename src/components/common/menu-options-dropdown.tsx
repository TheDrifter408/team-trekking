import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Copy,
  Trash2Icon,
  Archive,
  ListPlusIcon,
  Mail,
  Move,
  SectionIcon,
  AlarmClockIcon,
  Columns3,
  StarIcon,
  MergeIcon,
  PanelsTopLeftIcon,
  SaveIcon,
  RefreshCwIcon,
  UserRoundCogIcon,
  CircleArrowUpIcon,
  MoveDownRightIcon,
  Repeat2Icon,
  GitPullRequestArrowIcon,
  BoxIcon,
  WandSparklesIcon,
} from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings.ts';
import TaskDialog from '@/components/common/task-dialog.tsx';
import { sampleProjectsData } from '@/mock';
import * as React from 'react';
import { useState } from 'react';

interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TaskDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

interface ConvertOption {
  label: string;
  icon: React.ComponentType<any>;
  rotate?: boolean;
}

// Constants for styling
const MENU_STYLES = {
  menuItem: '!text-base text-content-default',
  menuItemWithMargin: '!text-base text-content-default mx-1 px-1',
  menuItemDestructive: '!text-base text-destructive',
  subContent: '!w-[237px] rounded-xl',
  separator: 'h-[.5px]',
  icon: 'mr-2 size-5',
  iconTertiary: 'mr-4 size-5 text-content-tertiary',
  iconSmall: 'mr-2 h-4 w-4',
  iconDestructive: 'mr-2 size-4 text-destructive',
} as const;

// Menu item configurations
const TOP_ACTIONS = [
  { label: LABEL.COPY_LINK_SHORT, key: 'copy-link' },
  { label: LABEL.COPY_ID, key: 'copy-id' },
  { label: LABEL.NEW_TAB, key: 'new-tab' },
] as const;

const ADD_TO_OPTIONS = [
  { label: LABEL.ANOTHER_LIST, icon: ListPlusIcon },
  { label: LABEL.FAVORITES, icon: StarIcon },
  { label: LABEL.PERSONAL_LIST, icon: UserRoundCogIcon },
  { label: LABEL.LINEUP, icon: CircleArrowUpIcon },
  { label: LABEL.TRAY, icon: MoveDownRightIcon },
] as const;

const CONVERT_TO_OPTIONS: ConvertOption[] = [
  { label: LABEL.LIST, icon: GitPullRequestArrowIcon },
  { label: LABEL.SUBTASK, icon: GitPullRequestArrowIcon, rotate: true },
];

const TASK_TYPE_OPTIONS = [
  { label: LABEL.BUG },
  { label: LABEL.FEATURE },
] as const;

const TEMPLATE_OPTIONS = [
  { label: LABEL.BROWSE_TEMPLATES, icon: PanelsTopLeftIcon },
  { label: LABEL.SAVE_AS_TEMPLATE, icon: SaveIcon },
  { label: LABEL.UPDATE_EXISTING_TEMPLATE, icon: RefreshCwIcon },
] as const;

const CustomMenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  onClick,
}) => (
  <DropdownMenuItem
    className={className}
    onSelect={(e) => {
      e.preventDefault();
      onClick?.();
    }}
  >
    {children}
  </DropdownMenuItem>
);

const TopActionButtons: React.FC<{ onAction: (action: string) => void }> = ({
  onAction,
}) => (
  <CustomMenuItem className={MENU_STYLES.menuItem}>
    <div className="flex border w-full justify-between items-center rounded-lg">
      {TOP_ACTIONS.map((action, index) => (
        <button
          key={action.key}
          onClick={() => onAction(action.key)}
          className={`w-1/3 py-2 hover:bg-secondary/80 rounded ${
            index === 1 ? 'border-l border-r' : ''
          }`}
        >
          {action.label}
        </button>
      ))}
    </div>
  </CustomMenuItem>
);

const AddToSubMenu: React.FC<{ onAddTo: (option: string) => void }> = ({
  onAddTo,
}) => (
  <DropdownMenuSub>
    <DropdownMenuSubTrigger className={MENU_STYLES.menuItem}>
      <Icon name="add02" className={MENU_STYLES.iconTertiary} />
      {LABEL.ADD_TO}
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent className={MENU_STYLES.subContent}>
      <CustomMenuItem
        className="text-base py-3 text-content-default"
        onClick={() => onAddTo('another-list')}
      >
        <ListPlusIcon className={MENU_STYLES.icon} />
        {LABEL.ANOTHER_LIST}
      </CustomMenuItem>
      <DropdownMenuSeparator className={MENU_STYLES.separator} />
      <div className="py-1">
        {ADD_TO_OPTIONS.slice(1, 3).map((option) => (
          <CustomMenuItem
            key={option.label}
            className="text-base text-content-default"
            onClick={() =>
              onAddTo(option.label.toLowerCase().replace(' ', '-'))
            }
          >
            <option.icon className={MENU_STYLES.icon} />
            {option.label}
          </CustomMenuItem>
        ))}
      </div>
      <DropdownMenuSeparator className={MENU_STYLES.separator} />
      {ADD_TO_OPTIONS.slice(3).map((option) => (
        <CustomMenuItem
          key={option.label}
          className="text-base text-content-default"
          onClick={() => onAddTo(option.label.toLowerCase().replace(' ', '-'))}
        >
          <option.icon className={MENU_STYLES.icon} />
          {option.label}
        </CustomMenuItem>
      ))}
    </DropdownMenuSubContent>
  </DropdownMenuSub>
);

const ConvertToSubMenu: React.FC<{ onConvert: (type: string) => void }> = ({
  onConvert,
}) => (
  <DropdownMenuSub>
    <DropdownMenuSubTrigger className={MENU_STYLES.menuItem}>
      <Repeat2Icon className={MENU_STYLES.iconTertiary} />
      {LABEL.CONVERT_TO}
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent className={MENU_STYLES.subContent}>
      {CONVERT_TO_OPTIONS.map((option) => (
        <CustomMenuItem
          key={option.label}
          className={MENU_STYLES.menuItem}
          onClick={() => onConvert(option.label.toLowerCase())}
        >
          <option.icon
            className={`${MENU_STYLES.icon} ${option.rotate ? 'rotate-180' : ''}`}
          />
          {option.label}
        </CustomMenuItem>
      ))}
    </DropdownMenuSubContent>
  </DropdownMenuSub>
);

const TaskTypeSubMenu: React.FC<{ onTaskType: (type: string) => void }> = ({
  onTaskType,
}) => (
  <DropdownMenuSub>
    <DropdownMenuSubTrigger className={MENU_STYLES.menuItem}>
      {/* TODO: Import and use task types component */}
      <BoxIcon className={MENU_STYLES.iconTertiary} />
      {LABEL.TASK_TYPE}
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent className={MENU_STYLES.subContent}>
      {TASK_TYPE_OPTIONS.map((option) => (
        <CustomMenuItem
          key={option.label}
          className="text-base text-content-default"
          onClick={() => onTaskType(option.label.toLowerCase())}
        >
          {option.label}
        </CustomMenuItem>
      ))}
    </DropdownMenuSubContent>
  </DropdownMenuSub>
);

const TemplatesSubMenu: React.FC<{ onTemplate: (action: string) => void }> = ({
  onTemplate,
}) => (
  <DropdownMenuSub>
    <DropdownMenuSubTrigger className="text-base text-content-default">
      <WandSparklesIcon className={MENU_STYLES.iconTertiary} />
      {LABEL.TEMPLATES}
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent className={`${MENU_STYLES.subContent} py-2`}>
      {TEMPLATE_OPTIONS.map((option) => (
        <CustomMenuItem
          key={option.label}
          className="text-base text-content-default"
          onClick={() =>
            onTemplate(option.label.toLowerCase().replace(/\s+/g, '-'))
          }
        >
          <option.icon className="size-5 mr-2" />
          {option.label}
        </CustomMenuItem>
      ))}
    </DropdownMenuSubContent>
  </DropdownMenuSub>
);
export const TaskDropdown: React.FC<TaskDropdownProps> = ({
  open,
  setOpen,
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onHandleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const onHandleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          className="!w-[276px] px-[8px]"
        >
          {/* Top Action Buttons */}
          <TopActionButtons onAction={() => {}} />

          {/* Add Column */}
          <CustomMenuItem
            className={MENU_STYLES.menuItemWithMargin}
            onClick={() => {}}
          >
            <Columns3 className={MENU_STYLES.icon} />
            {LABEL.ADD_COLUMN}
          </CustomMenuItem>

          <DropdownMenuSeparator className={MENU_STYLES.separator} />

          {/* Rename */}
          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <Icon name="edit" className={MENU_STYLES.icon} />
            {LABEL.RENAME}
          </CustomMenuItem>

          {/* Sub Menus */}
          <AddToSubMenu onAddTo={() => {}} />
          <ConvertToSubMenu onConvert={() => {}} />
          <TaskTypeSubMenu onTaskType={() => {}} />

          {/* Action Items */}
          <CustomMenuItem
            className={MENU_STYLES.menuItem}
            onClick={() => {
              onHandleOpenDialog();
              setOpen(false);
            }}
          >
            <Copy className={MENU_STYLES.icon} />
            {LABEL.DUPLICATE}
          </CustomMenuItem>

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <AlarmClockIcon className={MENU_STYLES.icon} />
            {LABEL.REMIND_ME}
          </CustomMenuItem>

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <Mail className={MENU_STYLES.icon} />
            {LABEL.SEND_EMAIL_TO_TASK}
          </CustomMenuItem>

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <MergeIcon className={`${MENU_STYLES.icon} rotate-90`} />
            {LABEL.MERGE}
          </CustomMenuItem>

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <Move className={MENU_STYLES.icon} />
            {LABEL.MOVE}
          </CustomMenuItem>

          <DropdownMenuSeparator />

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <SectionIcon className={MENU_STYLES.icon} />
            {LABEL.DEPENDENCIES}
          </CustomMenuItem>

          <TemplatesSubMenu onTemplate={() => {}} />

          <DropdownMenuSeparator />

          <CustomMenuItem className={MENU_STYLES.menuItem} onClick={() => {}}>
            <Archive className={MENU_STYLES.iconSmall} />
            {LABEL.ARCHIVE}
          </CustomMenuItem>

          <CustomMenuItem
            className={MENU_STYLES.menuItemDestructive}
            onClick={() => {}}
          >
            <Trash2Icon className={MENU_STYLES.iconDestructive} />
            {LABEL.DELETE}
          </CustomMenuItem>

          <DropdownMenuSeparator />

          <Button
            className="w-full my-1.5 bg-theme-main-dark text-base"
            onClick={() => {}}
          >
            {LABEL.SHARING_AND_PERMISSIONS}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={onHandleCloseDialog}
        initialTaskName="02.1 Creating Folder"
        projects={sampleProjectsData}
        defaultProject="final-initiative"
      />
    </div>
  );
};
