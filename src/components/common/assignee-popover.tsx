import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/shadcn-ui/command';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';
import { Badge } from '@/components/shadcn-ui/badge';
import { Check } from 'lucide-react';

export const AssigneePopover = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search or enter email..." />
      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>
        <CommandGroup heading="People">
          {users.map((user) => (
            <CommandItem key={user.id} className="flex items-center gap-3 p-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-sm font-medium">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                {user.online && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {user.name}
                  </span>
                  {user.verified && (
                    <Badge
                      variant="secondary"
                      className="h-4 w-4 p-0 rounded-full bg-blue-500"
                    >
                      <Check className="h-2.5 w-2.5 text-white" />
                    </Badge>
                  )}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

const users = [
  { id: 1, name: 'Me', initials: 'ME', verified: true, online: true },
  {
    id: 2,
    name: 'Noor Ullah Al Noor',
    initials: 'NU',
    verified: false,
    online: true,
  },
  {
    id: 3,
    name: 'Mehedi Hassan',
    initials: 'MH',
    verified: false,
    online: false,
  },
  {
    id: 4,
    name: 'Khairul Hasan',
    initials: 'KH',
    verified: false,
    online: false,
  },
  {
    id: 5,
    name: 'Samrat Biswas',
    initials: 'SB',
    verified: false,
    online: true,
  },
  {
    id: 6,
    name: 'Rahad Kabir',
    initials: 'RK',
    verified: true,
    online: true,
  },
  { id: 7, name: 'Tarun', initials: 'T', verified: false, online: true },
  {
    id: 8,
    name: 'Yiafee Khan',
    initials: 'YK',
    verified: true,
    online: false,
  },
];
