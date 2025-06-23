import { Card, CardHeader, CardTitle } from '@/components/shadcn-ui/card.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { IconArrowsDiagonal } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  onExpand: () => void;
  isExpanded: boolean;
}

export const HoverableCard = ({
  children,
  title,
  onExpand,
  isExpanded,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      className={cn(
        'w-full flex flex-col',
        isExpanded
          ? 'w-screen rounded-none border-0 border-l -mt-[20px] h-screen bg-background'
          : 'relative h-[336px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative shrink-0">
        <CardTitle className="flex items-center cursor-default">
          {title}
        </CardTitle>
        {isHovered && (
          <Button
            onClick={onExpand}
            size={'icon_sm'}
            variant={'ghost'}
            className="absolute top-0 right-4"
          >
            <IconArrowsDiagonal className="text-muted-foreground" />
          </Button>
        )}
      </CardHeader>
      {children}
    </Card>
  );
};
