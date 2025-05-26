import { FC } from 'react';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button';
import {
  IconHome,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-react';

interface Props {
  state: boolean;
  onCancelFullView: () => void;
  title?: string;
}

export const PageHeader: FC<Props> = ({
  state,
  onCancelFullView,
  title = '',
}) =>
  state ? (
    <FullViewPageHeader title={title} onCancel={onCancelFullView} />
  ) : (
    <DefaultPageHeader />
  );

const DefaultPageHeader: FC = () => (
  <div
    className={cn(
      'sticky top-0 bg-background z-10 w-full',
      'border-l border-r border-b rounded-sm'
    )}
  >
    <div className="px-8 flex text-base items-center gap-4 py-[13px]">
      <IconHome size={16} /> Home
    </div>
  </div>
);

interface FullViewPageHeaderProps {
  title?: string;
  onCancel: () => void;
}

const FullViewPageHeader: FC<FullViewPageHeaderProps> = ({
  title = '',
  onCancel,
}) => (
  <div
    className={cn(
      'sticky top-0 bg-background z-10 w-full',
      'border-l border-r'
    )}
  >
    <div className="pl-8 border-b pr-4 flex text-base items-center justify-between gap-4 h-[47px]">
      <div className="flex items-center">
        <Button variant={'ghost'} size={'icon_sm'}>
          <IconChevronLeft />
        </Button>
        <Button variant={'ghost'} size={'icon_sm'}>
          <IconChevronRight />
        </Button>
        <span>Home&nbsp;&nbsp;</span>
        <span className="text-muted-foreground">{'/'}&nbsp;&nbsp;</span>
        <span className="text-muted-foreground">{title}</span>
      </div>
      <div className="!mr-0">
        <Button onClick={onCancel} variant={'ghost'} size={'icon'}>
          <IconX />
        </Button>
      </div>
    </div>
  </div>
);
