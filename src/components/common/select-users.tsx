import { Assignee } from '@/types/props/Common';
import { FC, ReactNode, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandGroup,
  CommandItem,
} from '@/components/shadcn-ui/command';
import { Button } from '../shadcn-ui/button';
import {
  AssigneeAvatar,
  AssigneeProps,
} from '@/components/common/assignee-avatar';
import { cn } from '@/lib/utils/utils.ts';
import { UserRoundPlus } from 'lucide-react';
import { UsersArray } from '@/components/common/users-array';

interface SelectUsersProps extends Omit<AssigneeProps, 'assignee'> {
  users: Assignee[];
  value: Assignee[];
  onChange: (assignees: Assignee[]) => void;
  multipleSelect?: boolean;
  placeholder: string;
  userListTitle: string;
  triggerElement?: ReactNode;
  displayOnly?: boolean;
}

export const SelectUsers: FC<SelectUsersProps> = ({
  multipleSelect = false,
  users,
  value,
  onChange,
  displayOnly = false,
  triggerElement,
  placeholder = 'Please select Owner(s)',
  userListTitle = 'Users',
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const onMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  const toggleAssignee = (assignee: Assignee) => {
    const alreadySelected = value.some((a) => a.id === assignee.id);

    let newSelection: Assignee[] = [];
    if (multipleSelect) {
      newSelection = alreadySelected
        ? value.filter((a) => a.id !== assignee.id)
        : [...value, assignee];
    } else {
      newSelection = alreadySelected ? [] : [assignee];
    }

    onChange(newSelection);
  };

    const renderAvatars = (
        value: Assignee[],
        onRemove: (user: Assignee) => void,
        isMouseEnter?: boolean
    ) => {
        const visibleUsers = value.slice(0, 3);
        const extraUsers = value.slice(3);
        return (
            <UsersArray onRemove={onRemove} isMouseEnter={isMouseEnter} visibleUsers={visibleUsers} extraUsers={extraUsers} />
        )
    }

  const renderUserDropdown = () => {
    return (
      <Command className="py-1">
        <CommandInput
          placeholder="Search Assignees..."
          className="p-1 ring-0 ring-offset-0 ring-inset focus:outline-0"
        />
        <CommandList className="">
          <CommandEmpty>No user found</CommandEmpty>
          <CommandGroup
            heading={
              <span className="font-medium text-black text-sm">
                {userListTitle}
              </span>
            }
            className="border-none"
          >
            {users.map((assignee) => {
              const isSelected = value.includes(assignee);
              return (
                <CommandItem
                  className=""
                  key={assignee.id}
                  value={assignee.name}
                  onSelect={() => toggleAssignee(assignee)}
                >
                  <AssigneeAvatar
                    key={assignee.id}
                    assignee={assignee}
                    displayName={true}
                    showAvatarRing={isSelected}
                    className={cn('justify-between')}
                    onRemove={() => {}}
                    isSelected={isSelected}
                    showButtons={true}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };

  if (displayOnly) {
    return (
      <div className="flex justify-end items-center gap-1">
        {renderAvatars(value, () => {}, false)}
        <Popover open={open} onOpenChange={setOpen} modal={false}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon_sm"
              className="ml-1 border-muted-foreground border-dashed border-1 w-8 h-8 rounded-full"
            >
              <UserRoundPlus className="w-4 h-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 p-1">
            {renderUserDropdown()}
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="flex -space-x-2 w-full">
      {/* Modal is 'false' here so that the SelectUsers component which uses Popover works correctly */}
      <Popover modal={false}>
        <PopoverTrigger asChild>
          {triggerElement || (
            <Button
              className={cn(
                'bg-transparent p-0 m-0 h-full text-muted-foreground text-sm flex items-center gap-0 justify-start w-full *:data-[slot=avatar]:ring-background -space-x-1 *:data-[slot=avatar]:ring-2'
              )}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {value.length > 0 ? (
                renderAvatars(value, toggleAssignee, isMouseEnter)
              ) : (
                <span className="block h-full w-full text-left text-base">
                  {placeholder}
                </span>
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="mt-2 p-1">
          {renderUserDropdown()}
        </PopoverContent>
      </Popover>
    </div>
  );
};
