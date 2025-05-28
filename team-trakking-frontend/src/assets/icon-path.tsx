import Add01 from '@/assets/add-icon-01.svg?react';
import Add02 from '@/assets/add-icon-02.svg?react';
import AddPeople from '@/assets/add-people.svg?react';
import Ai from '@/assets/ai-icon.svg?react';
import Clock from '@/assets/clock-icon.svg?react';
import Column02 from '@/assets/column-icon-02.svg?react';
import CopyLink from '@/assets/copy-link.svg?react';
import Drag from '@/assets/drag-icon.svg?react';
import DropDownArrow from '@/assets/drop-down-arrow.svg?react';
import Expand from '@/assets/expand-icon.svg?react';
import ExpendSubtask from '@/assets/expend-subtask-icon.svg?react';
import ExternalLink from '@/assets/external-link-icon.svg?react';
import Home from '@/assets/home.svg?react';
import Layer from '@/assets/layer-icon.svg?react';
import List from '@/assets/list-icon.svg?react';
import Menu01 from '@/assets/menu-icon-01.svg?react';
import Menu02 from '@/assets/menu-icon-02.svg?react';
import Menu03 from '@/assets/menu-icon-03.svg?react';
import OkFill01 from '@/assets/ok-icon-fill-01.svg?react';
import OkFill03 from '@/assets/ok-icon-fill-03.svg?react';
import OkOutline02 from '@/assets/ok-icon-outline-02.svg?react';
import Priority from '@/assets/priority-icon.svg?react';
import Priority02 from '@/assets/Priority-icon-02.svg?react';
import Progress2 from '@/assets/progress-2.svg?react';
import ReactIcon from '@/assets/react.svg?react';
import Status3 from '@/assets/status-3.svg?react';
import Subtask from '@/assets/subtask-icon.svg?react';
import UserAdd from '@/assets/user-add-icon.svg?react';

const iconPaths = {
  add01: Add01,
  add02: Add02,
  addpeople: AddPeople,
  ai: Ai,
  clock: Clock,
  column02: Column02,
  copylink: CopyLink,
  drag: Drag,
  dropdownarrow: DropDownArrow,
  expand: Expand,
  expandsubtask: ExpendSubtask,
  externallink: ExternalLink,
  home: Home,
  layer: Layer,
  list: List,
  menu01: Menu01,
  menu02: Menu02,
  menu03: Menu03,
  okfill01: OkFill01,
  okfill03: OkFill03,
  okoutline02: OkOutline02,
  priority: Priority,
  priority02: Priority02,
  progress2: Progress2,
  react: ReactIcon,
  status3: Status3,
  subtask: Subtask,
  useradd: UserAdd,
} as const;

type IconName = keyof typeof iconPaths;

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className = '' }: IconProps) => {
  const SvgIcon = iconPaths[name];
  if (!SvgIcon) return null;
  return <SvgIcon className={className} />;
};
