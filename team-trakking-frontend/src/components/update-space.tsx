import React, { useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentOnly,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Ban,
  Search,
  Bell,
  Book,
  Briefcase,
  Calendar,
  Camera,
  Cloud,
  Coffee,
  Database,
  FileText,
  Gift,
  Globe,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Mail,
  Map,
  Music,
  Palette,
  Rocket,
  Settings,
  Star,
  Target,
  ChevronRight,
  Trophy,
  Users,
  UserRoundPlus,
  Zap,
  CircleDot,
  ChevronsUpDown,
  LucideIcon,
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils.ts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { taskNotificationUsers } from '@/mock';

interface ColorOption {
  name: string;
  bgClass: string;
  textClass: string;
  color: string;
}

// Define the icon option type
interface IconOption {
  name: string;
  icon: LucideIcon;
}

interface Props {
  isActive: boolean;
  onClose: () => void;
}

interface DropDownProps {
  selectedColor: ColorOption;
  selectedIcon: IconOption | null;
  initials: string;
  onSelectColor: (color: ColorOption) => void;
  onSelectIcon: (icon: IconOption) => void;
  clearIcon: () => void;
  searchAvatar: string;
  setSearchAvatar: (searchAvatar: string) => void;
}

export const UpdateSpace = ({ isActive, onClose }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );
  const [description, setDescription] = useState<string>('');
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);
  const [spaceName, setSpaceName] = useState('ProjecX Moon');
  const [searchAvatar, setSearchAvatar] = useState<string>('');

  const initials = getInitials(spaceName)[0];

  const onSelectIcon = (icon: IconOption) => {
    setSelectedIcon(icon);
  };

  const onSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const clearIcon = () => {
    setSelectedIcon(null);
  };

  return (
    <Dialog open={isActive} onOpenChange={onClose}>
      <DialogContent className="!max-w-[690px] flex flex-col h-[80%]">
        {/* Header Text */}
        <DialogHeader>
          <p className="text-xl text-primary font-semibold">
            Edit Space settings
          </p>
          <p className="text-base text-muted-foreground mt-1 w-full md:w-[90%]">
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </p>
        </DialogHeader>
        <div className={'col-span-2 space-x-2 items-center grid grid-cols-2'}>
          {/* Icon, Name & Color selection */}
          <div className="">
            <p className="text-base font-medium text-muted-foreground">
              Icon & name
            </p>
            <div className="flex mt-2 items-center space-x-2">
              <DropDownContent
                selectedColor={selectedColor}
                selectedIcon={selectedIcon}
                initials={initials}
                onSelectColor={onSelectColor}
                onSelectIcon={onSelectIcon}
                clearIcon={clearIcon}
                searchAvatar={searchAvatar}
                setSearchAvatar={setSearchAvatar}
              />
              <Input
                value={spaceName}
                className={'h-[40px]'}
                onChange={(e) => setSpaceName(e.target.value)}
              />
            </div>
          </div>
          {/* Owner of the Space */}
          <div className="">
            <p className="text-base font-medium text-muted-foreground">Owner</p>
            <div className="flex mt-2 !w-full items-center space-x-2">
              <SelectOwner users={taskNotificationUsers} />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="">
          <p className="text-base mb-2 font-medium text-muted-foreground">
            Description
            <span className={'text-sm font-normal'}>( optional )</span>
          </p>
          <Textarea
            placeholder={''}
            className={'!min-h-[25px]'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/*  Privacy */}
        <div className="">
          <p className="text-base font-medium text-muted-foreground">
            Make Private
          </p>
          <div className="flex justify-between items-center">
            <span className={'text-muted-foreground text-base font-normal'}>
              Only you and invited members have access
            </span>
            <Switch
              checked={isPrivateMode}
              onCheckedChange={setIsPrivateMode}
              className={`${isPrivateMode ? '!bg-theme-main' : ''}`}
              id=""
            />
          </div>
        </div>
        {/* Share with options */}
        {isPrivateMode && <UserManagement users={taskNotificationUsers} />}
        <Separator decorative={false} className={'!h-[.5px]'} />
        <SettingsCard
          icon={<Layers className="h-[18px] text-primary" />}
          title="Default views"
          content="List, Board, Team, Calendar, Gantt, Timeline, Activity, Workload, Map, Mind Map, Table"
        />

        <SettingsCard
          icon={<CircleDot className="h-[18px] text-primary" />}
          title="Task statuses"
          isList
          colorItems={colorOptions.map((c) => ({
            name: c.name,
            color: c.name.toLowerCase(),
          }))}
        />

        <SettingsCard
          icon={<ChevronsUpDown className="h-[18px] text-primary" />}
          title="ClickApps"
          content="Time Tracking, Sprint Points, Priority, Tags, Time Estimates, Remap Subtask Due Dates, Multiple Assignees, Email, Work In Progress Limits, Income"
        />
      </DialogContent>
    </Dialog>
  );
};

