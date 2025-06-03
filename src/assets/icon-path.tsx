import Add01 from '@/assets/icons/add-icon-01.svg?react';

import Add02 from '@/assets/icons/add-icon-02.svg?react';

import AddPeople from '@/assets/icons/add-people.svg?react';

import Ai from '@/assets/icons/ai-icon.svg?react';

import Clock from '@/assets/icons/clock-icon.svg?react';

import Column02 from '@/assets/icons/column-icon-02.svg?react';

import CopyLink from '@/assets/icons/copy-link.svg?react';

import Drag from '@/assets/icons/drag-icon.svg?react';

import DropDownArrow from '@/assets/icons/drop-down-arrow.svg?react';

import Expand from '@/assets/icons/expand-icon.svg?react';

import ExpendSubtask from '@/assets/icons/expend-subtask-icon.svg?react';

import ExternalLink from '@/assets/icons/external-link-icon.svg?react';

import Home from '@/assets/icons/home.svg?react';

import Layer from '@/assets/icons/layer-icon.svg?react';

import List from '@/assets/icons/list-icon.svg?react';

import Menu01 from '@/assets/icons/menu-icon-01.svg?react';

import Menu02 from '@/assets/icons/menu-icon-02.svg?react';

import Menu03 from '@/assets/icons/menu-icon-03.svg?react';

import OkFill01 from '@/assets/icons/ok-icon-fill-01.svg?react';

import OkFill03 from '@/assets/icons/ok-icon-fill-03.svg?react';

import OkOutline02 from '@/assets/icons/ok-icon-outline-02.svg?react';

import Priority from '@/assets/icons/priority-icon.svg?react';

import Priority02 from '@/assets/icons/Priority-icon-02.svg?react';

import Progress2 from '@/assets/icons/progress-2.svg?react';

import ReactIcon from '@/assets/icons/react.svg?react';

import Status3 from '@/assets/icons/status-3.svg?react';

import Subtask from '@/assets/icons/subtask-icon.svg?react';

import UserAdd from '@/assets/icons/user-add-icon.svg?react';

import Description from '@/assets/icons/description-icon.svg?react';

import Tag from '@/assets/icons/tag.svg?react';

import Edit from '@/assets/icons/edit.svg?react';

import SignUpBG from '@/assets/backgrounds/auth-gradient-background.svg?react';

import Setting from '@/assets/icons/seting-icon.svg?react';

import Search from '@/assets/icons/search-icon.svg?react';

import Close from '@/assets/icons/close-icon.svg?react';

import Users from '@/assets/icons/users.svg?react';

import Thunder from '@/assets/icons/thunder.svg?react';

import FieldsCreate from '@/assets/icons/fields-create.svg?react';

const iconPaths = {
  description: Description,
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
  tag: Tag,
  edit: Edit,
  signUpBG: SignUpBG,
  setting: Setting,
  search: Search,
  close: Close,
  users: Users,
  thunder: Thunder,
  fieldscreate: FieldsCreate,
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
