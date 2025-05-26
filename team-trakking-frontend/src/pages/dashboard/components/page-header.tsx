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

export const PageHeader = ({
  state,
  onCancelFullView,
  title = 'Recents',
}: Props) => {
  return state ? (
    <FullViewPageHeader title={title} onCancel={onCancelFullView} />
  ) : (
    <DefaultPageHeader />
  );
};

function DefaultPageHeader() {
  return (
    <div
      className={cn(
        'sticky top-0 bg-background z-10 w-full',
        'border-l border-r border-b'
      )}
    >
      <div className="px-8 flex text-base items-center gap-4 py-[13px]">
        <IconHome size={16} /> Home
      </div>
    </div>
  );
}

function FullViewPageHeader({
  title = 'Recents',
  onCancel,
}: {
  title?: string;
  onCancel: () => void;
}) {
  return (
    <div
      className={cn(
        'sticky top-0 bg-background z-10 w-full',
        'border-l border-r'
      )}
    >
      <div className="pl-8 pr-4 flex text-base items-center justify-between gap-4 h-[46px]">
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
}
