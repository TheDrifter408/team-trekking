import { LucideIcon } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { Folder } from '@/types/props/Layout.ts';
import { Dispatch, SetStateAction } from 'react';

export interface Space {
  id: number;
  name: string;
  description: string;
  shareLink?:string;
}

export type HeaderType = 'HOME' | 'SPACE' | 'FOLDER' | 'LIST' | 'TASK';
export type InboxTabType = 'IMPORTANT' | 'OTHER' | 'CLEARED';

// Define the base message item structure
export interface InboxItem {
  id: string;
  color: string;
  code: string;
  name: string;
  type: 'Date' | 'Status' | 'Assign' | 'Comment' | 'Greet';
  message: string;
  post_message: string;
  post_type: 'Failed' | 'Attention' | 'Success';
  date: string;
}

// Group structure for important messages
export interface Messages {
  today: InboxItem[];
  yesterday: InboxItem[];
  week: InboxItem[];
  month: InboxItem[];
}

export interface ColorOption {
  name: string;
  bgClass: string;
  textClass: string;
  color: string;
}

// Define the icon option type
export interface IconOption {
  name: string;
  icon: LucideIcon;
}

export interface DropDownProps {
  selectedColor: ColorOption;
  selectedIcon: IconOption | null;
  initials: string;
  onSelectColor: (color: ColorOption) => void;
  onSelectIcon: (icon: IconOption) => void;
  clearIcon: () => void;
  searchAvatar: string;
  setSearchAvatar: (searchAvatar: string) => void;
  iconOptions: IconOption[];
  colorOptions: ColorOption[];
}

export type WorkspaceRecent = 'List' | 'Task';

export interface RecentActions {
  id: string;
  name: string;
  type: WorkspaceRecent;
  location: string;
}

// Type definitions
export interface MyWorkTask {
  id: string;
  name: string;
  color: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  location?: string;
}

export interface ScheduleSection {
  id: string;
  tasks: MyWorkTask[];
}

export interface WorkData {
  workType: string;
  scheduleData: ScheduleSection[];
}

export interface AssignedComment {
  id: string;
  comment: string;
  commentTime: string;
  taskName: string;
  imageUrl: string;
}

export interface TaskStatus {
  id: number;
  name: string;
  color: string;
  category: string;
}
export interface Checklist {
  id: number;
  name: string;
  isCompleted: boolean;
}
export interface Assignee {
  id: number;
  name: string;
  initials?: string;
  role?: string;
  avatar?: string;
  isWatching?: boolean;
  read?: boolean;
  lastActivity?: string;
}
export type TaskPriority =
  | typeof LABEL.LOW
  | typeof LABEL.NORMAL
  | typeof LABEL.HIGH
  | typeof LABEL.URGENT;

export interface Comment {
  id: string;
  user: Assignee;
  content: string;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}
export interface Task {
  id: string;
  name: string;
  progress: number;
  status: TaskStatus;
  startDate?: string;
  dueDate?: string;
  description?: string;
  checklist: Checklist[];
  assignees?: Assignee[];
  spendTime?: string;
  estimatedTime?: string;
  priority?: TaskPriority;
  subTask: Task[];
  subTaskCount?: number;
  checkListCount?: number;
  parentId: string | null;
  comments?: Comment[];
  tags?: Tag[];
}

export interface SidebarFolderItemsProps {
  name: string;
  folder: Folder;
}

export interface SortableChecklistRowProps {
  id: string;
  selected: boolean;
  onSelect: () => void;
  item: {
    name: string;
    isCompleted: boolean;
  };
  onToggle: () => void;
}

export interface SortableTaskRowProps {
  id: number;
  selected: boolean;
  onSelect: () => void;
  subtask: Task;
}
interface Filter {
  id: string;
  label: string;
  icon: LucideIcon;
  checked: boolean;
}
export interface TaskActivityFiltersProps {
  filters: Filter[];
  toggleFilter: (filterId: string) => void;
  onUnSelectAll: () => void;
}
export interface TaskActivityNotificationsProps {
  watching: boolean;
  setWatching: (watching: boolean) => void;
  taskNotificationUsers: Assignee[];
  markNotificationAsRead: (notificationId: number) => void;
}

export interface Project {
  id: string;
  name: string;
}

export interface DuplicateData {
  taskName: string;
  project: string;
  copyOption: string;
  copyActivity: boolean;
  sendNotifications: boolean;
}

export interface DuplicateTaskDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onDuplicate?: (data: DuplicateData) => void;
  initialTaskName?: string;
  projects?: Project[];
  defaultProject?: string;
}
export interface Column {
  id: string;
  title: string;
  color: string;
  icon: LucideIcon;
  tasks: Task[];
}
export interface BoardColumnProps {
  column: Column;
  className?: string;
  isActiveColumn?: boolean;
  setColumns: Dispatch<SetStateAction<Column[]>>;
  updateCollapsed: (column: Column) => void;
  isCollapsed: boolean;
}
export interface TaskCardProps {
  task: Task;
  className?: string;
  indentLevel?: number;
  isSubtask?: boolean;
  isDragOverlay?: boolean;
}
export interface SortableTaskCardProps {
  task: Task;
}
export interface Project {
  id: string;
  name: string;
}

export interface DuplicateData {
  taskName: string;
  project: string;
  copyOption: string;
  copyActivity: boolean;
  sendNotifications: boolean;
}

export interface DuplicateTaskDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onDuplicate?: (data: DuplicateData) => void;
  initialTaskName?: string;
  projects?: Project[];
  defaultProject?: string;
}
