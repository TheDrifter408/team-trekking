import Add01 from '@/assets/add-icon-01.svg';
import Add02 from '@/assets/add-icon-02.svg';
import AddPeople from '@/assets/add-people.svg';
import Ai from '@/assets/ai-icon.svg';
import Clock from '@/assets/clock-icon.svg';
import Column02 from '@/assets/column-icon-02.svg';
import CopyLink from '@/assets/copy-link.svg';
import Drag from '@/assets/drag-icon.svg';
import DropDownArrow from '@/assets/drop-down-arrow.svg';
import Expand from '@/assets/expand-icon.svg';
import ExpendSubtask from '@/assets/expend-subtask-icon.svg';
import ExternalLink from '@/assets/external-link-icon.svg';
import Home from '@/assets/home.svg';
import Layer from '@/assets/layer-icon.svg';
import List from '@/assets/list-icon.svg';
import Menu01 from '@/assets/menu-icon-01.svg';
import Menu02 from '@/assets/menu-icon-02.svg';
import Menu03 from '@/assets/menu-icon-03.svg';
import OkFill01 from '@/assets/ok-icon-fill-01.svg';
import OkFill03 from '@/assets/ok-icon-fill-03.svg';
import OkOutline02 from '@/assets/ok-icon-outline-02.svg';
import Priority from '@/assets/priority-icon.svg';
import Priority02 from '@/assets/Priority-icon-02.svg';
import Progress2 from '@/assets/progress-2.svg';
import ReactIcon from '@/assets/react.svg';
import Status3 from '@/assets/status-3.svg';
import Subtask from '@/assets/subtask-icon.svg';
import UserAdd from '@/assets/user-add-icon.svg';

const iconPaths: Record<string, string> = {
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
  expendsubtask: ExpendSubtask,
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
};

type IconProps = {
  name: keyof typeof iconPaths;
  className?: string;
};

export const Icon = ({ name, className = '' }: IconProps) => {
  const src = iconPaths[name];
  return <img src={src} className={className} alt={name} />;
};
