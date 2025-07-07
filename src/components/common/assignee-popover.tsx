import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from '@/components/shadcn-ui/command';
import { Member } from '@/types/request-response/workspace/ApiResponse.ts';
import { PlaceholderAvatar } from '@/components/common/avatar-generator.tsx';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  assignees?: Member[];
  onSelectAssignee?: (assigneeId: number) => void;
}

export const AssigneePopover = ({ open, onOpenChange, members }: Props) => {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className="min-h-[280px] w-[287px]"
    >
      <CommandInput placeholder="Search by name or email..." />
      <CommandList>
        <CommandGroup heading="People" className="flex flex-col !space-y-[4px]">
          {members.length > 0 &&
            members.map((member) => (
              <CommandItem
                key={member.id}
                value={`${member.user.fullName} ${member.user.email}`}
                className="h-[32px] hover:bg-secondary !p-[4px] cursor-pointer text-base flex items-center gap-2"
              >
                {member.user.image && member.user.image.length > 0 ? (
                  <img
                    src={member.user.image}
                    alt={member.user.fullName}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <PlaceholderAvatar
                    variant="initials"
                    seed={member.user.fullName}
                    className="h-6 w-6"
                  />
                )}
                <span className="truncate text-base">
                  {member.user.fullName}
                </span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