function DropDownContent({
  selectedColor,
  selectedIcon,
  initials,
  onSelectColor,
  onSelectIcon,
  clearIcon,
  searchAvatar,
  setSearchAvatar,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClickDropdownButton = () => {
    setIsOpen(!isOpen);
  };

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

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If dropdown is open and click is outside dropdown and not inside an input
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLInputElement)
      ) {
        setIsOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle search input change
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchAvatar(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger>
          <Button
            variant="default"
            size="icon_sm"
            className={`rounded-lg items-center text-center flex ${selectedColor.bgClass} border-0`}
            onClick={onClickDropdownButton}
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
        {isOpen && (
          <div ref={dropdownRef} className="absolute top-full left-0 mt-1 z-50">
            <DropdownMenuContentOnly
              align="start"
              side={'bottom'}
              className="w-[300px] max-h-screen"
            >
              <p
                className={
                  'text-sm mt-1 px-4 font-medium text-muted-foreground'
                }
              >
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
              <Separator className={'my-3'} />
              {/* Search and upload avatar */}
              <div className="flex px-2 gap-3">
                <Search
                  className={'absolute w-3 h-3 mt-2 ml-2 text-theme-main'}
                />
                <Input
                  placeholder={'Search avatar'}
                  value={searchAvatar}
                  onChange={onSearchChange}
                  className={'pl-[30px] h-[26px] rounded-full'}
                />
                <Button
                  variant={'outline'}
                  size={'sm'}
                  className={
                    'rounded-full text-theme-main font-normal h-[26px] hover:bg-theme-main hover:text-primary-foreground'
                  }
                >
                  + Upload
                </Button>
              </div>
              {/*  Avatar list */}
              <div className="my-2 overflow-y-scroll max-h-[170px] px-2 flex flex-wrap gap-2">
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
            </DropdownMenuContentOnly>
          </div>
        )}
      </DropdownMenu>
    </div>
  );
}

