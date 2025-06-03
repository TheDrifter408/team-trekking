import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { X, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/shadcn-ui/badge';
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert';

interface InviteUserProps {
  inviteUserOpen: boolean;
  setInviteUserOpen: (open: boolean) => void;
  onInvite?: (emails: string[]) => void;
  maxInvites?: number;
}

export const InviteUser = ({
  inviteUserOpen,
  setInviteUserOpen,
  onInvite,
  maxInvites = 10,
}: InviteUserProps) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onAddEmail = () => {
    const trimmedEmail = currentEmail.trim();

    // Check if the field is empty
    if (!trimmedEmail) {
      setError('Please enter an email address');
      return;
    }

    // Check if it's a valid email
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if it's already in the list
    if (emails.includes(trimmedEmail)) {
      setError('This email has already been added');
      return;
    }

    // Check if we've reached the maximum number of invites
    if (emails.length >= maxInvites) {
      setError(`You can only invite up to ${maxInvites} users at once`);
      return;
    }

    // Add the email and clear the input and error
    setEmails([...emails, trimmedEmail]);
    setCurrentEmail('');
    setError(null);
  };

  const onRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddEmail();
    }
  };

  const onSubmit = async () => {
    if (emails.length === 0) {
      setError('Please add at least one email');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onInvite) {
        await onInvite(emails);
      }

      // Reset and close the dialog
      setEmails([]);
      setCurrentEmail('');
      setError(null);
      setInviteUserOpen(false);
    } catch {
      setError('Failed to send invitations. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDialogClose = () => {
    // Clear state when dialog closes
    if (!isSubmitting) {
      setEmails([]);
      setCurrentEmail('');
      setError(null);
      setInviteUserOpen(false);
    }
  };

  const onReset = () => {
    setEmails([]);
    setCurrentEmail('');
    setError(null);
  };

  return (
    <Dialog open={inviteUserOpen} onOpenChange={onDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Invite Team Members
            </div>
          </DialogTitle>
          <DialogDescription>
            Send email invitations to people you'd like to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="emails" className="text-sm font-medium">
              Email Addresses
            </Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="emails"
                type="email"
                placeholder="email@example.com"
                value={currentEmail}
                onChange={(e) => {
                  setCurrentEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={onKeyDown}
                className="flex-1"
              />
              <Button type="button" size="sm" onClick={onAddEmail}>
                Add
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {emails.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {maxInvites && emails.length === maxInvites && (
                  <span className="text-amber-500 text-xs ml-2">
                    Maximum limit reached
                  </span>
                )}
              </Label>
              <div className="flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    <span className="text-xs">{email}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => onRemoveEmail(email)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={onReset}
            disabled={emails.length === 0 || isSubmitting}
          >
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setInviteUserOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={emails.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Invitations'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
