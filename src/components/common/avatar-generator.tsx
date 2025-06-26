import { createAvatar } from '@dicebear/core';
import { initials, avataaars } from '@dicebear/collection';
import { cn } from '@/lib/utils/utils.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';

interface Props {
  seed: string;
  className?: string;
  size?: number;
  variant: 'avataaars' | 'initials';
}

export const PlaceholderAvatar = ({
  seed,
  className,
  variant,
  size = 42,
}: Props) => {
  let avatar;
  if (variant === 'avataaars') {
    avatar = createAvatar(avataaars, {
      seed,
      backgroundColor: [
        'b6e3f4',
        'c0aede',
        'd1d4f9',
        'ffdfbf',
        'ffd5dc',
        'd1d4f9',
      ],
    });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 700, fontSize: size });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt={'avatar/placeholder'} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
