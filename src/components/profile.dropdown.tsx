import { Link } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { UserResponse } from '@/types/request-response/ApiResponse.ts';
import { getInitials } from '@/lib/utils.ts';
import { useTMTStore } from '@/stores/zustand';

interface Props {
  user: UserResponse | null;
}

export function ProfileDropdown({ user }: Props) {
  const { clearUser } = useTMTStore();
  const email = user?.userData.email ?? 'no email found';
  const fullName = user?.userData.fullName ?? 'user full name not found';
  const onLogout = () => {
    clearUser();
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-6 w-6 rounded-full">
          <Avatar className="h-[26px] w-[44px] ">
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
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
