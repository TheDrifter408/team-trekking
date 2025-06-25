import { Info, Link2, User } from 'lucide-react';
import { Button } from '../shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../shadcn-ui/dialog';
import { Input } from '../shadcn-ui/input';
import { Assignee, Space } from '@/types/props/Common';
import { MouseEvent, useState } from 'react';
import { cn } from '@/lib/utils/utils';
import { UsersArray } from './users-array';
import { AssigneeAvatar } from './assignee-avatar';
import { Switch } from '../shadcn-ui/switch';
import { taskNotificationUsers } from '@/mock';
import { Collapsible, CollapsibleContent } from '../shadcn-ui/collapsible';
import { IconCaretRightFilled } from '@tabler/icons-react';

interface ShareSpaceDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ShareSpaceDialog = ({
  isOpen,
  setIsOpen,
}: ShareSpaceDialogProps) => {
  const [spaceInfo, setSpaceInfo] = useState<Space>({
    id: 0,
    name: 'MySpace',
    description: '',
    shareLink: 'https://teamtrekking.com/share/anm12kls',
  });

  const [copySuccess, setCopySuccess] = useState(false);

  const [invited, setInvited] = useState<Assignee[]>(taskNotificationUsers);
  const [members, setMembers] = useState<Assignee[]>(taskNotificationUsers);

  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const onToggleCollapsible = (e: MouseEvent) => {
    e.stopPropagation();
    setCollapsibleOpen((prev) => !prev);
  };

  const onSelectInvited = (assignee: Assignee) => {
    const isInvited = invited.some((u) => u.id === assignee.id);
    if (isInvited) {
      const newInvited = invited.filter((u) => u.id !== assignee.id);
      setInvited(newInvited);
    } else {
      const newInvited = [...invited, assignee];
      setInvited(newInvited);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(spaceInfo.shareLink!);
      setCopySuccess(true);
    } catch (e) {
      setCopySuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(!open)}>
      <form>
        <DialogContent className="bg-muted p-0 gap-0">
          <DialogHeader className="bg-white py-4 px-4">
            <DialogTitle>Share this space</DialogTitle>
            <DialogDescription>Sharing space with all views</DialogDescription>
          </DialogHeader>
          <div className="bg-white px-4 py-2">
            <div className="border rounded-lg flex items-center gap-1 py-1 px-1 ring-0 ring-theme-main justify-between focus-within:ring-1">
              <Input
                placeholder="Invite by name or email"
                className="rounded-lg border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 px-2 py-0.5"
              />
              <Button className="bg-theme-main font-bold py-0.5">
                Invite
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 px-4 bg-white">
            <div className="flex items-center gap-1">
              <Link2 className="p-0 -rotate-45" size={16} />
              <a href="thisisalink" className="font-bold text-sm">
                Private Link
              </a>
              <Info className="p-0" size={16} />
            </div>
            <Button
              variant={'ghost'}
              className={cn(
                'border font-bold text-xs px-2 ',
                copySuccess ? 'bg-slate-300 hover:bg-slate-400' : ''
              )}
              onClick={copyToClipboard}
            >
              {copySuccess ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
          <div>
            <p className="text-xs font-bold bg-white px-4">Share With</p>
            <Collapsible
              open={collapsibleOpen}
              onOpenChange={(open) => setCollapsibleOpen(!open)}
              className="transition-transform p-0"
            >
              <div className="bg-white px-4" onClick={onToggleCollapsible}>
                <div className="flex items-center py-2 px-4 justify-between hover:bg-slate-200 rounded-xl">
                  <div className="flex items-center gap-1">
                    <IconCaretRightFilled
                      size={14}
                      className={cn(
                        'rounded-sm transition-transform duration-500 hover:bg-slate-300',
                        collapsibleOpen ? 'rotate-90' : 'rotate-0'
                      )}
                    />
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <p className="text-sm">People</p>
                    </div>
                  </div>
                  <UsersArray
                    onRemove={() => { }}
                    visibleUsers={invited.slice(0, 3)}
                    extraUsers={invited.slice(3)}
                  />
                </div>
              </div>
              <CollapsibleSpace
                members={members}
                invited={invited}
                onSelectInvited={onSelectInvited}
              />
            </Collapsible>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

interface SpaceDropdownProps {
  members: Assignee[];
  invited: Assignee[];
  onSelectInvited: (assignee: Assignee) => void;
}

const CollapsibleSpace = ({
  members,
  invited,
  onSelectInvited,
}: SpaceDropdownProps) => {
  return (
    <CollapsibleContent className="overflow-hidden px-6 py-2 bg-muted transition-all data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground antialiased">
          {invited.length} invited
        </p>
        <div className="flex items-center gap-1">
          <Button variant={'ghost'} className="bg-transparent p-0 text-red-500">
            Remove All
          </Button>
        </div>
      </div>
      {members.map((user) => {
        const isInvited = invited.some((u) => u.id === user.id);
        return (
          <div className="flex items-center my-2 justify-between text-base">
            <AssigneeAvatar
              assignee={user}
              displayName={true}
              onRemove={() => { }}
            />
            <Switch
              checked={isInvited}
              onCheckedChange={() => onSelectInvited(user)}
            />
          </div>
        );
      })}
    </CollapsibleContent>
  );
};
