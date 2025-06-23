import { Link } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import {
  ChevronDown,
  Smile,
  BellOff,
  User,
  Palette,
  Settings,
  Bell,
  Command,
  Gift,
  Download,
  HelpCircle,
  Trash2,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { UserResponse } from '@/types/request-response/ApiResponse.ts';
import { getInitials } from '@/lib/utils/utils.ts';
import { useTMTStore } from '@/stores/zustand';

interface Props {
  user: UserResponse | null;
}

export function ProfileDropdown({ user }: Props) {
  const { clearUser } = useTMTStore();
  const fullName = user?.userData.fullName ?? 'Jawahiir Nabhan';
  const status = 'Online';

  const onLogout = () => {
    clearUser();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-6 w-6 rounded-full">
          <Avatar className="h-[26px] w-[44px]">
            <AvatarImage
              className={'bg-theme-secondary-dark'}
              src="/avatars/01.png"
              alt="@shadcn"
            />
            <AvatarFallback
              className={
                'bg-theme-secondary-dark text-white justify-between px-[7px] w-full'
              }
            >
              <span>{getInitials(fullName)}</span>{' '}
              <ChevronDown className={'size-[12px]'} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        {/* User Info Header */}
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/01.png" alt={fullName} />
              <AvatarFallback className="bg-theme-secondary-dark text-white">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-green-500 mt-1">
                {status}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Status and Notifications */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-between">
            <div className="flex items-center">
              <Smile className="mr-3 h-4 w-4" />
              <span>Set status</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between">
            <div className="flex items-center">
              <BellOff className="mr-3 h-4 w-4" />
              <span>Mute notifications</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Main Menu Items */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-3 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/themes" className="flex items-center">
              <Palette className="mr-3 h-4 w-4" />
              <span>Themes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/notifications" className="flex items-center">
              <Bell className="mr-3 h-4 w-4" />
              <span>Notification settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Additional Features */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center">
            <Command className="mr-3 h-4 w-4" />
            <span>Keyboard shortcuts</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center">
            <Gift className="mr-3 h-4 w-4" />
            <span>Referrals</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between">
            <div className="flex items-center">
              <Download className="mr-3 h-4 w-4" />
              <span>Download apps</span>
            </div>
            <ExternalLink className="h-3 w-3" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="mr-3 h-4 w-4" />
              <span>Help</span>
            </div>
            <ExternalLink className="h-3 w-3" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Bottom Actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center">
            <Trash2 className="mr-3 h-4 w-4" />
            <span>Trash</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
