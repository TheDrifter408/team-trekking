import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from '@/components/shadcn-ui/command';
import { Member } from '@/types/request-response/workspace/ApiResponse.ts';
import { PlaceholderAvatar } from '@/components/common/avatar-generator.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  assignees?: Member[];
  onSelectAssignee: (assignee: Member) => void;
  onRemoveAssignee: (assigneeId: number) => void;
}

export const AssigneePopover = ({
  open,
  onOpenChange,
  members,
  assignees = [],
  onSelectAssignee,
  onRemoveAssignee,
}: Props) => {
  const isAssigneeSelected = (id: number) => assignees.some((a) => a.id === id);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className="min-h-[280px] w-[287px]"
    >
      <CommandInput placeholder="Search by name or email..." />
      <CommandList>
        <CommandGroup heading="People" className="flex flex-col pb-2">
          {members.length > 0 &&
            members.map((member) => {
              const selected = isAssigneeSelected(member.id);
              return (
                <CommandItem
                  key={member.id}
                  value={`${member.user.fullName} ${member.user.email}`}
                  onSelect={() => onSelectAssignee(member)}
                  className="group my-[1px] h-[34px] hover:bg-secondary cursor-pointer text-base flex items-center gap-2"
                >
                  <AssigneeAvatar
                    member={member}
                    selected={selected}
                    onRemove={onRemoveAssignee}
                  />
                  <span
                    className={cn(
                      'truncate text-base',
                      selected && 'font-medium'
                    )}
                  >
                    {member.user.fullName}
                  </span>
                </CommandItem>
              );
            })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

interface AvatarProps {
  member: Member;
  selected: boolean;
  onRemove: (id: number) => void;
}
export const AssigneeAvatar = ({ member, selected, onRemove }: AvatarProps) => {
  return (
    <div
      className={cn(
        'relative rounded-full p-[2px]',
        selected && 'ring-2 ring-theme-main-dark'
      )}
    >
      {member.user.image ? (
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

      {selected && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(member.id);
          }}
          className="absolute -bottom-[6px] -right-1 hidden group-hover:flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <X size={8} strokeWidth={2.5} className={'text-white'} />
        </button>
      )}
    </div>
  );
};
