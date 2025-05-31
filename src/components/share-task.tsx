'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X, Lock, Globe, Link, ChevronDown, PenSquare } from 'lucide-react';
import { IconCaretRightFilled, IconCaretDownFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { taskNotificationUsers } from '@/mock';

interface ShareTaskProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareTask = ({ open, onOpenChange }: ShareTaskProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showUser && userListRef.current) {
      userListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showUser]);

  const shareLink = 'https://yourapp.com/share/task/123';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="relative w-full">
          <DialogClose asChild>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 rounded-full z-10"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>

          <div className="px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-xl">Share Task</DialogTitle>
              <DialogDescription className="text-base text-primary">
                Sharing Budget plan for summer vacation task
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={() => {
                  if (!inputValue) setIsEditing(false);
                }}
                className="h-[36px] placeholder:text-base pr-10"
                placeholder="Invite by name or email"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2">
                {isEditing ? (
                  <Button
                    size="icon_sm"
                    variant="ghost"
                    onClick={() => {
                      setInputValue('');
                      setIsEditing(false);
                      inputRef.current?.blur();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsEditing(true);
                      inputRef.current?.focus();
                    }}
                    className="!h-[28px]"
                  >
                    Invite
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base">
                  <Globe size={18} />
                  Share link with anyone
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base">
                  <Link size={18} />
                  Private link
                </div>
                <Button
                  variant="outline"
                  className={cn(
                    'text-sm w-auto h-[26px]',
                    copied && 'bg-muted'
                  )}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy link'}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Label>Share With</Label>
              <div
                onClick={() => setShowUser(!showUser)}
                className="mt-2 cursor-pointer hover:bg-accent rounded flex items-center text-base justify-between"
              >
                <div className="flex items-center gap-2">
                  <Button size="icon_sm" variant="ghost">
                    {showUser ? (
                      <IconCaretDownFilled />
                    ) : (
                      <IconCaretRightFilled />
                    )}
                  </Button>
                  Steps List
                </div>
                <div className="">
                  <Switch />
                </div>
              </div>
            </div>
            {!showUser && (
              <div className="mt-6 w-full">
                <Button className="w-full" variant="outline">
                  <Lock />
                  Make Private
                </Button>
              </div>
            )}
          </div>
        </div>

        {showUser && (
          <div
            ref={userListRef}
            className="px-6 bg-secondary pb-5 flex flex-col"
          >
            <div className="mt-3">
              <div className="justify-between w-full flex items-center mb-4">
                <span className="text-sm">
                  {taskNotificationUsers.length} people
                </span>
                <Button
                  variant="outline"
                  className={cn('text-sm w-auto h-[25px]')}
                >
                  Edit all <ChevronDown size={14} />
                </Button>
              </div>
            </div>

            {/* Scrollable User list with fixed height */}
            <ScrollArea className="h-[300px] w-full">
              <div className="space-y-3 pr-8">
                {taskNotificationUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.userName} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.userName}</p>
                      </div>
                      {user.role !== 'Member' && (
                        <div
                          className={
                            'text-sm bg-secondary-foreground text-primary-foreground px-1 rounded font-medium'
                          }
                        >
                          {user.role}
                        </div>
                      )}
                    </div>
                    <Button size="icon_sm" variant="ghost">
                      <Button
                        variant="outline"
                        className={cn('text-sm w-auto h-[25px]')}
                      >
                        Edit
                        <ChevronDown size={14} />
                      </Button>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