export function SettingsCard({
  icon,
  title,
  content,
  isList = false,
  colorItems = [],
}: {
  icon: React.ReactNode;
  title: string;
  content?: string;
  isList?: boolean;
  colorItems?: { name: string; color: string }[];
}) {
  return (
    <div className="mt-2 cursor-pointer border items-center rounded-xl p-[12px] flex justify-between">
      <div className="flex overflow-hidden">
        <div className="size-[42px] items-center justify-center bg-accent/40 border rounded-xl flex flex-shrink-0">
          {icon}
        </div>
        <div className="ml-2 max-w-[70%] overflow-hidden">
          <p className="text-base font-medium">{title}</p>

          {isList ? (
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-1 overflow-hidden truncate whitespace-nowrap">
                {colorItems.map((color) => (
                  <span
                    className="flex items-center gap-1 flex-shrink-0"
                    key={color.name}
                  >
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full border-[1.5px]',
                        `border-${color.color}-500`
                      )}
                    />
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <span className="text-base text-muted-foreground truncate whitespace-nowrap overflow-hidden block mt-1">
              {content}
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center ml-2">
        <span className="text-xs font-medium text-muted-foreground bg-accent rounded-full size-[16px] flex items-center justify-center">
          ?
        </span>
        <ChevronRight className="h-4 w-4 font-medium text-muted-foreground" />
      </div>
    </div>
  );
}

function SelectOwner({ users }) {
  return (
    <div className="w-full">
      <Select>
        <SelectTrigger className="w-full !h-[40px]">
          <span className="text-primary">Jawahiir Nabhan</span>
        </SelectTrigger>
        <SelectContent className="w-full max-h-60 overflow-y-auto">
          <SelectGroup>
            {users.map((user) => (
              <SelectItem key={user.userName} value={user.userName}>
                {user.userName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// Avatars showing will be updated if new user has been added...
function UserManagement({ users }) {
  return (
    <div className={'w-full flex justify-between'}>
      <span className={'text-base'}>Share only with: </span>

      <div className="flex">
        {/* Display first 3 users */}
        {users.slice(0, 3).map((user, index) => (
          <img
            key={user.userName}
            alt={user.userName}
            src={user.avatar}
            className="w-8 h-8 shadow-sm bg-background rounded-full object-cover border-2 border-gray-50"
            style={{
              zIndex: 10 - index,
              marginLeft: index === 0 ? 0 : -10,
            }}
          />
        ))}

        {/* Show count if more than 3 users */}
        {users.length > 3 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="w-8 h-8 shadow-sm bg-theme-main-light text-muted-foreground cursor-pointer rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    zIndex: 10 - 3,
                    marginLeft: -10,
                  }}
                >
                  +{users.length - 3}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">
                  {users.slice(3).map((user) => (
                    <div key={user.userName} className="whitespace-nowrap">
                      {user.userName}
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Add user button */}
        <Button
          onClick={() => {}}
          variant="outline"
          className={cn(
            'w-8 h-8 flex items-center justify-center text-muted-foreground rounded-full ml-[-12px]',
            'border-[1.5px] border-muted-foreground border-dashed',
            'hover:ml-0 transition-500 ease-out hover:border-theme-main hover:text-theme-content-primary hover:bg-primary-foreground'
          )}
        >
          <UserRoundPlus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Available icons with their names
const iconOptions: IconOption[] = [
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Users', icon: Users },
  { name: 'Globe', icon: Globe },
  { name: 'Star', icon: Star },
  { name: 'Home', icon: Home },
  { name: 'Book', icon: Book },
  { name: 'Rocket', icon: Rocket },
  { name: 'Heart', icon: Heart },
  { name: 'Calendar', icon: Calendar },
  { name: 'Settings', icon: Settings },
  { name: 'Map', icon: Map },
  { name: 'Mail', icon: Mail },
  { name: 'Zap', icon: Zap },
  { name: 'Coffee', icon: Coffee },
  { name: 'Cloud', icon: Cloud },
  { name: 'Music', icon: Music },
  { name: 'Camera', icon: Camera },
  { name: 'Palette', icon: Palette },
  { name: 'Gift', icon: Gift },
  { name: 'Trophy', icon: Trophy },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Bell', icon: Bell },
  { name: 'Layers', icon: Layers },
  { name: 'FileText', icon: FileText },
  { name: 'Database', icon: Database },
  { name: 'Target', icon: Target },
];

// Available color options with Tailwind classes
const colorOptions: ColorOption[] = [
  {
    name: 'Gray',
    bgClass: 'bg-gray-500',
    textClass: 'text-white',
    color: 'gray-500',
  },
  {
    name: 'Blue',
    bgClass: 'bg-blue-500',
    textClass: 'text-white',
    color: 'blue-500',
  },
  {
    name: 'Green',
    bgClass: 'bg-green-500',
    textClass: 'text-white',
    color: 'green-500',
  },
  {
    name: 'Yellow',
    bgClass: 'bg-yellow-500',
    textClass: 'text-black',
    color: 'yellow-500',
  },
  {
    name: 'Purple',
    bgClass: 'bg-purple-500',
    textClass: 'text-white',
    color: 'purple-500',
  },
  {
    name: 'Pink',
    bgClass: 'bg-pink-500',
    textClass: 'text-white',
    color: 'pink-500',
  },
  {
    name: 'Indigo',
    bgClass: 'bg-indigo-500',
    textClass: 'text-white',
    color: 'indigo-500',
  },
  {
    name: 'Red',
    bgClass: 'bg-red-500',
    textClass: 'text-white',
    color: 'red-500',
  },
  {
    name: 'Teal',
    bgClass: 'bg-teal-500',
    textClass: 'text-white',
    color: 'teal-500',
  },
  {
    name: 'Orange',
    bgClass: 'bg-orange-500',
    textClass: 'text-white',
    color: 'orange-500',
  },
];
